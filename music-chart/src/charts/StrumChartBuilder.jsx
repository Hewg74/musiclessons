import React, { useState, useRef, useEffect, useCallback } from 'react';
import * as Tone from 'tone';
import {
  Plus, Trash2, Share2, Undo2, X, Edit3, Upload
} from 'lucide-react';
import { T } from '../theme.js';
import useIsWide from '../hooks/useIsWide.js';
import { ChordDiagram } from './ChordDiagram.jsx';
import { CHORD_VOICINGS } from './chordVoicings.js';
import { makeEmptyCell, makeEmptyMeasure, makeTemplateChart, compressToURL } from './chartHelpers.js';
import SongPicker from '../tools/SongPicker.jsx';
import { YouTubeAudioPlayer, extractYouTubeId } from '../tools/youtube.jsx';
import { splitSyllables, chipText, chipGroup } from './syllableUtil.js';

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
  const chartRef = useRef(chart);

  // Note picker state
  const [notePicker, setNotePicker] = useState(null);
  const [noteOctave, setNoteOctave] = useState(4);
  const [showGroupPanel, setShowGroupPanel] = useState(false);
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
      noteSynthRef.current?.releaseAll();
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
  chartRef.current = chart;

  // Note synth setup/cleanup
  useEffect(() => {
    noteSynthRef.current = new Tone.PolySynth(Tone.Synth, {
      oscillator: { type: "triangle" },
      envelope: { attack: 0.005, decay: 0.2, sustain: 0.3, release: 0.6 },
    }).toDestination();
    noteSynthRef.current.maxPolyphony = 2;
    noteSynthRef.current.volume.value = 4;
    return () => { noteSynthRef.current?.dispose(); noteSynthRef.current = null; };
  }, []);

  // Note playback via metroBeatAudio (sample-accurate timing)
  useEffect(() => {
    const handleNoteAudio = (e) => {
      const { beat, bar, time } = e.detail;
      if (bar === undefined || time === undefined) return;
      if (Tone.context.state !== "running") return;
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
      const downCell = ch.measures[measure].cells[downCol];
      if (downCell?.note && noteSynthRef.current) {
        try { noteSynthRef.current.triggerAttackRelease(downCell.note, "8n", time); } catch (e) { console.debug("note synth:", e); }
      }
      const andCol = downCol + 1;
      if (andCol < 8) {
        const andCell = ch.measures[measure].cells[andCol];
        if (andCell?.note && noteSynthRef.current) {
          try { noteSynthRef.current.triggerAttackRelease(andCell.note, "8n", time + eighthDur); } catch (e) { console.debug("note synth:", e); }
        }
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
  const cycleStrum = (mIdx, cIdx) => {
    if (isPlaying) return;
    const cur = chart.measures[mIdx].cells[cIdx].strum;
    let next;
    if (!cur) next = "D";
    else if (cur === "D") next = "U";
    else if (cur === "U") next = "X";
    else next = null; // X → rest (blank)
    updateChart(c => { c.measures[mIdx].cells[cIdx].strum = next; return c; });
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

  // Lyrics handlers
  const handleLyricsPaste = (text) => {
    updateChart(c => {
      c.lyricsInput = text;
      // Split on spaces and hyphens (keeping hyphens attached)
      const words = text.split(/\s+/).filter(w => w.length > 0).flatMap(w => {
        if (w.includes("-")) {
          return w.split(/(?<=-)/).filter(s => s.length > 0);
        }
        return [w];
      });
      c.lyricsPool = words;
      // Clear all placed lyrics
      c.measures.forEach(m => m.cells.forEach(cell => { cell.lyric = ""; cell.lyricGroupId = null; }));
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
      c.measures[mIdx].cells[cIdx].lyric = "";
      c.measures[mIdx].cells[cIdx].lyricGroupId = null;
      // Return as tagged fragment or plain string
      const returned = groupId ? { text, groupId } : text;
      // Re-insert at original position based on lyricsInput order
      const allWords = (c.lyricsInput || "").split(/\s+/).filter(w => w.length > 0).flatMap(w =>
        w.includes("-") ? w.split(/(?<=-)/).filter(s => s.length > 0) : [w]
      );
      const pool = [...c.lyricsPool, returned];
      pool.sort((a, b) => {
        const findIdx = (w) => {
          const t = chipText(w);
          const idx = allWords.indexOf(t);
          if (idx !== -1) return idx;
          const clean = t.replace(/-$/, '');
          return allWords.findIndex(aw => aw.toLowerCase().includes(clean.toLowerCase()));
        };
        return (findIdx(a) === -1 ? 999 : findIdx(a)) - (findIdx(b) === -1 ? 999 : findIdx(b));
      });
      c.lyricsPool = pool;
      return c;
    });
  };

  const splitChip = (chipIndex, e) => {
    e.stopPropagation();
    const item = chart.lyricsPool[chipIndex];
    const syllables = splitSyllables(item);
    if (!syllables) return;
    const groupId = Date.now();
    updateChart(c => {
      c.lyricsPool.splice(chipIndex, 1, ...syllables.map(s => ({ text: s, groupId })));
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
      c.lyricsPool.forEach((p, i) => { if (chipGroup(p) === groupId) poolIdxs.push(i); });
      // Reconstruct word from all fragments (pool + placed)
      const allFragTexts = [];
      c.lyricsPool.forEach(p => { if (chipGroup(p) === groupId) allFragTexts.push(chipText(p)); });
      // Pull placed fragments with same groupId back from cells
      c.measures.forEach(m => {
        m.cells.forEach(cell => {
          if (cell.lyricGroupId === groupId) {
            allFragTexts.push(cell.lyric);
            cell.lyric = '';
            cell.lyricGroupId = null;
          }
        });
      });
      // Find original word by matching syllable splits (order-independent)
      const origWords = (c.lyricsInput || '').split(/\s+/).filter(Boolean);
      const fragsSorted = [...allFragTexts].map(f => f.toLowerCase()).sort().join('|');
      const originalWord = origWords.find(w => {
        const syls = splitSyllables(w);
        if (!syls || syls.length !== allFragTexts.length) return false;
        return [...syls].map(s => s.toLowerCase()).sort().join('|') === fragsSorted;
      }) || allFragTexts.map(f => f.replace(/-$/, '')).join('');
      // Remove pool fragments and insert original word at first fragment's position
      const insertAt = poolIdxs[0];
      // Count how many removed items are before insertAt to adjust index
      const removedBefore = poolIdxs.filter(idx => idx < insertAt).length;
      c.lyricsPool = c.lyricsPool.filter((_, i) => !poolIdxs.includes(i));
      c.lyricsPool.splice(insertAt - removedBefore, 0, originalWord);
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

  // Get strum display — D=down, U=up, X=chuck/mute, null=rest (blank)
  const strumDisplay = (val) => {
    if (!val) return null;
    if (val === "D") return { glyph: "↓", color: T.textDark, weight: 700 };
    if (val === "U") return { glyph: "↑", color: T.textMed, weight: 400 };
    if (val === "X") return { glyph: "×", color: T.coral, weight: 700 };
    return null;
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
      if (!val) return null;
      if (val === "D") return "↓";
      if (val === "U") return "↑";
      if (val === "X") return "×";
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
                          fontWeight: cell.strum === "D" || cell.strum === "X" ? 700 : 400,
                          color: cell.strum === "X" ? T.coral : (glyph ? T.textDark : "transparent"),
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
                    return (
                      <React.Fragment key={`pn-${cIdx}`}>
                        <div style={{
                          textAlign: "center", fontSize: isWide ? 13 : 11,
                          fontFamily: T.sans, fontWeight: 600,
                          color: T.note,
                          minHeight: isWide ? 24 : 20,
                          display: "flex", alignItems: "center", justifyContent: "center",
                          background: isBeatActive && cell?.note ? T.getTint(T.note, 0.15) : "transparent",
                          borderRadius: T.radius, transition: "background 0.1s",
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
          {/* BPM + Play + Tap — compact toolbar */}
          <div style={{ display: "flex", gap: 8, marginBottom: 12, alignItems: "center", flexWrap: "wrap" }}>
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

            {/* Divider */}
            <div style={{ width: 1, height: 18, background: T.borderSoft, flexShrink: 0 }} />

            {/* 16th note toggle */}
            <button onClick={() => {
              updateChart(c => {
                const allOn = [0, 1, 2, 3, 4, 5, 6].every(s => c.activeSlots.includes(s));
                if (allOn) {
                  c.activeSlots = c.activeSlots.filter(s => {
                    return c.measures.some(m => {
                      const b = m.between[s];
                      return b && (b.chord || b.strum || b.lyric || b.note);
                    });
                  });
                } else {
                  c.activeSlots = [0, 1, 2, 3, 4, 5, 6];
                }
                return c;
              });
            }} style={{
              fontSize: 9, padding: "4px 10px", borderRadius: T.radius, cursor: "pointer",
              fontWeight: 800, textTransform: "uppercase", letterSpacing: 1, fontFamily: T.sans,
              background: chart.activeSlots.length === 7 ? T.getTint(T.gold, 0.15) : "transparent",
              color: chart.activeSlots.length === 7 ? T.gold : T.textMed,
              border: `1px solid ${chart.activeSlots.length > 0 ? T.gold : T.border}`,
              transition: "all 0.15s",
            }}>16th</button>

            {/* Loop toggle — also in edit mode */}
            {loopStart !== null && loopEnd !== null ? (
              <span
                onClick={() => { setLoopStart(null); setLoopEnd(null); setLoopSelecting(false); }}
                style={{
                  fontSize: 9, fontWeight: 700, fontFamily: T.sans,
                  color: T.gold, background: T.getTint(T.gold, 0.1),
                  padding: "4px 8px", borderRadius: T.radius, cursor: "pointer",
                  border: `1px solid ${T.gold}40`, userSelect: "none",
                }}
              >
                Loop {loopStart + 1}–{loopEnd + 1} ×
              </span>
            ) : (
              <button onClick={() => {
                if (loopSelecting) { setLoopSelecting(false); setLoopStart(null); }
                else { setLoopSelecting(true); }
              }} style={{
                fontSize: 9, padding: "4px 10px", borderRadius: T.radius, cursor: "pointer",
                fontWeight: 800, textTransform: "uppercase", letterSpacing: 1, fontFamily: T.sans,
                background: loopSelecting ? T.getTint(T.gold, 0.15) : "transparent",
                color: loopSelecting ? T.gold : T.textMed,
                border: `1px solid ${loopSelecting ? T.gold : T.border}`,
              }}>{loopSelecting ? "Cancel" : "Loop"}</button>
            )}

            {/* Group — expandable */}
            <button onClick={() => setShowGroupPanel(!showGroupPanel)} style={{
              fontSize: 9, padding: "4px 10px", borderRadius: T.radius, cursor: "pointer",
              fontWeight: 800, textTransform: "uppercase", letterSpacing: 1, fontFamily: T.sans,
              background: showGroupPanel ? T.getTint(T.gold, 0.15) : "transparent",
              color: (chart.barsPerGroup || 0) > 0 ? T.gold : T.textMed,
              border: `1px solid ${(chart.barsPerGroup || 0) > 0 || showGroupPanel ? T.gold : T.border}`,
              transition: "all 0.15s",
            }}>Group{(chart.barsPerGroup || 0) > 0 ? ` ${chart.barsPerGroup}` : ""}</button>
          </div>

          {/* Group panel — expands below toolbar */}
          {showGroupPanel && (
            <div style={{ display: "flex", gap: 4, marginBottom: 12, alignItems: "center", animation: "fade-in-up 0.15s ease" }}>
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

          {/* Loop selection instruction bar — in edit mode */}
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
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
          <span style={{ fontSize: 9, color: T.textMuted, fontWeight: 600, textTransform: "uppercase", letterSpacing: 1 }}>Lyrics</span>
          {!lyricsEditing && chart.lyricsInput && (
            <button onClick={() => setLyricsEditing(true)} style={{
              fontSize: 9, background: "none", border: "none", color: T.gold, cursor: "pointer",
              fontWeight: 700, textTransform: "uppercase", letterSpacing: 1,
            }}><Edit3 size={10} style={{ marginRight: 3 }} />Edit</button>
          )}
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
        ) : chart.lyricsInput ? (
          <div style={{ fontSize: 12, fontFamily: T.serif, color: T.textLight, fontStyle: "italic" }}>
            {chart.lyricsInput}
          </div>
        ) : (
          <button onClick={() => setLyricsEditing(true)} style={{
            fontSize: 11, color: T.textMuted, background: "none", border: `1px dashed ${T.border}`,
            borderRadius: T.radius, padding: "8px 12px", cursor: "pointer", width: "100%",
            fontFamily: T.sans,
          }}>+ Add Lyrics</button>
        )}

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
              overflow: "hidden",
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
              <input
                type="text"
                value={measure.sectionLabel || ""}
                onChange={e => updateChart(c => { c.measures[mIdx].sectionLabel = e.target.value; return c; })}
                placeholder="section"
                style={{
                  fontSize: 9, fontWeight: 600, color: T.gold, fontFamily: T.sans,
                  textTransform: "uppercase", letterSpacing: 1,
                  border: "none", background: "transparent", padding: 0, outline: "none",
                  width: measure.sectionLabel ? Math.max(40, measure.sectionLabel.length * 7) : 40,
                  flex: 1,
                }}
              />
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
                      onClick={() => handleChordCellTap(mIdx, cIdx)}
                      onTouchStart={() => startLongPress(mIdx, cIdx, "chord")}
                      onTouchEnd={endLongPress}
                      onMouseDown={() => startLongPress(mIdx, cIdx, "chord")}
                      onMouseUp={endLongPress}
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
                return (
                  <React.Fragment key={`s-${cIdx}`}>
                    <div
                      style={{
                        textAlign: "center", fontSize: 16, minHeight: 32,
                        display: "flex", alignItems: "center", justifyContent: "center",
                        cursor: "pointer", borderRadius: T.radius,
                        color: sd ? sd.color : "transparent",
                        fontWeight: sd ? sd.weight : 400,
                        border: cell.strum ? "none" : `1px dashed ${T.borderSoft}`,
                        background: isActive ? T.getTint(T.gold, 0.15) : "transparent",
                        transition: "background 0.15s",
                        userSelect: "none",
                      }}
                      onClick={() => cycleStrum(mIdx, cIdx)}
                      onTouchStart={() => startLongPress(mIdx, cIdx, "strum")}
                      onTouchEnd={endLongPress}
                      onMouseDown={() => startLongPress(mIdx, cIdx, "strum")}
                      onMouseUp={endLongPress}
                    >
                      {sd ? sd.glyph : "·"}
                    </div>
                    {chart.activeSlots.includes(cIdx) && cIdx < 7 && (
                      <div style={{
                        textAlign: "center", fontSize: 13, minHeight: 32,
                        display: "flex", alignItems: "center", justifyContent: "center",
                        cursor: "pointer", borderRadius: T.radius, opacity: 0.7,
                        color: strumDisplay(measure.between[cIdx]?.strum)?.color || "transparent",
                      }}
                        onClick={() => {
                          // Cycle between strum for interstitial
                          updateChart(c => {
                            if (!c.measures[mIdx].between[cIdx]) c.measures[mIdx].between[cIdx] = makeEmptyCell();
                            const cur = c.measures[mIdx].between[cIdx].strum;
                            c.measures[mIdx].between[cIdx].strum = !cur ? "D" : cur === "D" ? "U" : cur === "U" ? "X" : null;
                            return c;
                          });
                        }}
                      >
                        {strumDisplay(measure.between[cIdx]?.strum)?.glyph || "·"}
                      </div>
                    )}
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
                        onClick={() => {
                          if (isPlaying) return;
                          if (pickerOpen) { setNotePicker(null); return; }
                          setNotePicker({ m: mIdx, c: cIdx, between: false });
                        }}
                        style={{
                          textAlign: "center", fontSize: 11, fontFamily: T.sans, fontWeight: 600,
                          color: hasNote ? T.note : T.textMuted + "60",
                          minHeight: 26, display: "flex", alignItems: "center", justifyContent: "center",
                          cursor: "pointer", borderRadius: T.radius,
                          background: pickerOpen ? T.getTint(T.note, 0.08) : hasNote ? T.getTint(T.note, 0.05) : "transparent",
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
                                <button key={n} onClick={(e) => {
                                  e.stopPropagation();
                                  updateChart(c => {
                                    c.measures[mIdx].cells[cIdx].note = noteStr;
                                    return c;
                                  });
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
                      onClick={() => {
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

      {/* Sticky lyrics chips tray — pinned above BottomNav, full-width on desktop */}
      {chart.lyricsPool.length > 0 && !lyricsEditing && (
        <div style={{
          position: "sticky", bottom: isWide ? 0 : 60, zIndex: 99,
          background: T.bg, padding: "8px 12px",
          borderTop: `1px solid ${T.borderSoft}`,
          boxShadow: "0 -2px 8px rgba(44,40,37,0.04)",
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
    </div>
  );
}

export default StrumChartBuilder;
