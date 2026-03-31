import React, { useState, useRef, useEffect, useCallback } from 'react';
import * as Tone from 'tone';
import {
  Plus, Trash2, Share2, Undo2, X, Edit3, Upload, Copy, CopyPlus, ClipboardPaste, Printer
} from 'lucide-react';
import { T } from '../theme.js';
import useIsWide from '../hooks/useIsWide.js';
import { ChordDiagram } from './ChordDiagram.jsx';
import { CHORD_VOICINGS } from './chordVoicings.js';
import { makeEmptyCell, makeEmptyMeasure, makeTemplateChart, compressToURL, strumType, strumWeight, makeStrum, SECTION_LABELS, getSectionRange } from './chartHelpers.js';
import SongPicker from '../tools/SongPicker.jsx';
import { YouTubeAudioPlayer, extractYouTubeId } from '../tools/youtube.jsx';
import { splitSyllables, chipText, chipGroup, chipOrigin, normalizeAndTokenize } from './syllableUtil.js';
import AudioRecorder from '../tools/AudioRecorder.jsx';

const BEAT_LABELS_8 = ["1", "&", "2", "&", "3", "&", "4", "&"];

// ─── Bottom Sheet ───────────────────────────────────────────────────────────
function BottomSheet({ theme: T, open, onClose, children }) {
  const isWide = useIsWide(900);
  const [visible, setVisible] = useState(false);
  const [animating, setAnimating] = useState(false);

  useEffect(() => {
    if (open) {
      setVisible(true);
      requestAnimationFrame(() => requestAnimationFrame(() => setAnimating(true)));
    } else {
      setAnimating(false);
      const timer = setTimeout(() => setVisible(false), 250);
      return () => clearTimeout(timer);
    }
  }, [open]);

  if (!visible) return null;

  // Desktop: side panel from right
  if (isWide) {
    return (
      <div style={{
        position: "fixed", inset: 0, zIndex: 1000,
        background: animating ? "rgba(0,0,0,0.2)" : "transparent",
        transition: "background 0.25s",
      }} onClick={onClose}>
        <div style={{
          position: "absolute", top: 0, right: 0, bottom: 0, width: 340,
          background: T.bgCard, borderLeft: `1px solid ${T.border}`,
          boxShadow: "-4px 0 20px rgba(0,0,0,0.1)",
          transform: animating ? "translateX(0)" : "translateX(100%)",
          transition: "transform 0.25s cubic-bezier(0.33, 1, 0.68, 1)",
          overflowY: "auto",
          padding: "16px 20px 24px",
        }} onClick={e => e.stopPropagation()}>
          {/* Close button */}
          <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 12 }}>
            <button onClick={onClose} style={{
              background: "none", border: "none", cursor: "pointer", color: T.textMuted, padding: 4,
            }}><X size={18} /></button>
          </div>
          {children}
        </div>
      </div>
    );
  }

  // Mobile: bottom sheet
  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 1000,
      background: animating ? "rgba(0,0,0,0.3)" : "transparent",
      transition: "background 0.25s",
    }} onClick={onClose}>
      <div style={{
        position: "absolute", bottom: 0, left: 0, right: 0,
        background: T.bgCard, borderTopLeftRadius: 16, borderTopRightRadius: 16,
        boxShadow: "0 -4px 20px rgba(0,0,0,0.15)",
        transform: animating ? "translateY(0)" : "translateY(100%)",
        transition: "transform 0.25s cubic-bezier(0.33, 1, 0.68, 1)",
        maxHeight: "60vh", overflowY: "auto",
        padding: "12px 16px 24px",
      }} onClick={e => e.stopPropagation()}>
        {/* Drag handle */}
        <div style={{
          width: 36, height: 4, borderRadius: 2, background: T.borderSoft,
          margin: "0 auto 12px",
        }} />
        {children}
      </div>
    </div>
  );
}

// ─── StrumChartBuilder ──────────────────────────────────────────────────────
export function StrumChartBuilder({ theme: T, metro, initialChart, onBack, onSave }) {
  const isWide = useIsWide(900);
  const [chart, setChart] = useState(() => initialChart || makeTemplateChart());
  const [undoStack, setUndoStack] = useState([]);
  const [practiceMode, setPracticeMode] = useState(false);
  const [practiceMeasure, setPracticeMeasure] = useState(0); // current measure in practice auto-scroll
  const practiceBeatRef = useRef(0); // beat counter for practice mode auto-advance
  const [activeChordCell, setActiveChordCell] = useState(null); // { m, c } measure + cell index
  const [selectedChip, setSelectedChip] = useState(null); // index in lyricsPool
  const [recentChords, setRecentChords] = useState([]);
  const [customChord, setCustomChord] = useState("");
  const [chordQuality, setChordQuality] = useState(""); // "", "m", "7", "m7", "maj7", "sus2", "sus4", "dim", "aug"
  const [savedShow, setSavedShow] = useState(false);
  const [shareMsg, setShareMsg] = useState(""); // "Link Copied" or "JSON Copied"
  const [deleteToast, setDeleteToast] = useState(null);
  const [chordVoicing, setChordVoicing] = useState(null); // { m, c }
  const [strumPicker, setStrumPicker] = useState(null); // { mIdx, cIdx, isBetween }
  const [sectionPicker, setSectionPicker] = useState(null); // mIdx or null
  const [clipboard, setClipboard] = useState(null); // { label, measures }
  const [showPrint, setShowPrint] = useState(false);
  const [printBarsPerRow, setPrintBarsPerRow] = useState(4);
  const [currentBeat, setCurrentBeat] = useState(-1);
  const [currentBar, setCurrentBar] = useState(-1);
  const [isPlaying, setIsPlaying] = useState(false);
  const [lyricsEditing, setLyricsEditing] = useState(!initialChart);
  const longPressRef = useRef(null);
  const savedTimerRef = useRef(null);

  // rAF-based 8th-note beat tracking
  const [eighthCol, setEighthCol] = useState(-1);
  const [eighthMeasure, setEighthMeasure] = useState(-1);
  const lastBeatTimeRef = useRef(0);
  const lastBeatRef = useRef(-1);
  const lastBarRef = useRef(-1);
  const beatRafRef = useRef(null);
  const bpmRef = useRef(80);
  const numMeasuresRef = useRef(1);

  // Countdown state — bar 0 is countdown, bar 1+ is real playback
  const [countdownBeat, setCountdownBeat] = useState(-1);
  const countdownActiveRef = useRef(false);

  // Section loop state
  const [loopStart, setLoopStart] = useState(null);
  const [loopEnd, setLoopEnd] = useState(null);
  const [loopSelecting, setLoopSelecting] = useState(false);
  const loopStartRef = useRef(null);
  const loopEndRef = useRef(null);

  // Note tone playback refs
  const noteSynthRef = useRef(null);
  const legatoActiveRef = useRef(false);
  const chartRef = useRef(chart);

  // Note picker state
  const [notePicker, setNotePicker] = useState(null);
  const [noteOctave, setNoteOctave] = useState(4);
  const [showGroupPanel, setShowGroupPanel] = useState(false);
  const [notesMuted, setNotesMuted] = useState(false);
  const notesMutedRef = useRef(false);
  const [showRecorder, setShowRecorder] = useState(false);
  const notePickerRef = useRef(null);

  // Click-outside to dismiss note picker
  useEffect(() => {
    if (!notePicker) return;
    const handler = (e) => {
      if (notePickerRef.current && !notePickerRef.current.contains(e.target)) {
        setNotePicker(null);
      }
    };
    document.addEventListener("mousedown", handler);
    document.addEventListener("touchstart", handler);
    return () => { document.removeEventListener("mousedown", handler); document.removeEventListener("touchstart", handler); };
  }, [notePicker]);

  // Audio sync state
  const [songPlaying, setSongPlaying] = useState(false);
  const [songLoopState, setSongLoopState] = useState({ isLooping: false, loopStart: 0, loopEnd: 0 });
  const latestSongTimeRef = useRef(0);

  // Tap tempo — taps stored in ref (never rendered), only detected BPM is state
  const tapsRef = useRef([]);
  const [tapBpm, setTapBpm] = useState(null);

  // Update chart with undo — defensive: if updater forgets to return, fall back to clone
  const updateChart = useCallback((updater) => {
    setChart(prev => {
      const clone = JSON.parse(JSON.stringify(prev));
      setUndoStack(s => [...s.slice(-9), clone]);
      const next = typeof updater === "function" ? updater(JSON.parse(JSON.stringify(prev))) : updater;
      const result = next || clone;
      result.updatedAt = Date.now();
      return result;
    });
  }, []);

  // Undo
  const undo = useCallback(() => {
    setUndoStack(stack => {
      if (stack.length === 0) return stack;
      const prev = stack[stack.length - 1];
      setChart(prev);
      return stack.slice(0, -1);
    });
  }, []);

  // Auto-save to localStorage
  useEffect(() => {
    if (!chart.id) return;
    try {
      const all = JSON.parse(localStorage.getItem("strumCharts") || "{}");
      all[chart.id] = chart;
      localStorage.setItem("strumCharts", JSON.stringify(all));
    } catch { }
    if (onSave) onSave(chart);
    // Flash saved indicator
    setSavedShow(true);
    if (savedTimerRef.current) clearTimeout(savedTimerRef.current);
    savedTimerRef.current = setTimeout(() => setSavedShow(false), 1500);
  }, [chart, onSave]);

  // Metronome listener — records timestamps for rAF interpolation
  useEffect(() => {
    const handler = (e) => {
      const { beat, bar } = e.detail;
      if (beat !== undefined) {
        setCurrentBeat(beat);
        lastBeatRef.current = beat;
        lastBeatTimeRef.current = performance.now();
      }
      if (bar !== undefined) {
        setCurrentBar(bar);
        lastBarRef.current = bar;
        if (bar === 0) {
          countdownActiveRef.current = true;
          setCountdownBeat(beat);
        } else if (countdownActiveRef.current) {
          countdownActiveRef.current = false;
          setCountdownBeat(-1);
        }
      }
      setIsPlaying(true);
    };
    const stopHandler = () => {
      setIsPlaying(false); setCurrentBeat(-1); setCurrentBar(-1);
      setEighthCol(-1); setEighthMeasure(-1);
      lastBeatRef.current = -1; lastBarRef.current = -1;
      countdownActiveRef.current = false; setCountdownBeat(-1);
      try { noteSynthRef.current?.triggerRelease(); } catch (_) {}
      legatoActiveRef.current = false;
    };
    window.addEventListener("metroBeat", handler);
    let stopTimer;
    const resetStop = () => { clearTimeout(stopTimer); stopTimer = setTimeout(stopHandler, 1500); };
    window.addEventListener("metroBeat", resetStop);
    return () => {
      window.removeEventListener("metroBeat", handler);
      window.removeEventListener("metroBeat", resetStop);
      clearTimeout(stopTimer);
    };
  }, []);

  // Keep refs current so rAF loop always reads latest values
  bpmRef.current = chart.bpm || 80;
  numMeasuresRef.current = chart.measures.length;
  loopStartRef.current = loopStart;
  loopEndRef.current = loopEnd;
  notesMutedRef.current = notesMuted;
  chartRef.current = chart;

  // Note synth setup/cleanup (mono Synth for legato support)
  useEffect(() => {
    noteSynthRef.current = new Tone.Synth({
      oscillator: { type: "triangle" },
      envelope: { attack: 0.005, decay: 0.1, sustain: 0.6, release: 0.4 },
    }).toDestination();
    noteSynthRef.current.volume.value = 4;
    return () => { noteSynthRef.current?.dispose(); noteSynthRef.current = null; };
  }, []);

  // Note playback via metroBeatAudio (sample-accurate timing, legato-aware)
  //
  // Legato rules:
  //   - Word → bare note(s) → word:  sustain from word through bare notes (melisma)
  //   - Word → gaps → bare note:     sustain through gaps into the bare note
  //   - Word → word (no bare notes): each word is a short note
  //   - Last bare note → no more bare notes: release after this note
  //   - Bare notes with no words:    blend together (instrumental default)
  //   - Scan limited to current group (barsPerGroup) or single bar
  useEffect(() => {
    // Scan ahead within the group to find the next cell that has a note
    const findNextNoteCell = (ch, mIdx, col, nm, ls, le) => {
      const groupSize = Math.max(ch.barsPerGroup || 1, 1);
      const maxCells = groupSize * 8;
      let curM = mIdx, curC = col;
      for (let i = 0; i < maxCells; i++) {
        if (curC < 7) { curC++; } else {
          if (ls !== null && le !== null && ls <= le) {
            curM = ls + ((curM - ls + 1) % (le - ls + 1));
          } else {
            curM = (curM + 1) % nm;
          }
          curC = 0;
          if (curM === mIdx && curC <= col) return null;
        }
        const c = ch.measures[curM]?.cells[curC];
        if (c?.note) return c;
      }
      return null;
    };
    const isBareNote = (c) => c?.note && !(c.lyric && c.lyric.trim());
    const processCell = (synth, cell, cellTime, eighthDur, ch, mIdx, col, nm, ls, le) => {
      if (!synth) return;
      if (!cell?.note) return; // gap — sustain if in melisma, silence otherwise
      const hasNewWord = cell.lyric && cell.lyric.trim();
      const nextNote = findNextNoteCell(ch, mIdx, col, nm, ls, le);
      const nextNoteIsBare = nextNote ? isBareNote(nextNote) : false;
      try {
        if (legatoActiveRef.current && !hasNewWord) {
          // Melisma / instrumental continuation — glide pitch, no re-attack
          synth.portamento = 0.03;
          synth.setNote(cell.note, cellTime);
          if (!nextNoteIsBare) {
            // No more bare notes ahead — last note in melisma, release
            try { synth.triggerRelease(cellTime + eighthDur); } catch (_) {}
            legatoActiveRef.current = false;
          }
        } else {
          // New word/syllable, or first note — fresh attack
          synth.portamento = 0;
          if (legatoActiveRef.current) synth.triggerRelease(cellTime);
          synth.triggerAttack(cell.note, cellTime);
          if (nextNoteIsBare) {
            // Bare note ahead (within group) → melisma starts, sustain
            legatoActiveRef.current = true;
          } else {
            // Next note is a word or no more notes → short note
            try { synth.triggerRelease(cellTime + eighthDur); } catch (_) {}
            legatoActiveRef.current = false;
          }
        }
      } catch (e) { console.debug("note synth:", e); }
    };
    const handleNoteAudio = (e) => {
      const { beat, bar, time } = e.detail;
      if (bar === undefined || time === undefined) return;
      if (Tone.context.state !== "running") return;
      if (notesMutedRef.current) return;
      const realBar = bar - 1;
      if (realBar < 0) return;
      const nm = numMeasuresRef.current;
      const ls = loopStartRef.current;
      const le = loopEndRef.current;
      let measure;
      if (ls !== null && le !== null && ls <= le) {
        measure = ls + (realBar % (le - ls + 1));
      } else {
        measure = realBar % nm;
      }
      const ch = chartRef.current;
      if (!ch?.measures?.[measure]) return;
      const bpm = bpmRef.current;
      const eighthDur = 60 / bpm / 2;
      const downCol = beat * 2;
      processCell(noteSynthRef.current, ch.measures[measure].cells[downCol], time, eighthDur, ch, measure, downCol, nm, ls, le);
      const andCol = downCol + 1;
      if (andCol < 8) {
        processCell(noteSynthRef.current, ch.measures[measure].cells[andCol], time + eighthDur, eighthDur, ch, measure, andCol, nm, ls, le);
      }
    };
    window.addEventListener("metroBeatAudio", handleNoteAudio);
    return () => window.removeEventListener("metroBeatAudio", handleNoteAudio);
  }, []);

  // rAF loop for 8th-note interpolation (when metronome plays, no song audio)
  useEffect(() => {
    if (!isPlaying || songPlaying) {
      cancelAnimationFrame(beatRafRef.current);
      return;
    }
    const animate = () => {
      if (lastBeatRef.current < 0) { beatRafRef.current = requestAnimationFrame(animate); return; }
      const elapsed = performance.now() - lastBeatTimeRef.current;
      const quarterMs = 60000 / bpmRef.current;
      const subBeat = elapsed >= quarterMs / 2 ? 1 : 0;
      const col = lastBeatRef.current * 2 + subBeat;
      const nm = numMeasuresRef.current;
      const realBar = lastBarRef.current - 1;
      if (realBar < 0) {
        setEighthCol(-1);
        setEighthMeasure(-1);
      } else {
        const ls = loopStartRef.current;
        const le = loopEndRef.current;
        let measure;
        if (ls !== null && le !== null && ls <= le) {
          measure = ls + (realBar % (le - ls + 1));
        } else {
          measure = realBar % nm;
        }
        setEighthCol(col);
        setEighthMeasure(measure);
      }
      beatRafRef.current = requestAnimationFrame(animate);
    };
    beatRafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(beatRafRef.current);
  }, [isPlaying, songPlaying]);

  // Audio sync listener — uses songTimeUpdate events from MiniAudioPlayer
  useEffect(() => {
    const handler = (e) => {
      const { currentTime, playing, isLooping, loopStart, loopEnd } = e.detail;
      if (!playing) { setSongPlaying(false); return; }
      setSongPlaying(true);
      latestSongTimeRef.current = currentTime;
      const loop = { isLooping: !!isLooping, loopStart: loopStart || 0, loopEnd: loopEnd || 0 };
      setSongLoopState(loop);

      if (chart.beatOffset > 0 && chart.bpm > 0) {
        let effectiveTime = currentTime;
        if (loop.isLooping && loop.loopEnd > loop.loopStart) {
          effectiveTime = loop.loopStart + ((currentTime - loop.loopStart) % (loop.loopEnd - loop.loopStart));
        }
        const eighthDur = 60 / chart.bpm / 2;
        const elapsed = effectiveTime - chart.beatOffset;
        const totalEighths = Math.floor(elapsed / eighthDur);
        const numMeasures = chart.measures.length;
        setEighthCol(((totalEighths % 8) + 8) % 8);
        setEighthMeasure(((Math.floor(totalEighths / 8) % numMeasures) + numMeasures) % numMeasures);
      }
    };
    window.addEventListener("songTimeUpdate", handler);
    return () => window.removeEventListener("songTimeUpdate", handler);
  }, [chart.beatOffset, chart.bpm, chart.measures.length]);

  // Strum cell handlers — cycle: D → U → X → null (rest/blank) → D
  // Tap on strum cell opens the weight picker modal
  const openStrumPicker = (mIdx, cIdx, isBetween = false) => {
    if (isPlaying) return;
    if (longPressRef.current === "fired") return;
    setStrumPicker({ mIdx, cIdx, isBetween });
  };

  // Set strum value from picker
  const setStrumFromPicker = (val) => {
    if (!strumPicker) return;
    const { mIdx, cIdx, isBetween } = strumPicker;
    updateChart(c => {
      if (isBetween) {
        if (!c.measures[mIdx].between[cIdx]) c.measures[mIdx].between[cIdx] = makeEmptyCell();
        c.measures[mIdx].between[cIdx].strum = val;
      } else {
        c.measures[mIdx].cells[cIdx].strum = val;
      }
      return c;
    });
    setStrumPicker(null);
  };

  const clearStrumCell = (mIdx, cIdx) => {
    updateChart(c => { c.measures[mIdx].cells[cIdx].strum = null; return c; });
  };

  // Long-press handler for strum cells
  const startLongPress = (mIdx, cIdx, type) => {
    longPressRef.current = setTimeout(() => {
      if (type === "strum") clearStrumCell(mIdx, cIdx);
      if (type === "chord") {
        const chord = chart.measures[mIdx].cells[cIdx].chord;
        if (chord && CHORD_VOICINGS[chord]) {
          setChordVoicing({ m: mIdx, c: cIdx });
        }
      }
      longPressRef.current = "fired";
    }, 300);
  };
  const endLongPress = () => {
    if (longPressRef.current && longPressRef.current !== "fired") {
      clearTimeout(longPressRef.current);
      longPressRef.current = null;
    } else if (longPressRef.current === "fired") {
      // Delay null-out so onClick handlers can still check "fired"
      setTimeout(() => { longPressRef.current = null; }, 50);
    }
  };

  // Chord handlers
  const selectChord = (chord) => {
    if (!activeChordCell) return;
    const { m, c } = activeChordCell;
    updateChart(ch => { ch.measures[m].cells[c].chord = chord; return ch; });
    setRecentChords(prev => {
      const next = [chord, ...prev.filter(x => x !== chord)].slice(0, 4);
      return next;
    });
  };
  const clearChord = () => {
    if (!activeChordCell) return;
    const { m, c } = activeChordCell;
    updateChart(ch => { ch.measures[m].cells[c].chord = null; return ch; });
  };

  // Chord tap handler — short tap opens picker, long press opens voicing
  const handleChordCellTap = (mIdx, cIdx) => {
    if (isPlaying) return;
    if (longPressRef.current === "fired") return; // was a long press
    setActiveChordCell({ m: mIdx, c: cIdx });
  };

  // Lyrics handler — textarea is source of truth for what words exist.
  // Placed lyrics that are still in the textarea stay on the grid.
  // Placed lyrics removed from textarea get cleared from the grid.
  // Pool chips for words still in textarea are preserved (including splits).
  // New words get added as new pool chips.
  //
  const handleLyricsPaste = (text) => {
    updateChart(c => {
      c.lyricsInput = text;
      const desired = normalizeAndTokenize(text);

      // --- Step 1: Build inventory of every word across pool + placed ---
      // Each entry: { word, poolChips[], cells[] }
      //   poolChips = chips to keep if word stays in textarea
      //   cells = grid cells to clear if word is removed from textarea
      const fragsByGroup = {};
      c.lyricsPool.forEach(chip => {
        const gid = chipGroup(chip);
        if (gid) {
          if (!fragsByGroup[gid]) fragsByGroup[gid] = { poolChips: [], cellRefs: [] };
          fragsByGroup[gid].poolChips.push(chip);
        }
      });
      c.measures.forEach((m, mi) => m.cells.forEach((cell, ci) => {
        if (cell.lyric && cell.lyricGroupId) {
          const gid = cell.lyricGroupId;
          if (!fragsByGroup[gid]) fragsByGroup[gid] = { poolChips: [], cellRefs: [] };
          fragsByGroup[gid].cellRefs.push({
            m: mi, c: ci, text: cell.lyric, oi: cell.lyricOriginIndex ?? Infinity,
          });
        }
      }));

      const inventory = [];
      const poolChipsInGroups = new Set();

      // Fragment groups → reconstruct full word, track both pool chips and grid cells
      for (const [, { poolChips, cellRefs }] of Object.entries(fragsByGroup)) {
        poolChips.forEach(ch => poolChipsInGroups.add(ch));
        const allFrags = [
          ...poolChips.map(p => ({ text: chipText(p), oi: chipOrigin(p) })),
          ...cellRefs.map(r => ({ text: r.text, oi: r.oi })),
        ];
        allFrags.sort((a, b) => a.oi - b.oi);
        const fullWord = allFrags.map(f => f.text.replace(/-$/, '')).join('');
        inventory.push({ word: fullWord, poolChips, cells: cellRefs.map(r => ({ m: r.m, c: r.c })) });
      }

      // Whole words in pool
      c.lyricsPool.forEach(chip => {
        if (!poolChipsInGroups.has(chip)) {
          inventory.push({ word: chipText(chip), poolChips: [chip], cells: [] });
        }
      });

      // Whole words placed on grid
      c.measures.forEach((m, mi) => m.cells.forEach((cell, ci) => {
        if (cell.lyric && !cell.lyricGroupId) {
          inventory.push({ word: cell.lyric, poolChips: [], cells: [{ m: mi, c: ci }] });
        }
      }));

      // --- Step 2: Match desired words against inventory ---
      const consumed = new Set();
      const newChips = [];

      for (const dw of desired) {
        let matched = false;
        for (let i = 0; i < inventory.length; i++) {
          if (!consumed.has(i) && inventory[i].word === dw.text) {
            consumed.add(i);
            matched = true;
            break;
          }
        }
        if (!matched) newChips.push(dw);
      }

      // --- Step 3: Build final pool + clear orphaned placed lyrics ---
      const keptPool = [];
      for (let i = 0; i < inventory.length; i++) {
        if (consumed.has(i)) {
          keptPool.push(...inventory[i].poolChips);
        } else {
          // Word removed from textarea → drop pool chips AND clear grid cells
          inventory[i].cells.forEach(({ m, c: ci }) => {
            c.measures[m].cells[ci].lyric = "";
            c.measures[m].cells[ci].lyricGroupId = null;
            c.measures[m].cells[ci].lyricOriginIndex = null;
          });
        }
      }

      const maxOrigin = Math.max(0, ...keptPool.map(chipOrigin));
      newChips.forEach((chip, i) => { chip.originIndex = maxOrigin + 1 + i; });

      c.lyricsPool = [...keptPool, ...newChips].sort((a, b) => chipOrigin(a) - chipOrigin(b));
      return c;
    });
    setLyricsEditing(false);
    setSelectedChip(null);
  };

  // Clear all lyrics (pool + placed + input) — for explicit start-over
  const clearAllLyrics = () => {
    updateChart(c => {
      c.lyricsInput = "";
      c.lyricsPool = [];
      c.measures.forEach(m => {
        m.cells.forEach(cell => { cell.lyric = ""; cell.lyricGroupId = null; });
        Object.values(m.between || {}).forEach(b => { if (b) { b.lyric = ""; } });
      });
      return c;
    });
    setLyricsEditing(false);
    setSelectedChip(null);
  };

  const placeLyric = (mIdx, cIdx) => {
    if (selectedChip === null) return;
    const item = chart.lyricsPool[selectedChip];
    if (!item) return;
    updateChart(c => {
      c.measures[mIdx].cells[cIdx].lyric = chipText(item);
      c.measures[mIdx].cells[cIdx].lyricGroupId = chipGroup(item);
      c.measures[mIdx].cells[cIdx].lyricOriginIndex = chipOrigin(item);
      c.lyricsPool = c.lyricsPool.filter((_, i) => i !== selectedChip);
      return c;
    });
    setSelectedChip(null);
  };

  const removePlacedLyric = (mIdx, cIdx) => {
    const cell = chart.measures[mIdx].cells[cIdx];
    if (!cell.lyric) return;
    updateChart(c => {
      const text = c.measures[mIdx].cells[cIdx].lyric;
      const groupId = c.measures[mIdx].cells[cIdx].lyricGroupId;
      const originIndex = c.measures[mIdx].cells[cIdx].lyricOriginIndex ?? Infinity;
      c.measures[mIdx].cells[cIdx].lyric = "";
      c.measures[mIdx].cells[cIdx].lyricGroupId = null;
      c.measures[mIdx].cells[cIdx].lyricOriginIndex = null;
      // Return chip with originIndex for proper re-ordering
      const returned = { text, groupId: groupId || null, originIndex };
      const pool = [...c.lyricsPool, returned];
      pool.sort((a, b) => chipOrigin(a) - chipOrigin(b));
      c.lyricsPool = pool;
      return c;
    });
  };

  const splitChip = (chipIndex, e) => {
    e.stopPropagation();
    const item = chart.lyricsPool[chipIndex];
    const syllables = splitSyllables(item);
    if (!syllables) return;
    const groupId = Date.now() + Math.random(); // avoid collision on rapid splits
    const origin = chipOrigin(item);
    updateChart(c => {
      c.lyricsPool.splice(chipIndex, 1, ...syllables.map((s, i) => ({
        text: s, groupId, originIndex: origin + i * 0.001,
      })));
      return c;
    });
    setSelectedChip(null);
  };

  const joinChip = (chipIndex, e) => {
    e.stopPropagation();
    const item = chart.lyricsPool[chipIndex];
    const groupId = chipGroup(item);
    if (!groupId) return;
    updateChart(c => {
      // Collect all pool fragments with this groupId
      const poolIdxs = [];
      let minOrigin = Infinity;
      c.lyricsPool.forEach((p, i) => {
        if (chipGroup(p) === groupId) {
          poolIdxs.push(i);
          minOrigin = Math.min(minOrigin, chipOrigin(p));
        }
      });
      // Reconstruct word from all fragments (pool + placed), sorted by originIndex
      const allFrags = [];
      c.lyricsPool.forEach(p => { if (chipGroup(p) === groupId) allFrags.push({ text: chipText(p), oi: chipOrigin(p) }); });
      // Pull placed fragments with same groupId back from cells
      c.measures.forEach(m => {
        m.cells.forEach(cell => {
          if (cell.lyricGroupId === groupId) {
            allFrags.push({ text: cell.lyric, oi: cell.lyricOriginIndex ?? Infinity });
            if (cell.lyricOriginIndex != null) minOrigin = Math.min(minOrigin, cell.lyricOriginIndex);
            cell.lyric = '';
            cell.lyricGroupId = null;
            cell.lyricOriginIndex = null;
          }
        });
      });
      // Reconstruct word by sorting fragments, stripping trailing hyphens, and joining
      allFrags.sort((a, b) => a.oi - b.oi);
      const originalWord = allFrags.map(f => f.text.replace(/-$/, '')).join('');
      // Remove pool fragments and insert original word at first fragment's position
      const insertAt = poolIdxs[0];
      const removedBefore = poolIdxs.filter(idx => idx < insertAt).length;
      c.lyricsPool = c.lyricsPool.filter((_, i) => !poolIdxs.includes(i));
      c.lyricsPool.splice(insertAt - removedBefore, 0, {
        text: originalWord, groupId: null, originIndex: minOrigin,
      });
      return c;
    });
    setSelectedChip(null);
  };

  // Measure management — new measures clone strum pattern from previous
  const addMeasure = () => {
    updateChart(c => {
      const newM = makeEmptyMeasure();
      const prev = c.measures[c.measures.length - 1];
      if (prev) {
        prev.cells.forEach((cell, i) => { newM.cells[i].strum = cell.strum; });
      }
      c.measures.push(newM);
      return c;
    });
  };

  const removeMeasure = (mIdx) => {
    if (chart.measures.length <= 1) return;
    const removed = JSON.parse(JSON.stringify(chart.measures[mIdx]));
    updateChart(c => { c.measures.splice(mIdx, 1); return c; });
    setDeleteToast({ measure: removed, index: mIdx });
    setTimeout(() => setDeleteToast(null), 4000);
  };

  const undoDeleteMeasure = () => {
    if (!deleteToast) return;
    updateChart(c => {
      c.measures.splice(deleteToast.index, 0, deleteToast.measure);
      return c;
    });
    setDeleteToast(null);
  };

  // Section operations — copy, paste, duplicate
  const copySection = (mIdx) => {
    const { start, end } = getSectionRange(chart.measures, mIdx);
    const label = chart.measures[mIdx].sectionLabel || `Bar ${mIdx + 1}`;
    const cloned = JSON.parse(JSON.stringify(chart.measures.slice(start, end + 1)));
    setClipboard({ label, measures: cloned });
    setShareMsg(`Copied ${label} (${cloned.length} bar${cloned.length > 1 ? "s" : ""})`);
    setTimeout(() => setShareMsg(""), 2000);
  };

  const pasteAfter = (mIdx) => {
    if (!clipboard) return;
    const { end } = getSectionRange(chart.measures, mIdx);
    if (chart.measures.length + clipboard.measures.length > 200) {
      setShareMsg("Chart limit reached (200 bars max)");
      setTimeout(() => setShareMsg(""), 2000);
      return;
    }
    updateChart(c => {
      const cloned = JSON.parse(JSON.stringify(clipboard.measures));
      c.measures.splice(end + 1, 0, ...cloned);
      return c;
    });
    setClipboard(null);
  };

  const duplicateSection = (mIdx) => {
    const { start, end } = getSectionRange(chart.measures, mIdx);
    const count = end - start + 1;
    if (chart.measures.length + count > 200) {
      setShareMsg("Chart limit reached (200 bars max)");
      setTimeout(() => setShareMsg(""), 2000);
      return;
    }
    updateChart(c => {
      const cloned = JSON.parse(JSON.stringify(c.measures.slice(start, end + 1)));
      c.measures.push(...cloned); // append at end
      return c;
    });
  };

  // Interstitial 16th note slots
  const toggleSlot = (slotIdx) => {
    updateChart(c => {
      if (c.activeSlots.includes(slotIdx)) {
        // Check if any measure has content at this slot
        const hasContent = c.measures.some(m => {
          const b = m.between[slotIdx];
          return b && (b.chord || b.strum || b.lyric);
        });
        if (!hasContent) {
          c.activeSlots = c.activeSlots.filter(s => s !== slotIdx);
          c.measures.forEach(m => delete m.between[slotIdx]);
        }
      } else {
        c.activeSlots = [...c.activeSlots, slotIdx].sort((a, b) => a - b);
      }
      return c;
    });
  };

  // Tap tempo
  const handleTapTempo = () => {
    const now = performance.now();
    const recent = [...tapsRef.current, now].filter(t => now - t < 3000);
    tapsRef.current = recent;
    if (recent.length >= 2) {
      const intervals = [];
      for (let i = 1; i < recent.length; i++) intervals.push(recent[i] - recent[i - 1]);
      const avg = intervals.reduce((a, b) => a + b, 0) / intervals.length;
      const detected = Math.round(60000 / avg);
      if (detected >= 40 && detected <= 280) {
        setTapBpm(detected);
        updateChart(c => { c.bpm = detected; return c; });
        metro.changeBpm(detected);
      }
    }
  };

  // Mark beat 1 for audio sync
  const markBeatOne = () => {
    if (latestSongTimeRef.current > 0) {
      updateChart(c => { c.beatOffset = latestSongTimeRef.current; return c; });
    }
  };
  const nudgeBeatOffset = (amount) => {
    updateChart(c => { c.beatOffset = Math.max(0, (c.beatOffset || 0) + amount); return c; });
  };

  // Share
  const showShareFeedback = (msg) => {
    setShareMsg(msg);
    if (savedTimerRef.current) clearTimeout(savedTimerRef.current);
    savedTimerRef.current = setTimeout(() => setShareMsg(""), 2000);
  };
  const shareChart = async () => {
    const compressed = compressToURL(chart);
    if (!compressed) return;
    const url = window.location.origin + window.location.pathname + "#chart=" + compressed;
    if (url.length > 2000) {
      try { await navigator.clipboard.writeText(JSON.stringify(chart)); } catch { }
      showShareFeedback("JSON Copied");
      return;
    }
    if (navigator.share) {
      try { await navigator.share({ title: chart.title || "Strum Chart", url }); } catch { }
    } else {
      try { await navigator.clipboard.writeText(url); } catch { }
      showShareFeedback("Link Copied");
    }
  };

  // Get strum display — supports compound weight strings: D/Dl/Dh, U/Ul/Uh, X/Xl/Xh
  const strumDisplay = (val) => {
    const type = strumType(val);
    if (!type) return null;
    const w = strumWeight(val);
    const base = type === "D" ? { glyph: "↓", color: T.textDark, weight: 700 }
               : type === "U" ? { glyph: "↑", color: T.textMed, weight: 400 }
               : type === "X" ? { glyph: "×", color: T.coral, weight: 700 }
               : null;
    if (!base) return null;
    if (w === "light") return { ...base, weight: 400, opacity: 0.4, border: `1px dotted ${base.color}40` };
    if (w === "heavy") return { ...base, weight: 900, color: T.gold, fontSizeBoost: 2, border: `2px solid ${T.gold}40` };
    return base;
  };

  // Check if lyric overflows — measure how many empty cells to the right
  const getLyricOverflow = (cells, cIdx) => {
    const word = cells[cIdx].lyric;
    if (!word || word.length <= 5) return 1; // fits in one cell
    let span = 1;
    for (let j = cIdx + 1; j < cells.length; j++) {
      if (cells[j].lyric) break;
      span++;
      if (span * 5 >= word.length) break; // rough char-per-cell estimate
    }
    return span;
  };

  // Beat tracking — uses rAF-interpolated 8th-note position
  const activeMeasure = eighthMeasure;
  const activeCol = eighthCol;

  // Practice mode auto-scroll — scroll active measure into view
  const practiceMeasureRefs = useRef([]);
  useEffect(() => {
    if (!practiceMode || activeMeasure < 0) return;
    const el = practiceMeasureRefs.current[activeMeasure];
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [practiceMode, activeMeasure]);

  // ─── Practice Mode View ──────────────────────────────────────────────────
  if (practiceMode) {
    const strumGlyph = (val) => {
      const type = strumType(val);
      if (!type) return null;
      if (type === "D") return "↓";
      if (type === "U") return "↑";
      if (type === "X") return "×";
      return null;
    };

    const anyNotes = chart.measures.some(m => m.cells.some(c => c?.note));

    return (
      <div style={{ fontFamily: T.sans, minHeight: "100vh", background: T.bg, padding: isWide ? "20px 40px" : "12px 16px 100px 16px" }}>
        {/* Practice header — minimal */}
        <div style={{
          position: "sticky", top: 0, zIndex: 100, background: T.bg,
          display: "flex", alignItems: "center", justifyContent: "space-between",
          padding: "12px 0", borderBottom: `1px solid ${T.borderSoft}`,
          marginBottom: 16,
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <button onClick={onBack} style={{
              background: "none", border: "none", cursor: "pointer", color: T.textMed, padding: 4,
            }}>← Back</button>
            <span style={{ fontSize: isWide ? 22 : 18, fontFamily: T.serif, fontWeight: 600, color: T.textDark }}>
              {chart.title || "Untitled Chart"}
            </span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            {loopStart !== null && loopEnd !== null ? (
              <span
                onClick={() => { setLoopStart(null); setLoopEnd(null); setLoopSelecting(false); }}
                style={{
                  fontSize: 10, fontWeight: 700, fontFamily: T.sans,
                  color: T.gold, background: T.getTint(T.gold, 0.1),
                  padding: "3px 8px", borderRadius: 10, cursor: "pointer",
                  border: `1px solid ${T.gold}40`, userSelect: "none",
                }}
              >
                Loop {loopStart + 1}–{loopEnd + 1} ×
              </span>
            ) : (
              <button onClick={() => {
                if (loopSelecting) {
                  setLoopSelecting(false); setLoopStart(null);
                } else {
                  setLoopSelecting(true);
                }
              }} style={{
                fontSize: 10, padding: "3px 10px", borderRadius: 10, cursor: "pointer",
                fontWeight: 700, fontFamily: T.sans,
                background: loopSelecting ? T.getTint(T.gold, 0.15) : "transparent",
                color: loopSelecting ? T.gold : T.textMed,
                border: `1px solid ${loopSelecting ? T.gold : T.border}`,
              }}>{loopSelecting ? "Cancel" : "Loop"}</button>
            )}
            {chart.measures.some(m => m.cells.some(c => c?.note)) && (
              <button onClick={() => setNotesMuted(!notesMuted)} style={{
                fontSize: 10, padding: "3px 10px", borderRadius: 10, cursor: "pointer",
                fontWeight: 700, fontFamily: T.sans,
                background: notesMuted ? T.getTint(T.coral, 0.1) : T.getTint(T.note, 0.1),
                color: notesMuted ? T.coral : T.note,
                border: `1px solid ${notesMuted ? T.coral : T.note}40`,
              }}>{notesMuted ? "Notes ✕" : "Notes ♪"}</button>
            )}
            <button onClick={() => setShowRecorder(!showRecorder)} style={{
              fontSize: 10, padding: "3px 10px", borderRadius: 10, cursor: "pointer",
              fontWeight: 700, fontFamily: T.sans,
              background: showRecorder ? T.getTint(T.coral, 0.1) : "transparent",
              color: showRecorder ? T.coral : T.textMed,
              border: `1px solid ${showRecorder ? T.coral : T.border}40`,
            }}>Rec</button>
            <span style={{ fontSize: 12, color: T.textMuted, fontWeight: 700, fontFamily: T.sans }}>
              {chart.bpm || 80} BPM
            </span>
            {metro && (
              <button onClick={() => { metro.changeBpm(chart.bpm || 80); metro.playing ? metro.stop() : metro.start(); }} style={{
                fontSize: 10, padding: "6px 14px", borderRadius: T.radius, cursor: "pointer",
                fontWeight: 800, textTransform: "uppercase", letterSpacing: 1, fontFamily: T.sans,
                background: metro.playing ? "transparent" : T.gold,
                color: metro.playing ? T.coral : "#fff",
                border: `1px solid ${metro.playing ? T.coral : T.gold}`,
              }}>{metro.playing ? "Stop" : "▶ Play"}</button>
            )}
            <button onClick={() => { setLoopStart(null); setLoopEnd(null); setLoopSelecting(false); setPracticeMode(false); }} style={{
              fontSize: 10, padding: "6px 14px", borderRadius: T.radius, cursor: "pointer",
              fontWeight: 700, fontFamily: T.sans, textTransform: "uppercase", letterSpacing: 1,
              background: "transparent", color: T.textMed, border: `1px solid ${T.border}`,
            }}>Edit</button>
          </div>
        </div>

        {/* Loop selection instruction bar */}
        {loopSelecting && loopStart === null && (
          <div style={{
            textAlign: "center", padding: "8px 12px", marginBottom: 8,
            background: T.getTint(T.gold, 0.08), borderRadius: T.radiusMd,
            border: `1px solid ${T.gold}30`,
            fontSize: 12, fontWeight: 600, fontFamily: T.sans, color: T.gold,
          }}>Tap the start measure</div>
        )}
        {loopSelecting && loopStart !== null && loopEnd === null && (
          <div style={{
            textAlign: "center", padding: "8px 12px", marginBottom: 8,
            background: T.getTint(T.gold, 0.08), borderRadius: T.radiusMd,
            border: `1px solid ${T.gold}30`,
            fontSize: 12, fontWeight: 600, fontFamily: T.sans, color: T.gold,
          }}>Tap the end measure</div>
        )}

        {/* Recorder in practice mode */}
        {showRecorder && (
          <div style={{ marginBottom: 8 }}>
            <AudioRecorder theme={T} inline />
          </div>
        )}

        {/* Countdown overlay */}
        {countdownBeat >= 0 && (
          <div key={countdownBeat} style={{
            textAlign: "center", padding: "24px 0 16px",
            fontSize: 48, fontWeight: 800, fontFamily: T.sans,
            color: T.gold, letterSpacing: 4,
            animation: "fadeIn 0.15s ease-out",
          }}>
            {countdownBeat + 1}
          </div>
        )}

        {/* Practice measures — large, clean, read-only */}
        <div style={isWide ? {
          display: "grid", gridTemplateColumns: "1fr 1fr", gap: 0,
          border: `1px solid ${T.border}`, borderRadius: T.radiusMd, overflow: "hidden", paddingBottom: 8,
        } : {}}>
          {chart.measures.map((measure, mIdx) => {
            const isActive = activeMeasure === mIdx;
            const isInLoop = loopStart !== null && loopEnd !== null && mIdx >= loopStart && mIdx <= loopEnd;
            const isLoopStartOnly = loopStart !== null && loopEnd === null && mIdx === loopStart;
            // Build column template for practice mode
            let colTemplate = "";
            for (let i = 0; i < 8; i++) {
              colTemplate += "1fr ";
              if (chart.activeSlots.includes(i) && i < 7) colTemplate += "24px ";
            }
            const hasLyrics = measure.cells.some(c => c.lyric);

            return (
              <div
                key={mIdx}
                ref={el => practiceMeasureRefs.current[mIdx] = el}
                onClick={() => {
                  if (!loopSelecting) return;
                  if (loopStart === null) {
                    setLoopStart(mIdx);
                  } else if (loopEnd === null) {
                    if (mIdx < loopStart) { setLoopEnd(loopStart); setLoopStart(mIdx); }
                    else if (mIdx === loopStart) { setLoopStart(null); }
                    else { setLoopEnd(mIdx); }
                    setLoopSelecting(false);
                  }
                }}
                style={{
                  padding: isWide ? "12px 16px" : "10px 12px",
                  cursor: loopSelecting ? "pointer" : "default",
                  background: isActive ? T.getTint(T.gold, 0.08) : (isInLoop || isLoopStartOnly) ? T.getTint(T.gold, 0.04) : "transparent",
                  transition: "background 0.3s",
                  ...(isWide ? {
                    borderRight: mIdx % 2 === 0 && mIdx + 1 < chart.measures.length ? `1px solid ${T.borderSoft}` : "none",
                    borderBottom: mIdx + 2 < chart.measures.length ? `1px solid ${T.borderSoft}` : "none",
                  } : {
                    borderBottom: mIdx < chart.measures.length - 1 ? `1px solid ${T.borderSoft}` : "none",
                  }),
                }}
              >
                {/* Measure number + section label */}
                <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 6 }}>
                  <span style={{
                    fontSize: 10, fontWeight: 700, fontFamily: T.sans,
                    color: (isInLoop || isLoopStartOnly) ? T.gold : T.textMuted,
                  }}>{mIdx + 1}</span>
                  {measure.sectionLabel && (
                    <span style={{ fontSize: 10, fontWeight: 700, color: T.gold, fontFamily: T.sans, textTransform: "uppercase", letterSpacing: 1 }}>
                      {measure.sectionLabel}
                    </span>
                  )}
                </div>

                {/* Grid — enlarged for readability */}
                <div style={{
                  display: "grid",
                  gridTemplateColumns: colTemplate,
                }}>
                  {/* Beat labels */}
                  {measure.cells.map((_, cIdx) => {
                    const label = BEAT_LABELS_8[cIdx];
                    const isDownbeat = cIdx % 2 === 0;
                    const isBeatActive = isActive && activeCol === cIdx;
                    return (
                      <React.Fragment key={`pb-${cIdx}`}>
                        <div style={{
                          textAlign: "center", fontSize: 10, fontFamily: T.sans,
                          color: isDownbeat ? T.textMed : T.textMuted,
                          fontWeight: isDownbeat ? 700 : 400,
                          background: isBeatActive ? T.getTint(T.gold, 0.25) : "transparent",
                          borderRadius: T.radius, padding: "2px 0",
                          transition: "background 0.1s",
                        }}>{label}</div>
                        {chart.activeSlots.includes(cIdx) && cIdx < 7 && (
                          <div style={{ textAlign: "center", fontSize: 8, color: T.textMuted, padding: "2px 0" }}>
                            {cIdx % 2 === 0 ? "e" : "a"}
                          </div>
                        )}
                      </React.Fragment>
                    );
                  })}

                  {/* Chord row — large */}
                  {measure.cells.map((cell, cIdx) => {
                    let displayChord = cell.chord;
                    let isSpanContinuation = false;
                    if (!displayChord) {
                      for (let j = cIdx - 1; j >= 0; j--) {
                        if (measure.cells[j].chord) { displayChord = measure.cells[j].chord; isSpanContinuation = true; break; }
                      }
                    }
                    return (
                      <React.Fragment key={`pc-${cIdx}`}>
                        <div style={{
                          textAlign: "center", fontFamily: T.serif,
                          fontSize: isWide ? 20 : 17, fontWeight: 700,
                          color: cell.chord ? T.gold : (isSpanContinuation ? T.gold + "30" : "transparent"),
                          padding: "4px 2px", minHeight: isWide ? 34 : 30,
                          display: "flex", alignItems: "center", justifyContent: "center",
                        }}>
                          {cell.chord ? displayChord : (isSpanContinuation ? "·" : "")}
                        </div>
                        {chart.activeSlots.includes(cIdx) && cIdx < 7 && (
                          <div style={{
                            textAlign: "center", fontSize: isWide ? 16 : 14, fontFamily: T.serif,
                            color: T.gold + "60", minHeight: isWide ? 34 : 30,
                            display: "flex", alignItems: "center", justifyContent: "center",
                          }}>{measure.between[cIdx]?.chord || ""}</div>
                        )}
                      </React.Fragment>
                    );
                  })}

                  {/* Strum row — large arrows */}
                  {measure.cells.map((cell, cIdx) => {
                    const glyph = strumGlyph(cell.strum);
                    const isBeatActive = isActive && activeCol === cIdx;
                    return (
                      <React.Fragment key={`ps-${cIdx}`}>
                        <div style={{
                          textAlign: "center", fontSize: isWide ? 22 : 18,
                          fontWeight: strumType(cell.strum) === "D" || strumType(cell.strum) === "X" ? 700 : 400,
                          color: strumType(cell.strum) === "X" ? T.coral : (glyph ? T.textDark : "transparent"),
                          minHeight: isWide ? 36 : 32,
                          display: "flex", alignItems: "center", justifyContent: "center",
                          background: isBeatActive ? T.getTint(T.gold, 0.15) : "transparent",
                          borderRadius: T.radius, transition: "background 0.1s",
                        }}>{glyph || ""}</div>
                        {chart.activeSlots.includes(cIdx) && cIdx < 7 && (
                          <div style={{
                            textAlign: "center", fontSize: isWide ? 17 : 14, opacity: 0.7,
                            color: strumGlyph(measure.between[cIdx]?.strum) ? T.textDark : "transparent",
                            minHeight: isWide ? 36 : 32,
                            display: "flex", alignItems: "center", justifyContent: "center",
                          }}>{strumGlyph(measure.between[cIdx]?.strum) || ""}</div>
                        )}
                      </React.Fragment>
                    );
                  })}

                  {/* Note row — show for all measures when any measure has notes */}
                  {anyNotes && measure.cells.map((cell, cIdx) => {
                    const isBeatActive = isActive && activeCol === cIdx;
                    const noteOct = cell?.note ? parseInt(cell.note.slice(-1)) || 4 : 4;
                    const pitchOpacity = cell?.note ? 0.4 + (noteOct - 2) * 0.15 : 0;
                    return (
                      <React.Fragment key={`pn-${cIdx}`}>
                        <div style={{
                          textAlign: "center", fontSize: isWide ? 13 : 11,
                          fontFamily: T.sans, fontWeight: 600,
                          color: cell?.note ? T.note : "transparent",
                          opacity: cell?.note ? pitchOpacity : 1,
                          minHeight: isWide ? 24 : 20,
                          display: "flex", alignItems: "center", justifyContent: "center",
                          background: isBeatActive && cell?.note ? T.getTint(T.note, 0.15) : "transparent",
                          borderRadius: T.radius, transition: "background 0.1s, opacity 0.15s",
                        }}>{cell?.note || ""}</div>
                        {chart.activeSlots.includes(cIdx) && cIdx < 7 && (
                          <div style={{
                            textAlign: "center", fontSize: isWide ? 10 : 9, fontFamily: T.sans,
                            color: T.note, opacity: 0.6,
                            minHeight: isWide ? 24 : 20,
                            display: "flex", alignItems: "center", justifyContent: "center",
                          }}>{measure.between[cIdx]?.note || ""}</div>
                        )}
                      </React.Fragment>
                    );
                  })}

                  {/* Lyric row — if any lyrics exist in this measure */}
                  {hasLyrics && measure.cells.map((cell, cIdx) => (
                    <React.Fragment key={`pl-${cIdx}`}>
                      <div style={{
                        textAlign: "center", fontSize: isWide ? 15 : 13,
                        fontFamily: T.serif, fontStyle: "italic", color: T.textDark,
                        minHeight: isWide ? 28 : 24,
                        display: "flex", alignItems: "center", justifyContent: "center",
                        overflow: "visible", whiteSpace: "nowrap", position: "relative",
                      }}>{cell.lyric || ""}</div>
                      {chart.activeSlots.includes(cIdx) && cIdx < 7 && (
                        <div style={{
                          textAlign: "center", fontSize: isWide ? 12 : 10, fontFamily: T.serif,
                          fontStyle: "italic", color: T.textDark, opacity: 0.7,
                          minHeight: isWide ? 28 : 24,
                          display: "flex", alignItems: "center", justifyContent: "center",
                        }}>{measure.between[cIdx]?.lyric || ""}</div>
                      )}
                    </React.Fragment>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Mobile: floating Play/Stop at bottom */}
        {!isWide && metro && (
          <div style={{
            position: "fixed", bottom: 24, left: "50%", transform: "translateX(-50%)",
            display: "flex", gap: 8, zIndex: 200,
          }}>
            <button onClick={() => { metro.changeBpm(chart.bpm || 80); metro.playing ? metro.stop() : metro.start(); }} style={{
              fontSize: 12, padding: "12px 24px", borderRadius: 24, cursor: "pointer",
              fontWeight: 800, textTransform: "uppercase", letterSpacing: 1, fontFamily: T.sans,
              background: metro.playing ? T.textDark : T.gold,
              color: "#fff",
              border: "none",
              boxShadow: "0 4px 16px rgba(0,0,0,0.2)",
            }}>{metro.playing ? "■ Stop" : "▶ Play"}</button>
            <button onClick={() => { setLoopStart(null); setLoopEnd(null); setLoopSelecting(false); setPracticeMode(false); }} style={{
              fontSize: 11, padding: "12px 18px", borderRadius: 24, cursor: "pointer",
              fontWeight: 700, fontFamily: T.sans,
              background: T.bgCard, color: T.textMed, border: `1px solid ${T.border}`,
              boxShadow: "0 4px 16px rgba(0,0,0,0.1)",
            }}>Edit</button>
          </div>
        )}
      </div>
    );
  }

  return (
    <div style={{ fontFamily: T.sans }}>
      {/* Sticky controls zone — breaks out of maxWidth container on desktop */}
      <div style={{
        position: "sticky", top: 0, zIndex: 100,
        background: T.bg, paddingBottom: 4, marginBottom: 4,
        borderBottom: `1px solid ${T.borderSoft}`,
        boxShadow: "0 2px 8px rgba(44,40,37,0.04)",
        ...(isWide ? {
          width: "100vw",
          marginLeft: "calc(-50vw + 50%)",
          paddingLeft: "calc(50vw - 50%)",
          paddingRight: "calc(50vw - 50%)",
        } : {}),
      }}>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
        {onBack && (
          <button onClick={onBack} style={{
            background: "none", border: "none", cursor: "pointer", color: T.textMed, padding: 4,
          }}>← Back</button>
        )}
        <input
          type="text"
          value={chart.title}
          onChange={e => setChart(c => ({ ...c, title: e.target.value, updatedAt: Date.now() }))}
          placeholder="Untitled Chart"
          style={{
            flex: 1, fontSize: 20, fontFamily: T.serif, fontWeight: 600, color: T.textDark,
            border: "none", borderBottom: `1px solid ${T.borderSoft}`, background: "transparent",
            padding: "4px 0", outline: "none",
          }}
        />
        <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
          {savedShow && (
            <span style={{
              fontSize: 9, color: T.success, fontWeight: 700, letterSpacing: 1,
              textTransform: "uppercase", fontFamily: T.sans,
              animation: "fade-in-up 0.3s ease",
            }}>Saved</span>
          )}
          <button onClick={undo} disabled={undoStack.length === 0} style={{
            background: "none", border: "none", cursor: undoStack.length ? "pointer" : "default",
            color: undoStack.length ? T.textMed : T.borderSoft, padding: 4,
          }}><Undo2 size={16} /></button>
          <button onClick={() => setShowPrint(true)} style={{
            background: "none", border: "none", cursor: "pointer", color: T.textMed, padding: 4,
          }} title="Print chart"><Printer size={16} /></button>
          <button onClick={shareChart} style={{
            background: "none", border: "none", cursor: "pointer", color: T.textMed, padding: 4,
            position: "relative",
          }}>
            <Share2 size={16} />
            {shareMsg && (
              <span style={{
                position: "absolute", bottom: "calc(100% + 6px)", left: "50%", transform: "translateX(-50%)",
                fontSize: 9, fontWeight: 700, letterSpacing: 1, textTransform: "uppercase",
                fontFamily: T.sans, color: "#fff", background: T.success,
                padding: "4px 10px", borderRadius: T.radiusMd, whiteSpace: "nowrap",
                animation: "fade-in-up 0.25s ease", boxShadow: T.sm,
              }}>{shareMsg}</span>
            )}
          </button>
          <button onClick={() => setPracticeMode(true)} style={{
            fontSize: 9, padding: "4px 10px", borderRadius: T.radius, cursor: "pointer",
            fontWeight: 800, textTransform: "uppercase", letterSpacing: 1, fontFamily: T.sans,
            background: T.getTint(T.gold, 0.1), color: T.gold,
            border: `1px solid ${T.gold}40`,
          }}>Practice</button>
        </div>
      </div>

      {/* Song picker + BPM controls — side by side on desktop */}
      <div style={isWide ? { display: "flex", gap: 24, alignItems: "flex-start" } : {}}>
        <div style={isWide ? { flex: 1 } : {}}>
          <SongPicker
            theme={T}
            youtubeUrl={chart.youtubeUrl || ""}
            onYoutubeChange={(url) => updateChart(c => { c.youtubeUrl = url; return c; })}
            hidePlayer={isWide}
          />
        </div>
        <div style={isWide ? { flex: "0 0 auto" } : {}}>
          {/* Toolbar: BPM + Play + Tap (left) | pill toggles (right) */}
          <div style={{ display: "flex", gap: 8, marginBottom: 8, alignItems: "center", justifyContent: "space-between", flexWrap: "wrap" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                <span style={{ fontSize: 10, color: T.textMuted, fontWeight: 600, textTransform: "uppercase", letterSpacing: 1 }}>BPM</span>
                <input
                  type="text" inputMode="numeric" pattern="[0-9]*"
                  value={chart.bpm === undefined ? "" : chart.bpm}
                  onChange={e => {
                    const raw = e.target.value.replace(/[^0-9]/g, "");
                    if (raw === "") {
                      setChart(c => ({ ...c, bpm: undefined, updatedAt: Date.now() }));
                    } else {
                      const v = Math.min(280, parseInt(raw));
                      setChart(c => ({ ...c, bpm: v, updatedAt: Date.now() }));
                      if (metro) metro.changeBpm(v);
                    }
                  }}
                  onBlur={() => {
                    if (!chart.bpm || chart.bpm < 40) setChart(c => ({ ...c, bpm: 80, updatedAt: Date.now() }));
                  }}
                  style={{
                    width: 48, fontSize: 14, fontWeight: 700, textAlign: "center", color: T.textDark,
                    border: `1px solid ${T.border}`, borderRadius: T.radius, background: T.bgSoft,
                    padding: "4px 2px", fontFamily: T.sans,
                  }}
                />
                {metro && (
                  <button onClick={() => { metro.changeBpm(chart.bpm || 80); metro.playing ? metro.stop() : metro.start(); }} style={{
                    fontSize: 9, padding: "5px 12px", borderRadius: T.radius, cursor: "pointer",
                    fontWeight: 800, textTransform: "uppercase", letterSpacing: 1, fontFamily: T.sans,
                    background: metro.playing ? "transparent" : T.gold,
                    color: metro.playing ? T.coral : "#fff",
                    border: `1px solid ${metro.playing ? T.coral : T.gold}`,
                  }}>{metro.playing ? "Stop" : "▶ Play"}</button>
                )}
              </div>
              <button onClick={handleTapTempo} style={{
                fontSize: 9, padding: "5px 10px", borderRadius: T.radius, cursor: "pointer",
                fontWeight: 800, textTransform: "uppercase", letterSpacing: 1, fontFamily: T.sans,
                background: tapBpm ? T.getTint(T.gold, 0.15) : "transparent",
                color: tapBpm ? T.gold : T.textMed,
                border: `1px solid ${tapBpm ? T.gold : T.border}`,
                transition: "all 0.15s",
              }}>Tap{tapBpm ? ` ${tapBpm}` : ""}</button>
            </div>

            {/* Chart settings — pill group (right side) */}
            {(() => {
              const pillStyle = (active) => ({
                fontSize: 9, padding: "4px 8px", cursor: "pointer",
                fontWeight: 700, fontFamily: T.sans, textTransform: "uppercase", letterSpacing: 0.5,
                background: active ? T.getTint(T.gold, 0.1) : "transparent",
                color: active ? T.gold : T.textMuted,
                border: "none", borderRight: `1px solid ${T.borderSoft}`,
                transition: "all 0.15s",
              });
              return (
              <div style={{
                display: "inline-flex", borderRadius: T.radiusMd, border: `1px solid ${T.border}`,
                overflow: "hidden",
              }}>
              <button onClick={() => {
                updateChart(c => {
                  const allOn = [0, 1, 2, 3, 4, 5, 6].every(s => c.activeSlots.includes(s));
                  if (allOn) {
                    c.activeSlots = c.activeSlots.filter(s => c.measures.some(m => {
                      const b = m.between[s];
                      return b && (b.chord || b.strum || b.lyric || b.note);
                    }));
                  } else {
                    c.activeSlots = [0, 1, 2, 3, 4, 5, 6];
                  }
                  return c;
                });
              }} style={pillStyle(chart.activeSlots.length > 0)}>16th</button>

              <button onClick={() => {
                if (loopStart !== null && loopEnd !== null) {
                  setLoopStart(null); setLoopEnd(null); setLoopSelecting(false);
                } else if (loopSelecting) {
                  setLoopSelecting(false); setLoopStart(null);
                } else {
                  setLoopSelecting(true);
                }
              }} style={{
                ...pillStyle(loopStart !== null || loopSelecting),
                color: (loopStart !== null && loopEnd !== null) ? T.gold : loopSelecting ? T.gold : T.textMuted,
              }}>
                {loopStart !== null && loopEnd !== null ? `Loop ${loopStart + 1}–${loopEnd + 1}` : loopSelecting ? "Cancel" : "Loop"}
              </button>

              <button onClick={() => setNotesMuted(!notesMuted)} style={{
                ...pillStyle(!notesMuted && chart.measures.some(m => m.cells.some(c => c?.note))),
                color: notesMuted ? T.coral : chart.measures.some(m => m.cells.some(c => c?.note)) ? T.note : T.textMuted,
              }}>{notesMuted ? "Notes ✕" : "Notes"}</button>

              <button onClick={() => setShowGroupPanel(!showGroupPanel)} style={{
                ...pillStyle((chart.barsPerGroup || 0) > 0 || showGroupPanel),
              }}>Group{(chart.barsPerGroup || 0) > 0 ? ` ${chart.barsPerGroup}` : ""}</button>

              <button onClick={() => setShowRecorder(!showRecorder)} style={{
                ...pillStyle(showRecorder),
                borderRight: "none",
                color: showRecorder ? T.coral : T.textMuted,
              }}>Rec</button>
            </div>
            );
          })()}
          </div>

          {/* Group panel — expands below */}
          {showGroupPanel && (
            <div style={{ display: "flex", gap: 4, marginBottom: 8, alignItems: "center", animation: "fade-in-up 0.15s ease" }}>
              <span style={{ fontSize: 9, color: T.textMuted, fontWeight: 600, textTransform: "uppercase", letterSpacing: 1, fontFamily: T.sans }}>Bars per group:</span>
              {[0, 2, 4, 8].map(g => (
                <button key={g} onClick={() => { updateChart(c => { c.barsPerGroup = g; return c; }); setShowGroupPanel(false); }} style={{
                  fontSize: 10, padding: "4px 10px", borderRadius: T.radius, cursor: "pointer",
                  fontWeight: 700, fontFamily: T.sans,
                  background: (chart.barsPerGroup || 0) === g ? T.gold : T.bgSoft,
                  color: (chart.barsPerGroup || 0) === g ? "#fff" : T.textMed,
                  border: `1px solid ${(chart.barsPerGroup || 0) === g ? T.gold : T.border}`,
                  transition: "all 0.15s",
                }}>{g === 0 ? "Off" : g}</button>
              ))}
            </div>
          )}

          {/* Recorder panel */}
          {showRecorder && (
            <div style={{ marginBottom: 8 }}>
              <AudioRecorder theme={T} inline />
            </div>
          )}

          {/* Loop selection instruction bar */}
          {loopSelecting && loopStart === null && (
            <div style={{
              textAlign: "center", padding: "8px 12px", marginBottom: 8,
              background: T.getTint(T.gold, 0.08), borderRadius: T.radiusMd,
              border: `1px solid ${T.gold}30`,
              fontSize: 12, fontWeight: 600, fontFamily: T.sans, color: T.gold,
            }}>Tap the start measure</div>
          )}
          {loopSelecting && loopStart !== null && loopEnd === null && (
            <div style={{
              textAlign: "center", padding: "8px 12px", marginBottom: 8,
              background: T.getTint(T.gold, 0.08), borderRadius: T.radiusMd,
              border: `1px solid ${T.gold}30`,
              fontSize: 12, fontWeight: 600, fontFamily: T.sans, color: T.gold,
            }}>Tap the end measure</div>
          )}

          {/* Audio sync — Mark Beat 1 + nudge (only shows when song playing) */}
          {songPlaying && (
            <div style={{ display: "flex", gap: 6, marginBottom: 12, alignItems: "center", flexWrap: "wrap" }}>
              <button onClick={markBeatOne} style={{
                fontSize: 9, padding: "5px 10px", borderRadius: T.radius, cursor: "pointer",
                fontWeight: 800, textTransform: "uppercase", letterSpacing: 1, fontFamily: T.sans,
                background: chart.beatOffset > 0 ? T.getTint(T.gold, 0.12) : "transparent",
                color: chart.beatOffset > 0 ? T.gold : T.textMed,
                border: `1px solid ${chart.beatOffset > 0 ? T.gold : T.border}`,
                transition: "all 0.15s",
              }}>Mark Beat 1</button>
              {chart.beatOffset > 0 && (
                <>
                  <span style={{ fontSize: 10, color: T.textMuted, fontFamily: T.sans, fontVariantNumeric: "tabular-nums" }}>
                    {chart.beatOffset.toFixed(2)}s
                  </span>
                  <button onClick={() => nudgeBeatOffset(-0.01)} style={{
                    fontSize: 10, padding: "3px 8px", borderRadius: T.radius, cursor: "pointer",
                    background: T.bgSoft, border: `1px solid ${T.border}`, color: T.textMed,
                    fontWeight: 700, fontFamily: T.sans,
                  }}>-10ms</button>
                  <button onClick={() => nudgeBeatOffset(0.01)} style={{
                    fontSize: 10, padding: "3px 8px", borderRadius: T.radius, cursor: "pointer",
                    background: T.bgSoft, border: `1px solid ${T.border}`, color: T.textMed,
                    fontWeight: 700, fontFamily: T.sans,
                  }}>+10ms</button>
                  {songLoopState.isLooping && chart.beatOffset < songLoopState.loopStart && (
                    <span style={{ fontSize: 9, color: T.coral, fontFamily: T.sans, fontWeight: 600 }}>
                      Re-mark within loop
                    </span>
                  )}
                </>
              )}
            </div>
          )}
        </div>
      </div>
      </div>{/* end sticky controls zone */}

      {/* Desktop: full-width audio player below controls */}
      {isWide && (() => {
        const ytVideoId = extractYouTubeId(chart.youtubeUrl || "");
        if (ytVideoId) return <YouTubeAudioPlayer videoId={ytVideoId} theme={T} title="YouTube" />;
        return null;
      })()}

      {/* Lyrics input */}
      <div style={{
        marginBottom: 16, padding: "12px 16px", background: T.bgSoft,
        border: `1px solid ${T.border}`, borderRadius: T.radiusMd,
      }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: lyricsEditing ? 8 : 0 }}>
          <span style={{ fontSize: 9, color: T.textMuted, fontWeight: 600, textTransform: "uppercase", letterSpacing: 1 }}>Lyrics</span>
          <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
            {!lyricsEditing && chart.lyricsInput && (
              <button onClick={clearAllLyrics} style={{
                fontSize: 9, background: "none", border: "none", color: T.textMuted, cursor: "pointer",
                fontWeight: 600, textTransform: "uppercase", letterSpacing: 1,
              }}>Clear</button>
            )}
            {!lyricsEditing && chart.lyricsInput && (
              <button onClick={() => setLyricsEditing(true)} style={{
                fontSize: 9, background: "none", border: "none", color: T.gold, cursor: "pointer",
                fontWeight: 700, textTransform: "uppercase", letterSpacing: 1,
              }}><Edit3 size={10} style={{ marginRight: 3 }} />Edit</button>
            )}
          </div>
        </div>
        {lyricsEditing ? (
          <div>
            <textarea
              value={chart.lyricsInput}
              onChange={e => setChart(c => ({ ...c, lyricsInput: e.target.value }))}
              placeholder="Paste your lyrics here — words become placeable chips"
              rows={2}
              style={{
                width: "100%", fontSize: 13, fontFamily: T.serif, color: T.textDark,
                border: `1px solid ${T.border}`, borderRadius: T.radius, background: T.bgCard,
                padding: 8, resize: "vertical", outline: "none", boxSizing: "border-box",
              }}
            />
            <button
              onClick={() => handleLyricsPaste(chart.lyricsInput)}
              disabled={!chart.lyricsInput?.trim()}
              style={{
                marginTop: 6, fontSize: 9, padding: "5px 14px", borderRadius: T.radius, cursor: "pointer",
                fontWeight: 800, textTransform: "uppercase", letterSpacing: 1, fontFamily: T.sans,
                background: chart.lyricsInput?.trim() ? T.gold : T.borderSoft,
                color: chart.lyricsInput?.trim() ? "#fff" : T.textMuted,
                border: "none",
              }}
            >Set Lyrics</button>
          </div>
        ) : !chart.lyricsInput ? (
          <button onClick={() => setLyricsEditing(true)} style={{
            fontSize: 11, color: T.textMuted, background: "none", border: `1px dashed ${T.border}`,
            borderRadius: T.radius, padding: "8px 12px", cursor: "pointer", width: "100%",
            fontFamily: T.sans, marginTop: 8,
          }}>+ Add Lyrics</button>
        ) : null}
      </div>

      {/* Playback indicator */}
      {(isPlaying || songPlaying) && (
        <div style={{
          textAlign: "center", fontSize: 9, color: T.gold, fontWeight: 700,
          textTransform: "uppercase", letterSpacing: 2, marginBottom: 8, fontFamily: T.sans,
        }}>♪ Playing — tap grid to pause</div>
      )}

      {/* Measures — grouped by barsPerGroup, 2-col on desktop when not playing */}
      {(() => {
        const bpg = chart.barsPerGroup || 0;
        const twoCol = isWide && !isPlaying && !songPlaying;
        const items = chart.measures.map((m, i) => ({ measure: m, globalIdx: i }));
        const groups = bpg > 0
          ? Array.from({ length: Math.ceil(items.length / bpg) }, (_, gi) => items.slice(gi * bpg, (gi + 1) * bpg))
          : [items];

        return (<div>
        {groups.map((group, gIdx) => (
          <div key={gIdx} style={{
            ...(bpg > 0 ? {
              borderLeft: `3px solid ${T.gold}`,
              paddingLeft: 10,
              paddingBottom: 4,
              marginBottom: gIdx < groups.length - 1 ? 28 : 8,
              position: "relative",
            } : {}),
            // Unified container on desktop: single outer border wrapping the grid
            ...(twoCol ? {
              borderTop: `1px solid ${T.border}`,
              borderRight: `1px solid ${T.border}`,
              borderBottom: `1px solid ${T.border}`,
              ...(bpg === 0 ? { borderLeft: `1px solid ${T.border}` } : {}),
              borderRadius: T.radiusMd,
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              marginBottom: bpg > 0 ? (gIdx < groups.length - 1 ? 28 : 8) : 12,
            } : {}),
          }}>
            {bpg > 0 && (
              <span style={{
                position: "absolute", top: -8, left: -1, fontSize: 8, color: T.gold,
                fontWeight: 700, fontFamily: T.sans, background: T.bg, padding: "0 4px",
              }}>{gIdx + 1}</span>
            )}
            {/* Dashed divider between groups */}
            {bpg > 0 && gIdx < groups.length - 1 && (
              <div style={{
                position: "absolute", bottom: -16, left: 0, right: 0,
                borderBottom: `1px dashed ${T.border}`,
              }} />
            )}
            {group.map(({ measure, globalIdx: mIdx }, itemIdx) => {
        const isActiveMeasure = activeMeasure === mIdx;

        // Build column template: for each main cell, add 1fr, then if slot is active add 24px
        let colTemplate = "";
        for (let i = 0; i < 8; i++) {
          colTemplate += "1fr ";
          if (chart.activeSlots.includes(i) && i < 7) {
            colTemplate += "24px ";
          }
        }

        // Desktop unified: use inner borders instead of per-card borders
        const isLeftCol = itemIdx % 2 === 0;
        const isLastRow = itemIdx >= group.length - 1 || (twoCol && itemIdx >= group.length - 2 && !isLeftCol);
        const isInEditLoop = loopStart !== null && loopEnd !== null && mIdx >= loopStart && mIdx <= loopEnd;
        const isEditLoopStart = loopStart !== null && loopEnd === null && mIdx === loopStart;
        const desktopStyle = twoCol ? {
          borderRight: isLeftCol && itemIdx + 1 < group.length ? `1px solid ${T.borderSoft}` : "none",
          borderBottom: (twoCol && itemIdx + 2 < group.length) ? `1px solid ${T.borderSoft}` : "none",
          background: isActiveMeasure ? T.getTint(T.gold, 0.04) : (isInEditLoop || isEditLoopStart) ? T.getTint(T.gold, 0.03) : "transparent",
          transition: "background 0.2s",
        } : {
          border: `1px solid ${isActiveMeasure ? T.gold : T.border}`,
          borderRadius: T.radiusMd,
          background: (isInEditLoop || isEditLoopStart) ? T.getTint(T.gold, 0.03) : undefined,
          boxShadow: isActiveMeasure ? `0 0 8px ${T.gold}40` : "none",
          transition: "box-shadow 0.2s, border-color 0.2s",
        };

        return (
          <div key={mIdx} onClick={() => {
            if (!loopSelecting) return;
            if (loopStart === null) {
              setLoopStart(mIdx);
            } else if (loopEnd === null) {
              if (mIdx < loopStart) { setLoopEnd(loopStart); setLoopStart(mIdx); }
              else if (mIdx === loopStart) { setLoopStart(null); }
              else { setLoopEnd(mIdx); }
              setLoopSelecting(false);
            }
          }} style={{
            marginBottom: twoCol ? 0 : 12, position: "relative",
            cursor: loopSelecting ? "pointer" : "default",
            ...desktopStyle,
          }}
          >
            {/* Measure number + section label + delete button */}
            <div style={{
              display: "flex", alignItems: "center", gap: 4,
              padding: twoCol ? "6px 8px 0" : "0 4px",
              ...(twoCol ? {} : { position: "absolute", top: -8, left: 8, background: T.bg }),
            }}>
              <span style={{
                fontSize: 9, fontWeight: 700, fontFamily: T.sans,
                color: (isInEditLoop || isEditLoopStart) ? T.gold : T.textMuted,
              }}>{mIdx + 1}</span>
              <button
                onClick={(e) => { e.stopPropagation(); setSectionPicker(mIdx); }}
                style={{
                  fontSize: 9, fontWeight: 600, color: measure.sectionLabel ? T.gold : T.textMuted,
                  fontFamily: T.sans, textTransform: "uppercase", letterSpacing: 1,
                  border: "none", background: "transparent", padding: "0 4px", outline: "none",
                  cursor: "pointer", flex: 1, textAlign: "left", minWidth: 40,
                }}
              >{measure.sectionLabel || "section"}</button>
              {measure.sectionLabel && (
                <>
                  <button onClick={(e) => { e.stopPropagation(); copySection(mIdx); }} style={{
                    background: "none", border: "none", cursor: "pointer", color: T.textMuted,
                    padding: "0 2px", display: "flex", alignItems: "center",
                  }} title="Copy section"><Copy size={10} /></button>
                  <button onClick={(e) => { e.stopPropagation(); duplicateSection(mIdx); }} style={{
                    background: "none", border: "none", cursor: "pointer", color: T.textMuted,
                    padding: "0 2px", display: "flex", alignItems: "center",
                  }} title="Duplicate section to end"><CopyPlus size={10} /></button>
                </>
              )}
              {clipboard && (
                <button onClick={(e) => { e.stopPropagation(); pasteAfter(mIdx); }} style={{
                  background: "none", border: "none", cursor: "pointer", color: T.gold,
                  padding: "0 2px", display: "flex", alignItems: "center",
                }} title="Paste after"><ClipboardPaste size={10} /></button>
              )}
              {chart.measures.length > 1 && (
                <button onClick={(e) => { e.stopPropagation(); removeMeasure(mIdx); }} style={{
                  background: "none", border: "none",
                  cursor: "pointer", color: T.textMuted, padding: "0 4px", fontSize: 9,
                  fontFamily: T.sans, display: "flex", alignItems: "center", gap: 2,
                  ...(twoCol ? {} : { position: "absolute", top: 0, right: -4, background: T.bg }),
                }}><X size={10} /></button>
              )}
            </div>

            <div style={{
              display: "grid",
              gridTemplateColumns: `${twoCol && !isLeftCol ? "" : "40px "}${colTemplate}`,
              padding: "8px 4px 4px",
            }}>
              {/* Beat labels row */}
              {(twoCol && !isLeftCol) ? null : (
                <div style={{ fontSize: 8, color: T.textMuted, display: "flex", alignItems: "center", justifyContent: "center" }} />
              )}
              {measure.cells.map((_, cIdx) => {
                const label = BEAT_LABELS_8[cIdx];
                const isDownbeat = cIdx % 2 === 0;
                const isActive = isActiveMeasure && activeCol === cIdx;
                return (
                  <React.Fragment key={`beat-${cIdx}`}>
                    <div style={{
                      textAlign: "center", fontSize: 9, fontFamily: T.sans,
                      color: isDownbeat ? T.textMed : T.textMuted,
                      fontWeight: isDownbeat ? 700 : 400,
                      background: isActive ? T.getTint(T.gold, 0.2) : (isDownbeat ? T.getTint(T.gold, 0.03) : "transparent"),
                      borderRadius: T.radius, padding: "2px 0",
                      transition: "background 0.15s",
                    }}>{label}</div>
                    {chart.activeSlots.includes(cIdx) && cIdx < 7 && (
                      <div style={{
                        textAlign: "center", fontSize: 7, fontFamily: T.sans, color: T.textMuted,
                        padding: "2px 0",
                      }}>{cIdx % 2 === 0 ? "e" : "a"}</div>
                    )}
                  </React.Fragment>
                );
              })}

              {/* Chord row — each cell individually clickable */}
              {(twoCol && !isLeftCol) ? null : (
                <div style={{
                  fontSize: 9, color: T.textMuted, fontWeight: 600, textTransform: "uppercase",
                  letterSpacing: 1, display: "flex", alignItems: "center", justifyContent: "center",
                }}>Chord</div>
              )}
              {measure.cells.map((cell, cIdx) => {
                // Find which chord is active at this position (could be from a previous cell spanning here)
                let displayChord = cell.chord;
                let isSpanContinuation = false;
                if (!displayChord) {
                  // Walk backwards to find spanning chord
                  for (let j = cIdx - 1; j >= 0; j--) {
                    if (measure.cells[j].chord) { displayChord = measure.cells[j].chord; isSpanContinuation = true; break; }
                  }
                }
                const hasChord = !!cell.chord;
                const inSpan = hasChord || isSpanContinuation;
                const isActiveChordTarget = activeChordCell && activeChordCell.m === mIdx && activeChordCell.c === cIdx;
                return (
                  <React.Fragment key={`c-${cIdx}`}>
                    <div
                      style={{
                        textAlign: "center", fontFamily: T.serif, fontSize: 14, fontWeight: 700,
                        color: hasChord ? T.gold : (isSpanContinuation ? T.gold + "40" : "transparent"),
                        background: isActiveChordTarget ? T.getTint(T.gold, 0.2) : (inSpan ? T.getTint(T.gold, 0.05) : "transparent"),
                        borderRadius: T.radius, padding: "4px 2px", minHeight: 28,
                        cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
                        border: isActiveChordTarget ? `2px solid ${T.gold}` : (inSpan ? "none" : `1px dashed ${T.borderSoft}`),
                        transition: "background 0.15s, border-color 0.15s",
                        boxShadow: isActiveChordTarget ? `0 0 6px ${T.gold}40` : "none",
                      }}
                      onClick={(e) => { e.stopPropagation(); handleChordCellTap(mIdx, cIdx); }}
                      onTouchStart={(e) => { e.stopPropagation(); startLongPress(mIdx, cIdx, "chord"); }}
                      onTouchEnd={(e) => { e.stopPropagation(); endLongPress(); }}
                      onMouseDown={(e) => { e.stopPropagation(); startLongPress(mIdx, cIdx, "chord"); }}
                      onMouseUp={(e) => { e.stopPropagation(); endLongPress(); }}
                    >
                      {hasChord ? displayChord : (isSpanContinuation ? "·" : "·")}
                    </div>
                    {chart.activeSlots.includes(cIdx) && cIdx < 7 && (
                      <div style={{
                        textAlign: "center", fontSize: 11, fontFamily: T.serif, color: T.gold,
                        minHeight: 28, display: "flex", alignItems: "center", justifyContent: "center",
                        opacity: 0.7, cursor: "pointer",
                      }}
                        onClick={() => { setActiveChordCell({ m: mIdx, c: cIdx, between: true }); }}
                      >{measure.between[cIdx]?.chord || "·"}</div>
                    )}
                  </React.Fragment>
                );
              })}

              {/* Strum row */}
              {(twoCol && !isLeftCol) ? null : (
                <div style={{
                  fontSize: 9, color: T.textMuted, fontWeight: 600, textTransform: "uppercase",
                  letterSpacing: 1, display: "flex", alignItems: "center", justifyContent: "center",
                }}>Strum</div>
              )}
              {measure.cells.map((cell, cIdx) => {
                const sd = strumDisplay(cell.strum);
                const isActive = isActiveMeasure && activeCol === cIdx;
                const spOpen = strumPicker && strumPicker.mIdx === mIdx && strumPicker.cIdx === cIdx && !strumPicker.isBetween;
                const spBetweenOpen = strumPicker && strumPicker.mIdx === mIdx && strumPicker.cIdx === cIdx && strumPicker.isBetween;
                return (
                  <React.Fragment key={`s-${cIdx}`}>
                    <div style={{ position: "relative" }}>
                      <div
                        style={{
                          textAlign: "center", fontSize: sd?.fontSizeBoost ? 16 + sd.fontSizeBoost : 16, minHeight: 32,
                          display: "flex", alignItems: "center", justifyContent: "center",
                          cursor: "pointer", borderRadius: T.radius,
                          color: sd ? sd.color : "transparent",
                          fontWeight: sd ? sd.weight : 400,
                          opacity: sd?.opacity || 1,
                          border: cell.strum ? (sd?.border || "none") : `1px dashed ${T.borderSoft}`,
                          background: spOpen ? T.getTint(T.gold, 0.12) : isActive ? T.getTint(T.gold, 0.15) : "transparent",
                          transition: "background 0.15s",
                          userSelect: "none",
                        }}
                        onClick={(e) => { e.stopPropagation(); openStrumPicker(mIdx, cIdx); }}
                        onTouchStart={(e) => { e.stopPropagation(); startLongPress(mIdx, cIdx, "strum"); }}
                        onTouchEnd={(e) => { e.stopPropagation(); endLongPress(); }}
                        onMouseDown={(e) => { e.stopPropagation(); startLongPress(mIdx, cIdx, "strum"); }}
                        onMouseUp={(e) => { e.stopPropagation(); endLongPress(); }}
                      >
                        {sd ? sd.glyph : "·"}
                      </div>
                      {spOpen && (() => {
                        const xShift = cIdx >= 6 ? "translateX(-80%)" : cIdx <= 1 ? "translateX(-10%)" : "translateX(-50%)";
                        return (
                          <div style={{
                            position: "absolute", top: "100%", left: "50%", transform: xShift,
                            zIndex: 200, background: T.bgCard || T.bg, border: `1px solid ${T.border}`,
                            borderRadius: T.radiusMd, padding: 6, boxShadow: "0 4px 16px rgba(0,0,0,0.15)",
                            minWidth: 160,
                          }} onClick={e => e.stopPropagation()}>
                            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 3, alignItems: "center" }}>
                              {["Light", "Normal", "Heavy"].map(l => (
                                <div key={l} style={{ textAlign: "center", fontSize: 7, color: T.textMuted, textTransform: "uppercase", letterSpacing: 0.5, fontFamily: T.sans }}>{l}</div>
                              ))}
                              {[
                                { type: "D", glyph: "↓" },
                                { type: "U", glyph: "↑" },
                                { type: "X", glyph: "×" },
                              ].map(row => (
                                <React.Fragment key={row.type}>
                                  {["light", "normal", "heavy"].map(w => {
                                    const val = makeStrum(row.type, w);
                                    const sdd = strumDisplay(val);
                                    const isSelected = cell.strum === val;
                                    return (
                                      <button key={w} onClick={() => setStrumFromPicker(val)} style={{
                                        minHeight: 32, fontSize: w === "heavy" ? 15 : 13, fontFamily: T.sans,
                                        fontWeight: sdd?.weight || 400, color: sdd?.color || T.textDark,
                                        opacity: sdd?.opacity || 1,
                                        background: isSelected ? T.getTint(T.gold, 0.15) : T.bgSoft,
                                        border: isSelected ? `2px solid ${T.gold}` : `1px solid ${T.borderSoft}`,
                                        borderRadius: 4, cursor: "pointer",
                                        display: "flex", alignItems: "center", justifyContent: "center",
                                      }}>{row.glyph}</button>
                                    );
                                  })}
                                </React.Fragment>
                              ))}
                            </div>
                            {cell.strum && (
                              <button onClick={() => setStrumFromPicker(null)} style={{
                                width: "100%", marginTop: 4, fontSize: 9, fontWeight: 600, fontFamily: T.sans,
                                padding: "3px 0", borderRadius: 4, cursor: "pointer",
                                border: `1px solid ${T.coral}`, background: "transparent", color: T.coral,
                              }}>× Clear</button>
                            )}
                          </div>
                        );
                      })()}
                    </div>
                    {chart.activeSlots.includes(cIdx) && cIdx < 7 && (() => {
                      const bsd = strumDisplay(measure.between[cIdx]?.strum);
                      return (
                      <div style={{ position: "relative" }}>
                        <div style={{
                          textAlign: "center", fontSize: 13, minHeight: 32,
                          display: "flex", alignItems: "center", justifyContent: "center",
                          cursor: "pointer", borderRadius: T.radius, opacity: bsd?.opacity || 0.7,
                          color: bsd?.color || "transparent",
                          background: spBetweenOpen ? T.getTint(T.gold, 0.12) : "transparent",
                        }}
                          onClick={(e) => { e.stopPropagation(); openStrumPicker(mIdx, cIdx, true); }}
                        >
                          {bsd?.glyph || "·"}
                        </div>
                        {spBetweenOpen && (() => {
                          const xShift = cIdx >= 5 ? "translateX(-80%)" : "translateX(-50%)";
                          return (
                            <div style={{
                              position: "absolute", top: "100%", left: "50%", transform: xShift,
                              zIndex: 200, background: T.bgCard || T.bg, border: `1px solid ${T.border}`,
                              borderRadius: T.radiusMd, padding: 6, boxShadow: "0 4px 16px rgba(0,0,0,0.15)",
                              minWidth: 160,
                            }} onClick={e => e.stopPropagation()}>
                              <div style={{ display: "grid", gridTemplateColumns: "auto repeat(3, 1fr)", gap: 3, alignItems: "center" }}>
                                <div />
                                {["Light", "Normal", "Heavy"].map(l => (
                                  <div key={l} style={{ textAlign: "center", fontSize: 7, color: T.textMuted, textTransform: "uppercase", letterSpacing: 0.5, fontFamily: T.sans }}>{l}</div>
                                ))}
                                {[
                                  { type: "D", glyph: "↓" },
                                  { type: "U", glyph: "↑" },
                                  { type: "X", glyph: "×" },
                                ].map(row => (
                                  <React.Fragment key={row.type}>
                                    <div style={{ fontSize: 8, color: T.textMuted, fontWeight: 600, fontFamily: T.sans }}>{row.glyph}</div>
                                    {["light", "normal", "heavy"].map(w => {
                                      const val = makeStrum(row.type, w);
                                      const sdd = strumDisplay(val);
                                      const bStrum = measure.between[cIdx]?.strum;
                                      const isSelected = bStrum === val;
                                      return (
                                        <button key={w} onClick={() => setStrumFromPicker(val)} style={{
                                          minHeight: 32, fontSize: w === "heavy" ? 15 : 13, fontFamily: T.sans,
                                          fontWeight: sdd?.weight || 400, color: sdd?.color || T.textDark,
                                          opacity: sdd?.opacity || 1,
                                          background: isSelected ? T.getTint(T.gold, 0.15) : T.bgSoft,
                                          border: isSelected ? `2px solid ${T.gold}` : `1px solid ${T.borderSoft}`,
                                          borderRadius: 4, cursor: "pointer",
                                          display: "flex", alignItems: "center", justifyContent: "center",
                                        }}>{row.glyph}</button>
                                      );
                                    })}
                                  </React.Fragment>
                                ))}
                              </div>
                              {measure.between[cIdx]?.strum && (
                                <button onClick={() => setStrumFromPicker(null)} style={{
                                  width: "100%", marginTop: 4, fontSize: 9, fontWeight: 600, fontFamily: T.sans,
                                  padding: "3px 0", borderRadius: 4, cursor: "pointer",
                                  border: `1px solid ${T.coral}`, background: "transparent", color: T.coral,
                                }}>× Clear</button>
                              )}
                            </div>
                          );
                        })()}
                      </div>
                      );
                    })()}
                  </React.Fragment>
                );
              })}

              {/* Note row */}
              {(twoCol && !isLeftCol) ? null : (
                <div style={{
                  fontSize: 9, color: T.note, fontWeight: 600, textTransform: "uppercase",
                  letterSpacing: 1, display: "flex", alignItems: "center", justifyContent: "center",
                }}>Note</div>
              )}
              {measure.cells.map((cell, cIdx) => {
                const hasNote = !!cell?.note;
                const pickerOpen = notePicker && notePicker.m === mIdx && notePicker.c === cIdx && !notePicker.between;
                return (
                  <React.Fragment key={`n-${cIdx}`}>
                    <div ref={pickerOpen ? notePickerRef : null} style={{ position: "relative" }}>
                      <div
                        onClick={(e) => {
                          e.stopPropagation();
                          if (isPlaying) return;
                          if (pickerOpen) { setNotePicker(null); return; }
                          if (hasNote) {
                            const oct = parseInt(cell.note.slice(-1));
                            if (oct >= 2 && oct <= 6) setNoteOctave(oct);
                          }
                          setNotePicker({ m: mIdx, c: cIdx, between: false });
                        }}
                        style={{
                          textAlign: "center", fontSize: 11, fontFamily: T.sans, fontWeight: 600,
                          color: hasNote ? T.note : T.textMuted + "60",
                          minHeight: 26, display: "flex", alignItems: "center", justifyContent: "center",
                          cursor: "pointer", borderRadius: T.radius,
                          background: pickerOpen ? T.getTint(T.note, 0.08) : hasNote ? T.getTint(T.note, 0.03 + (parseInt(cell.note?.slice(-1) || "4") - 2) * 0.02) : "transparent",
                          transition: "background 0.15s, color 0.15s",
                        }}
                      >
                        {hasNote ? cell.note : "·"}
                      </div>
                      {pickerOpen && (() => {
                        const xShift = cIdx >= 6 ? "translateX(-80%)" : cIdx <= 1 ? "translateX(-20%)" : "translateX(-50%)";
                        return (
                        <div style={{
                          position: "absolute", top: "100%", left: "50%", transform: xShift,
                          zIndex: 200, background: T.bgCard || T.bg, border: `1px solid ${T.border}`,
                          borderRadius: T.radiusMd, padding: 8, boxShadow: "0 4px 16px rgba(0,0,0,0.15)",
                          minWidth: 180,
                        }}>
                          <div style={{ display: "flex", gap: 4, marginBottom: 6, justifyContent: "center" }}>
                            {[2, 3, 4, 5, 6].map(oct => (
                              <button key={oct} onClick={(e) => { e.stopPropagation(); setNoteOctave(oct); }} style={{
                                fontSize: 10, fontWeight: noteOctave === oct ? 800 : 400, fontFamily: T.sans,
                                padding: "2px 6px", borderRadius: 6, cursor: "pointer",
                                border: noteOctave === oct ? `1px solid ${T.note}` : `1px solid ${T.borderSoft}`,
                                background: noteOctave === oct ? T.getTint(T.note, 0.12) : "transparent",
                                color: noteOctave === oct ? T.note : T.textMuted,
                              }}>Oct {oct}</button>
                            ))}
                          </div>
                          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 3 }}>
                            {["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"].map(n => {
                              const noteStr = n + noteOctave;
                              const isSelected = cell?.note === noteStr;
                              return (
                                <button key={n} onClick={async (e) => {
                                  e.stopPropagation();
                                  updateChart(c => {
                                    c.measures[mIdx].cells[cIdx].note = noteStr;
                                    return c;
                                  });
                                  try {
                                    await Tone.start();
                                    if (Tone.context.state !== "running") await Tone.context.resume();
                                    noteSynthRef.current?.triggerAttackRelease(noteStr, "8n");
                                  } catch (_) {}
                                  setNotePicker(null);
                                }} style={{
                                  fontSize: 10, fontWeight: 600, fontFamily: T.sans,
                                  padding: "4px 2px", borderRadius: 4, cursor: "pointer",
                                  border: isSelected ? `1px solid ${T.note}` : `1px solid ${T.borderSoft}`,
                                  background: isSelected ? T.note : "transparent",
                                  color: isSelected ? "#fff" : T.textDark,
                                }}>
                                  {n}
                                </button>
                              );
                            })}
                          </div>
                          {hasNote && (
                            <button onClick={(e) => {
                              e.stopPropagation();
                              updateChart(c => { delete c.measures[mIdx].cells[cIdx].note; return c; });
                              setNotePicker(null);
                            }} style={{
                              width: "100%", marginTop: 6, fontSize: 10, fontWeight: 600, fontFamily: T.sans,
                              padding: "4px 0", borderRadius: 4, cursor: "pointer",
                              border: `1px solid ${T.coral}`, background: "transparent", color: T.coral,
                            }}>× Clear</button>
                          )}
                        </div>
                        );
                      })()}
                    </div>
                    {chart.activeSlots.includes(cIdx) && cIdx < 7 && (
                      <div style={{
                        textAlign: "center", fontSize: 9, fontFamily: T.sans,
                        color: T.note, opacity: 0.6,
                        minHeight: 28, display: "flex", alignItems: "center", justifyContent: "center",
                      }}>{measure.between[cIdx]?.note || ""}</div>
                    )}
                  </React.Fragment>
                );
              })}

              {/* Lyric row */}
              {(twoCol && !isLeftCol) ? null : (
                <div style={{
                  fontSize: 9, color: T.textMuted, fontWeight: 600, textTransform: "uppercase",
                  letterSpacing: 1, display: "flex", alignItems: "center", justifyContent: "center",
                }}>Lyric</div>
              )}
              {measure.cells.map((cell, cIdx) => {
                const hasLyric = cell.lyric && cell.lyric.length > 0;
                const isActive = isActiveMeasure && activeCol === cIdx;
                const isTarget = selectedChip !== null && !hasLyric;
                return (
                  <React.Fragment key={`l-${cIdx}`}>
                    <div
                      style={{
                        textAlign: "center", fontSize: hasLyric && cell.lyric.length > 5 ? 11 : 13,
                        fontFamily: T.serif, fontStyle: "italic", color: T.textDark,
                        minHeight: 28, display: "flex", alignItems: "center", justifyContent: "center",
                        cursor: "pointer", borderRadius: T.radius,
                        border: isTarget ? `1px dashed ${T.gold}` : (hasLyric ? "none" : `1px dashed ${T.borderSoft}`),
                        background: isActive ? T.getTint(T.gold, 0.1) : (isTarget ? T.getTint(T.gold, 0.05) : "transparent"),
                        overflow: "visible", whiteSpace: "nowrap", position: "relative", zIndex: hasLyric ? 1 : 0,
                        transition: "background 0.15s, border-color 0.15s",
                      }}
                      onClick={(e) => {
                        e.stopPropagation();
                        if (isPlaying) return;
                        if (hasLyric) { removePlacedLyric(mIdx, cIdx); }
                        else if (selectedChip !== null) { placeLyric(mIdx, cIdx); }
                      }}
                    >
                      {hasLyric ? cell.lyric : (isTarget ? "·" : "")}
                    </div>
                    {chart.activeSlots.includes(cIdx) && cIdx < 7 && (
                      <div style={{
                        textAlign: "center", fontSize: 10, fontFamily: T.serif, fontStyle: "italic",
                        minHeight: 28, display: "flex", alignItems: "center", justifyContent: "center",
                        opacity: 0.7, color: T.textDark,
                      }}>{measure.between[cIdx]?.lyric || ""}</div>
                    )}
                  </React.Fragment>
                );
              })}
            </div>

          </div>
        );
            })}
          </div>
        ))}
        </div>);
      })()}

      {/* Add measure button */}
      <button onClick={addMeasure} style={{
        width: "100%", padding: "12px", background: T.bgSoft, border: `1px dashed ${T.border}`,
        borderRadius: T.radiusMd, cursor: "pointer", color: T.textMuted,
        fontSize: 12, fontFamily: T.sans, fontWeight: 600, marginBottom: 16,
        display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
      }}><Plus size={14} /> Add Measure</button>

      {/* Strum picker backdrop — click outside to close */}
      {strumPicker && (
        <div onClick={() => setStrumPicker(null)} style={{
          position: "fixed", inset: 0, zIndex: 199,
        }} />
      )}

      {/* Delete toast */}
      {deleteToast && (
        <div style={{
          position: "fixed", bottom: 24, left: "50%", transform: "translateX(-50%)",
          background: T.textDark, color: "#fff", padding: "10px 20px", borderRadius: T.radiusMd,
          fontSize: 12, fontFamily: T.sans, display: "flex", gap: 12, alignItems: "center",
          zIndex: 999, boxShadow: T.md,
        }}>
          <span>Measure deleted</span>
          <button onClick={undoDeleteMeasure} style={{
            background: T.gold, color: "#fff", border: "none", padding: "4px 12px",
            borderRadius: T.radius, cursor: "pointer", fontSize: 11, fontWeight: 700,
          }}>Undo</button>
        </div>
      )}

      {/* Chord voicing popup */}
      {chordVoicing && (() => {
        const chord = chart.measures[chordVoicing.m]?.cells[chordVoicing.c]?.chord;
        const voicing = chord ? CHORD_VOICINGS[chord] : null;
        if (!voicing) return null;
        return (
          <div style={{
            position: "fixed", inset: 0, zIndex: 1001, display: "flex",
            alignItems: "center", justifyContent: "center",
            background: "rgba(0,0,0,0.2)",
          }} onClick={() => setChordVoicing(null)}>
            <ChordDiagram theme={T} frets={voicing.frets} name={voicing.name} onClose={() => setChordVoicing(null)} />
          </div>
        );
      })()}

      {/* Sticky lyrics chips tray — scrollable, auto-shrinks as chips are placed */}
      {chart.lyricsPool.length > 0 && !lyricsEditing && (
        <div style={{
          position: "sticky", bottom: isWide ? 0 : 60, zIndex: 99,
          background: T.bg, padding: "8px 12px",
          borderTop: `1px solid ${T.borderSoft}`,
          boxShadow: "0 -2px 8px rgba(44,40,37,0.04)",
          maxHeight: isWide ? 80 : 120, overflowY: "auto",
          WebkitOverflowScrolling: "touch",
          ...(isWide ? {
            width: "100vw",
            marginLeft: "calc(-50vw + 50%)",
            paddingLeft: "calc(50vw - 50%)",
            paddingRight: "calc(50vw - 50%)",
          } : {}),
        }}>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
            {chart.lyricsPool.map((item, i) => {
              const text = chipText(item);
              const group = chipGroup(item);
              const canSplit = !group && splitSyllables(item) !== null;
              return (
                <button key={i} onClick={() => setSelectedChip(selectedChip === i ? null : i)} style={{
                  fontSize: 12, fontFamily: T.serif, padding: "4px 10px",
                  borderRadius: 12, cursor: "pointer",
                  background: selectedChip === i ? T.getTint(T.gold, 0.15) : T.getTint(T.coral, 0.08),
                  border: selectedChip === i ? `2px solid ${T.gold}` : `1px solid ${T.coral}30`,
                  color: T.textDark, fontWeight: selectedChip === i ? 600 : 400,
                  transform: selectedChip === i ? "scale(1.05)" : "none",
                  transition: "all 0.15s",
                }}>
                  {text}
                  {canSplit && (
                    <span onClick={(e) => splitChip(i, e)} style={{
                      marginLeft: 4, opacity: 0.45, fontSize: 10, cursor: "pointer",
                    }} title="Split into syllables">✂</span>
                  )}
                  {group && (
                    <span onClick={(e) => joinChip(i, e)} style={{
                      marginLeft: 4, opacity: 0.45, fontSize: 10, cursor: "pointer",
                    }} title="Rejoin syllables">↩</span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Chord bottom sheet — root notes + quality toggles */}
      <BottomSheet theme={T} open={!!activeChordCell} onClose={() => setActiveChordCell(null)}>
        {/* Recently used */}
        {recentChords.length > 0 && (
          <div style={{ marginBottom: 12 }}>
            <div style={{ fontSize: 8, color: T.textMuted, marginBottom: 4, textTransform: "uppercase", letterSpacing: 1 }}>Recent</div>
            <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
              {recentChords.map(ch => (
                <button key={ch} onClick={() => selectChord(ch)} style={{
                  minWidth: 44, minHeight: 40, fontSize: 13, fontFamily: T.serif, fontWeight: 700,
                  color: T.gold, background: T.getTint(T.gold, 0.08), border: `1px solid ${T.gold}30`,
                  borderRadius: T.radius, cursor: "pointer", padding: "0 10px",
                }}>{ch}</button>
              ))}
            </div>
          </div>
        )}

        {/* Root notes */}
        <div style={{ marginBottom: 10 }}>
          <div style={{ fontSize: 8, color: T.textMuted, marginBottom: 6, textTransform: "uppercase", letterSpacing: 1 }}>Root Note</div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 5, marginBottom: 6 }}>
            {["C", "D", "E", "F", "G", "A", "B"].map(note => (
              <button key={note} onClick={() => selectChord(note + chordQuality)} style={{
                minHeight: 44, fontSize: chordQuality ? 13 : 15, fontFamily: T.serif, fontWeight: 700,
                color: T.textDark, background: T.bgSoft, border: `1px solid ${T.border}`,
                borderRadius: T.radius, cursor: "pointer",
              }}>{note}{chordQuality && <span style={{ fontSize: 10, fontWeight: 500, color: T.textMed }}>{chordQuality}</span>}</button>
            ))}
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 5 }}>
            {["C#", "Eb", "F#", "Ab", "Bb"].map(note => (
              <button key={note} onClick={() => selectChord(note + chordQuality)} style={{
                minHeight: 38, fontSize: chordQuality ? 11 : 13, fontFamily: T.serif, fontWeight: 600,
                color: T.textMed, background: T.bgSoft, border: `1px solid ${T.borderSoft}`,
                borderRadius: T.radius, cursor: "pointer",
              }}>{note}{chordQuality && <span style={{ fontSize: 9, fontWeight: 500 }}>{chordQuality}</span>}</button>
            ))}
          </div>
        </div>

        {/* Quality / Type toggles */}
        <div style={{ marginBottom: 12 }}>
          <div style={{ fontSize: 8, color: T.textMuted, marginBottom: 6, textTransform: "uppercase", letterSpacing: 1 }}>Type</div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
            {[
              { label: "Major", val: "" },
              { label: "Minor", val: "m" },
              { label: "7", val: "7" },
              { label: "m7", val: "m7" },
              { label: "Maj7", val: "maj7" },
              { label: "Sus2", val: "sus2" },
              { label: "Sus4", val: "sus4" },
              { label: "Dim", val: "dim" },
              { label: "Aug", val: "aug" },
            ].map(q => (
              <button key={q.val} onClick={() => setChordQuality(q.val)} style={{
                padding: "6px 12px", borderRadius: T.radius, cursor: "pointer",
                fontSize: 11, fontWeight: 700, fontFamily: T.sans,
                background: chordQuality === q.val ? T.textDark : T.bgSoft,
                color: chordQuality === q.val ? "#fff" : T.textDark,
                border: `1px solid ${chordQuality === q.val ? T.textDark : T.border}`,
                transition: "all 0.15s",
              }}>{q.label}</button>
            ))}
          </div>
        </div>

        {/* Custom + Clear */}
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          <input
            type="text" value={customChord} onChange={e => setCustomChord(e.target.value)}
            placeholder="Custom (e.g. Cadd9)"
            onKeyDown={e => { if (e.key === "Enter" && customChord.trim()) { selectChord(customChord.trim()); setCustomChord(""); } }}
            style={{
              flex: 1, fontSize: 13, fontFamily: T.serif, color: T.textDark,
              border: `1px solid ${T.border}`, borderRadius: T.radius, background: T.bgCard,
              padding: "8px 12px", outline: "none",
            }}
          />
          <button onClick={() => { if (customChord.trim()) { selectChord(customChord.trim()); setCustomChord(""); } }} style={{
            minHeight: 36, padding: "0 12px", fontSize: 10, fontWeight: 700, fontFamily: T.sans,
            background: T.gold, color: "#fff", border: "none", borderRadius: T.radius, cursor: "pointer",
            textTransform: "uppercase", letterSpacing: 1,
          }}>Add</button>
          <button onClick={clearChord} style={{
            minHeight: 36, padding: "0 12px", fontSize: 10, fontWeight: 700, fontFamily: T.sans,
            background: "transparent", color: T.coral, border: `1px solid ${T.coral}40`,
            borderRadius: T.radius, cursor: "pointer", textTransform: "uppercase", letterSpacing: 1,
          }}>Clear</button>
        </div>
      </BottomSheet>

      {/* Section label picker */}
      <BottomSheet theme={T} open={sectionPicker !== null} onClose={() => setSectionPicker(null)}>
        <div style={{ fontSize: 8, color: T.textMuted, marginBottom: 8, textTransform: "uppercase", letterSpacing: 1 }}>Section Label</div>
        {SECTION_LABELS.map(group => (
          <div key={group.group} style={{ marginBottom: 10 }}>
            <div style={{ fontSize: 8, color: T.textMuted, marginBottom: 4, textTransform: "uppercase", letterSpacing: 1 }}>{group.group}</div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
              {group.options.map(opt => {
                const isSelected = sectionPicker !== null && chart.measures[sectionPicker]?.sectionLabel === opt;
                return (
                  <button key={opt} onClick={() => {
                    if (sectionPicker !== null) {
                      updateChart(c => { c.measures[sectionPicker].sectionLabel = opt; return c; });
                      setSectionPicker(null);
                    }
                  }} style={{
                    padding: "6px 12px", borderRadius: T.radius, cursor: "pointer",
                    fontSize: 11, fontWeight: 600, fontFamily: T.sans,
                    background: isSelected ? T.getTint(T.gold, 0.15) : T.bgSoft,
                    color: isSelected ? T.gold : T.textDark,
                    border: isSelected ? `2px solid ${T.gold}` : `1px solid ${T.border}`,
                    transition: "all 0.15s",
                  }}>{opt}</button>
                );
              })}
            </div>
          </div>
        ))}
        {/* Custom + Clear */}
        <div style={{ display: "flex", gap: 8, alignItems: "center", marginTop: 4 }}>
          <input
            type="text"
            value={sectionPicker !== null ? (chart.measures[sectionPicker]?.sectionLabel || "") : ""}
            onChange={e => {
              if (sectionPicker !== null) {
                updateChart(c => { c.measures[sectionPicker].sectionLabel = e.target.value; return c; });
              }
            }}
            placeholder="Custom label"
            onKeyDown={e => { if (e.key === "Enter") setSectionPicker(null); }}
            style={{
              flex: 1, fontSize: 12, fontFamily: T.sans, color: T.textDark,
              border: `1px solid ${T.border}`, borderRadius: T.radius, background: T.bgCard,
              padding: "8px 12px", outline: "none",
            }}
          />
          <button onClick={() => {
            if (sectionPicker !== null) {
              updateChart(c => { c.measures[sectionPicker].sectionLabel = ""; return c; });
              setSectionPicker(null);
            }
          }} style={{
            minHeight: 36, padding: "0 12px", fontSize: 10, fontWeight: 700, fontFamily: T.sans,
            background: "transparent", color: T.coral, border: `1px solid ${T.coral}40`,
            borderRadius: T.radius, cursor: "pointer", textTransform: "uppercase", letterSpacing: 1,
          }}>Clear</button>
        </div>
      </BottomSheet>

      {/* Print overlay */}
      {showPrint && (() => {
        const pRows = [];
        for (let i = 0; i < chart.measures.length; i += printBarsPerRow) pRows.push(chart.measures.slice(i, i + printBarsPerRow));
        const anyNotes = chart.measures.some(m => m.cells.some(c => c.note));
        const anyLyrics = chart.measures.some(m => m.cells.some(c => c.lyric));
        return (
        <div tabIndex={-1} ref={el => el?.focus()} onKeyDown={e => { if (e.key === "Escape") setShowPrint(false); }}
          style={{ position: "fixed", inset: 0, zIndex: 9999, background: "#fdfbf9", overflow: "auto", color: "#2c2825", outline: "none" }}>
          {/* Toolbar — hidden when printing */}
          <div className="no-print" style={{
            position: "sticky", top: 0, zIndex: 1, background: "#fdfbf9",
            padding: "10px 20px", borderBottom: "1px solid #eae1d9",
            display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap",
          }}>
            <button onClick={() => setShowPrint(false)} style={{
              background: "none", border: "1px solid #eae1d9", borderRadius: 2, padding: "5px 14px",
              cursor: "pointer", fontSize: 11, fontFamily: T.sans, fontWeight: 600, color: "#59534e",
            }}>Close</button>
            <div style={{ flex: 1 }} />
            <span style={{ fontSize: 10, color: "#8c867f", fontFamily: T.sans, textTransform: "uppercase", letterSpacing: 1 }}>Bars/row</span>
            {[1, 2, 4, 8].map(n => (
              <button key={n} onClick={() => setPrintBarsPerRow(n)} style={{
                padding: "4px 10px", fontSize: 11, fontFamily: T.sans, fontWeight: 700,
                background: printBarsPerRow === n ? "#d4a373" : "#f5f0ec",
                color: printBarsPerRow === n ? "#fff" : "#59534e",
                border: printBarsPerRow === n ? "1px solid #b58454" : "1px solid #eae1d9",
                borderRadius: 2, cursor: "pointer",
              }}>{n}</button>
            ))}
            <button onClick={() => window.print()} style={{
              padding: "5px 20px", fontSize: 11, fontWeight: 700, fontFamily: T.sans,
              background: "#2c2825", color: "#fff", border: "none", borderRadius: 2, cursor: "pointer",
              textTransform: "uppercase", letterSpacing: 1,
            }}>Print</button>
          </div>

          {/* Chart content */}
          <div style={{ maxWidth: 880, margin: "0 auto", padding: "32px 24px 48px" }}>
            {/* Header */}
            <div style={{ textAlign: "center", marginBottom: 28, borderBottom: "1px solid #eae1d9", paddingBottom: 16 }}>
              <h1 style={{ fontFamily: T.serif, fontSize: 28, fontWeight: 700, margin: "0 0 6px", color: "#2c2825", letterSpacing: 0.5 }}>
                {chart.title || "Strum Chart"}
              </h1>
              <div style={{ display: "flex", justifyContent: "center", gap: 20, fontSize: 11, color: "#8c867f", fontFamily: T.sans }}>
                <span>{chart.bpm} BPM</span>
                <span>{chart.measures.length} bar{chart.measures.length > 1 ? "s" : ""}</span>
              </div>
            </div>

            {/* Measures */}
            {pRows.map((row, rIdx) => {
              const globalStart = rIdx * printBarsPerRow;
              const sectionLabel = row[0].sectionLabel;
              const isNewSection = sectionLabel && (globalStart === 0 || chart.measures[globalStart - 1]?.sectionLabel !== sectionLabel);
              return (
                <div key={rIdx} style={{ marginBottom: 20 }}>
                  {isNewSection && (
                    <div style={{
                      fontSize: 10, fontWeight: 700, fontFamily: T.sans, textTransform: "uppercase",
                      letterSpacing: 1.5, color: "#b58454", marginBottom: 6,
                      paddingBottom: 3, borderBottom: "1px solid #eae1d9", display: "inline-block",
                    }}>{sectionLabel}</div>
                  )}
                  <div style={{ display: "grid", gridTemplateColumns: `repeat(${row.length}, 1fr)`, border: "1.5px solid #d4a373", borderRadius: 3, overflow: "hidden" }}>
                    {row.map((measure, mLocalIdx) => {
                      const mIdx = globalStart + mLocalIdx;
                      const showInlineLabel = measure.sectionLabel && mLocalIdx > 0 && (mIdx === 0 || chart.measures[mIdx - 1]?.sectionLabel !== measure.sectionLabel);
                      return (
                        <div key={mLocalIdx} style={{
                          borderRight: mLocalIdx < row.length - 1 ? "1px solid #eae1d9" : "none",
                          padding: "6px 4px 8px", background: mLocalIdx % 2 === 0 ? "#fff" : "#fdfbf9",
                        }}>
                          {showInlineLabel && (
                            <div style={{ fontSize: 7, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1, color: "#b58454", marginBottom: 3 }}>{measure.sectionLabel}</div>
                          )}
                          <div style={{ display: "grid", gridTemplateColumns: "repeat(8, 1fr)", gap: 0 }}>
                            {/* Beat labels */}
                            {measure.cells.map((_, ci) => (
                              <div key={`b${ci}`} style={{
                                textAlign: "center", fontSize: 7, fontFamily: T.sans,
                                color: ci % 2 === 0 ? "#8c867f" : "#b8b2ab",
                                fontWeight: ci % 2 === 0 ? 700 : 400, paddingBottom: 2,
                              }}>{["1", "&", "2", "&", "3", "&", "4", "&"][ci]}</div>
                            ))}
                            {/* Chords */}
                            {measure.cells.map((cell, ci) => (
                              <div key={`c${ci}`} style={{
                                textAlign: "center", fontSize: 13, fontFamily: T.serif,
                                fontWeight: 700, color: cell.chord ? "#2c2825" : "transparent",
                                minHeight: 18, lineHeight: "18px",
                              }}>{cell.chord || "·"}</div>
                            ))}
                            {/* Strums */}
                            {measure.cells.map((cell, ci) => {
                              const type = strumType(cell.strum);
                              const w = strumWeight(cell.strum);
                              const glyph = type === "D" ? "↓" : type === "U" ? "↑" : type === "X" ? "×" : "";
                              return (
                                <div key={`s${ci}`} style={{
                                  textAlign: "center", fontSize: w === "heavy" ? 15 : 13,
                                  fontWeight: w === "heavy" ? 900 : w === "light" ? 400 : 700,
                                  opacity: w === "light" ? 0.45 : 1,
                                  color: type === "X" ? "#b8b2ab" : w === "heavy" ? "#b58454" : "#2c2825",
                                  minHeight: 18, lineHeight: "18px",
                                  borderBottom: w === "light" ? "1px dotted #d4a37360" : w === "heavy" ? "2px solid #b58454" : "none",
                                }}>{glyph}</div>
                              );
                            })}
                            {/* Notes */}
                            {anyNotes && measure.cells.map((cell, ci) => (
                              <div key={`n${ci}`} style={{
                                textAlign: "center", fontSize: 9, color: cell.note ? "#5b9e8f" : "transparent",
                                fontFamily: T.sans, fontWeight: 600, minHeight: 14, lineHeight: "14px",
                              }}>{cell.note || "·"}</div>
                            ))}
                            {/* Lyrics */}
                            {anyLyrics && measure.cells.map((cell, ci) => (
                              <div key={`l${ci}`} style={{
                                textAlign: "center", fontSize: 9, color: cell.lyric ? "#59534e" : "transparent",
                                fontFamily: T.serif, fontStyle: "italic", minHeight: 14, lineHeight: "14px",
                              }}>{cell.lyric || ""}</div>
                            ))}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        );
      })()}
    </div>
  );
}

export default StrumChartBuilder;
