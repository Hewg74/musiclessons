import React, { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import * as Tone from 'tone';
import { ArrowLeft, Volume2, ChevronDown, ChevronUp } from 'lucide-react';
import {
  normalizeNote, COLOR_MUSIC, getColorForNote, playWarmNote,
  FretboardDiagram, LivePitchDetector,
} from './JungleTools.jsx';

// ─── Hooks ───
function useIsMobile(bp = 640) {
  const [mobile, setMobile] = useState(() => typeof window !== 'undefined' && window.innerWidth < bp);
  useEffect(() => {
    const mq = window.matchMedia(`(max-width: ${bp - 1}px)`);
    const h = (e) => setMobile(e.matches);
    mq.addEventListener('change', h); setMobile(mq.matches);
    return () => mq.removeEventListener('change', h);
  }, [bp]);
  return mobile;
}

// ─── Constants ───
const CHROMATIC = ['C', 'C#', 'D', 'E♭', 'E', 'F', 'F#', 'G', 'A♭', 'A', 'B♭', 'B'];
const CIRCLE_OF_FIFTHS = ['C', 'G', 'D', 'A', 'E', 'B', 'F#', 'C#', 'A♭', 'E♭', 'B♭', 'F'];

const SCALE_TYPES = {
  'minor-pentatonic': { name: 'Min Pent',    intervals: [0, 3, 5, 7, 10], desc: '5 notes, zero tension. The backbone.' },
  'major-pentatonic': { name: 'Maj Pent',    intervals: [0, 2, 4, 7, 9], desc: 'Happy pentatonic. Uplifting.' },
  'blues':            { name: 'Blues',        intervals: [0, 3, 5, 6, 7, 10], desc: 'Pentatonic + blue note. Raw.' },
  'major':            { name: 'Major',        intervals: [0, 2, 4, 5, 7, 9, 11], desc: 'The foundation. Bright and resolved.' },
  'natural-minor':    { name: 'Minor',        intervals: [0, 2, 3, 5, 7, 8, 10], desc: 'Melancholy depth. The relative minor.' },
  'dorian':           { name: 'Dorian',       intervals: [0, 2, 3, 5, 7, 9, 10], desc: 'Minor with a bright 6th. Jazz, funk, soul.' },
  'mixolydian':       { name: 'Mixolydian',   intervals: [0, 2, 4, 5, 7, 9, 10], desc: 'Major with flat 7. Laid-back, bluesy.' },
  'phrygian':         { name: 'Phrygian',     intervals: [0, 1, 3, 5, 7, 8, 10], desc: 'Dark and exotic. Desert and flamenco.' },
};

const MODES = [
  { id: 'explore',      label: 'Explore' },
  { id: 'voice',        label: 'Voice' },
  { id: 'hearFind',     label: 'Hear\u2192Find' },
  { id: 'callResponse', label: 'Call\u00A0&\u00A0Resp' },
  { id: 'oneNote',      label: 'One Note' },
  { id: 'guided',       label: 'Guided' },
];

// ─── Guided exercise definitions ───
const GUIDED_EXERCISES = [
  {
    id: 'ground', title: 'Ground', desc: 'Find your home base.',
    steps: [
      { text: 'Close your eyes. Take a slow breath in.', dur: 4000, action: 'breathe' },
      { text: 'Exhale and hum any comfortable pitch.', dur: 5000, action: 'hum' },
      { text: 'Now listen to the root note.', dur: 3000, action: 'play_root' },
      { text: 'Match it with your voice. Feel where it sits in your chest.', dur: 8000, action: 'sing' },
      { text: 'Good. The root is home. Remember that feeling.', dur: 3000 },
    ]
  },
  {
    id: 'fifth', title: 'Find the Fifth', desc: 'The two pillars of every key.',
    steps: [
      { text: 'Listen to the root.', dur: 3000, action: 'play_root' },
      { text: 'Now listen to the fifth above it.', dur: 3000, action: 'play_fifth' },
      { text: 'Hear how it opens up? Like your ribcage expanding.', dur: 4000 },
      { text: 'Sing the root. Then slide up to the fifth.', dur: 8000, action: 'sing' },
      { text: 'Now find both notes on the fretboard.', dur: 5000 },
    ]
  },
  {
    id: 'penta', title: 'Pentatonic Feel', desc: 'The language of improvisation.',
    steps: [
      { text: 'Listen to each note of the pentatonic scale.', dur: 6000, action: 'play_scale' },
      { text: 'Again, slower. Notice how each note feels different.', dur: 8000, action: 'play_scale_slow' },
      { text: 'Sing back just the first 3 notes.', dur: 6000, action: 'sing' },
      { text: 'Now all 5. Take your time.', dur: 10000, action: 'sing' },
      { text: 'Your body knows these notes now. Trust it.', dur: 3000 },
    ]
  },
  {
    id: 'bodymap', title: 'Body Map', desc: 'Each note has a home in your body.',
    steps: [
      { text: 'Drone on. Sing the root. Feel it in your chest \u2014 grounding, stable.', dur: 6000, action: 'play_root' },
      { text: 'Now sing the minor third. It moves up to your upper chest \u2014 an ache, a longing.', dur: 6000, action: 'play_third' },
      { text: 'The fourth. Throat area. A bridge between worlds.', dur: 6000, action: 'play_fourth' },
      { text: 'The fifth. Clarity, openness. Feel it in the mask of your face.', dur: 6000, action: 'play_fifth' },
      { text: 'Back to root. Home. Feel the journey you just took through your body.', dur: 5000, action: 'play_root' },
      { text: 'When you improvise, you\'re navigating this internal map.', dur: 3000 },
    ]
  },
  {
    id: 'silent', title: 'Silent Hold', desc: 'The audiation muscle.',
    steps: [
      { text: 'Listen to the drone. Let the root saturate your hearing.', dur: 5000, action: 'play_root' },
      { text: 'Sing the root along with the drone. Match it perfectly.', dur: 5000, action: 'sing' },
      { text: 'Now the drone stops. Hold the note internally for 5 seconds. Don\'t sing yet.', dur: 6000 },
      { text: 'Sing it now. Did you stay on pitch?', dur: 5000, action: 'sing' },
      { text: 'Again \u2014 hold for 10 seconds this time. Feel it inside before you produce it.', dur: 12000 },
      { text: 'Improvisation is just audiation at speed. This is the muscle.', dur: 3000 },
    ]
  },
  {
    id: 'neighborhoods', title: 'Color Neighborhoods', desc: 'See the harmony.',
    steps: [
      { text: 'Look at the color wheel. Your scale notes cluster on one side. That\u2019s your key\u2019s neighborhood.', dur: 5000 },
      { text: 'Tap each scale note on the wheel. Hear how close they sound.', dur: 6000 },
      { text: 'Now imagine tapping a note from the opposite side of the wheel \u2014 that\u2019s the tritone. Maximum tension.', dur: 5000 },
      { text: 'Adjacent colors = harmonic family. This is why some notes \u201Cwant\u201D to go to others.', dur: 5000 },
      { text: 'Play root, then an adjacent color, then back. Feel the pull.', dur: 6000, action: 'play_root' },
    ]
  },
  {
    id: 'freeflow', title: 'Free Flow', desc: 'Your first improv.',
    steps: [
      { text: 'Drone on. Play any scale note. Let the color guide you.', dur: 6000, action: 'play_root' },
      { text: 'Play adjacent colors for smooth, stepwise motion.', dur: 8000 },
      { text: 'Now jump to a far color. Feel the tension. Then resolve back toward the root.', dur: 8000 },
      { text: 'There are no wrong notes \u2014 only different levels of tension. You choose when to resolve.', dur: 5000 },
      { text: 'Keep going. Let the colors guide your ear. When it sounds right, it IS right.', dur: 10000 },
      { text: 'You\u2019re improvising now.', dur: 3000 },
    ]
  },
];

// ─── Dynamic scale generator ───
function generateScale(root, scaleType) {
  const type = SCALE_TYPES[scaleType] || SCALE_TYPES['minor-pentatonic'];
  const rootIdx = CHROMATIC.indexOf(normalizeNote(root));
  if (rootIdx < 0) return { name: `${root} ${type.name}`, root: normalizeNote(root), notes: [], positions: { 1: [0, 4] } };
  const notes = type.intervals.map(i => CHROMATIC[(rootIdx + i) % 12]);
  const lowEFrets = { 'E': 0, 'F': 1, 'F#': 2, 'G': 3, 'A♭': 4, 'A': 5, 'B♭': 6, 'B': 7, 'C': 8, 'C#': 9, 'D': 10, 'E♭': 11 };
  const rootFret = lowEFrets[normalizeNote(root)] || 5;
  const positions = {
    1: [rootFret, rootFret + 3],
    2: [rootFret + 2, rootFret + 5],
    3: [rootFret + 4, rootFret + 7],
    4: [rootFret + 7, rootFret + 10],
    5: [Math.max(0, rootFret - 3), rootFret],
  };
  return { name: `${root} ${type.name}`, root: normalizeNote(root), notes, positions };
}

// ─── ColorWheel ───
function ColorWheel({ theme: T, root, scaleNotes = [], voiceNote = null, activeNote = null, size = 160 }) {
  const r = size / 2 - 16;
  const center = size / 2;
  const rootIdx = CIRCLE_OF_FIFTHS.indexOf(normalizeNote(root));
  const rotationDeg = rootIdx >= 0 ? -rootIdx * 30 : 0;

  return (
    <div style={{ position: 'relative', width: size, height: size, flexShrink: 0 }}>
      <svg viewBox={`0 0 ${size} ${size}`} style={{ width: '100%', height: '100%' }}>
        {CIRCLE_OF_FIFTHS.map((note, i) => {
          const angle = (i * 30 - 90 + rotationDeg) * Math.PI / 180;
          const x = center + r * Math.cos(angle);
          const y = center + r * Math.sin(angle);
          const color = getColorForNote(note);
          const inScale = scaleNotes.includes(normalizeNote(note));
          const isRoot = normalizeNote(note) === normalizeNote(root);
          const isVoice = voiceNote && normalizeNote(voiceNote) === normalizeNote(note);
          const isActive = activeNote && normalizeNote(activeNote) === normalizeNote(note);
          const dotSize = isRoot ? 13 : 10;
          return (
            <g key={note} style={{ cursor: inScale ? 'pointer' : 'default', transition: 'all 0.4s ease' }}
              onClick={() => inScale && playWarmNote(note + '4')}>
              <circle cx={x} cy={y} r={dotSize} fill={color}
                opacity={inScale ? 1 : 0.08} style={{ transition: 'all 0.3s' }} />
              {isRoot && <circle cx={x} cy={y} r={dotSize + 2} fill="none" stroke={T.gold} strokeWidth={2} opacity={0.9} />}
              {(isVoice || isActive) && (
                <circle cx={x} cy={y} r={dotSize + 4} fill="none" stroke={color} strokeWidth={1.5} opacity={0.6}
                  style={{ animation: 'wheelPulse 0.8s ease-in-out infinite' }} />
              )}
              {inScale && (
                <text x={x} y={y + 0.5} textAnchor="middle" dominantBaseline="central"
                  fontSize={7} fontWeight={isRoot ? 800 : 600} fill="#fff"
                  fontFamily={T.sans} style={{ pointerEvents: 'none' }}>{note}</text>
              )}
            </g>
          );
        })}
        <text x={center} y={center - 4} textAnchor="middle" dominantBaseline="central"
          fontSize={22} fontWeight={700} fill={getColorForNote(root)} fontFamily={T.serif}>{root}</text>
        <text x={center} y={center + 14} textAnchor="middle" dominantBaseline="central"
          fontSize={8} fill={T.textMuted} fontFamily={T.sans}
          style={{ textTransform: 'uppercase', letterSpacing: 1.5 }}>ROOT</text>
      </svg>
    </div>
  );
}

// ─── Quick Drone ───
function useQuickDrone() {
  const synthRef = useRef(null);
  const gainRef = useRef(null);
  const filterRef = useRef(null);
  const [playing, setPlaying] = useState(false);

  const start = useCallback(async (root) => {
    if (Tone.context.state !== 'running') await Tone.context.resume();
    if (synthRef.current) { try { synthRef.current.stop(); synthRef.current.dispose(); } catch {} }
    if (gainRef.current) { try { gainRef.current.dispose(); } catch {} }
    if (filterRef.current) { try { filterRef.current.dispose(); } catch {} }
    const synth = new Tone.Oscillator({ type: 'triangle', frequency: Tone.Frequency(root + '2').toFrequency() });
    const lp = new Tone.Filter(350, 'lowpass');
    const gain = new Tone.Gain(0);
    synth.connect(lp); lp.connect(gain); gain.toDestination();
    synth.start(); gain.gain.rampTo(0.07, 0.5);
    synthRef.current = synth; gainRef.current = gain; filterRef.current = lp;
    setPlaying(true);
  }, []);

  const stop = useCallback(() => {
    if (gainRef.current) {
      gainRef.current.gain.rampTo(0, 0.3);
      setTimeout(() => {
        try { synthRef.current?.stop(); synthRef.current?.dispose(); } catch {}
        try { filterRef.current?.dispose(); } catch {}
        try { gainRef.current?.dispose(); } catch {}
        synthRef.current = null; gainRef.current = null; filterRef.current = null;
      }, 400);
    }
    setPlaying(false);
  }, []);

  useEffect(() => {
    const handleMicReleased = async () => {
      if (!synthRef.current || !gainRef.current) return;
      try { await Tone.context.rawContext.suspend(); await Tone.context.rawContext.resume(); gainRef.current.gain.rampTo(0.07, 0.3); } catch {}
    };
    window.addEventListener('micReleased', handleMicReleased);
    return () => window.removeEventListener('micReleased', handleMicReleased);
  }, []);

  useEffect(() => () => { if (playing) stop(); }, []);

  return { playing, start, stop };
}

// ─── Main Component ───
export function ColorMusicTrainer({ theme: T, defaultRoot, defaultScale, defaultMode, embedded = false, onBack }) {
  const isMobile = useIsMobile(640);
  const [root, setRoot] = useState(defaultRoot || 'A');
  const [scaleType, setScaleType] = useState(defaultScale || 'minor-pentatonic');
  const [mode, setMode] = useState(defaultMode || 'explore');
  const [settingsOpen, setSettingsOpen] = useState(false); // collapsed root/scale on mobile
  const [wheelVisible, setWheelVisible] = useState(false); // color wheel toggle on mobile
  const drone = useQuickDrone();

  // Hear→Find state
  const [hfTarget, setHfTarget] = useState(null);
  const [hfFeedback, setHfFeedback] = useState(null);
  const [hfScore, setHfScore] = useState({ hit: 0, total: 0 });
  const [hfStreak, setHfStreak] = useState(0);
  const [hfRevealed, setHfRevealed] = useState(false);

  // One Note state
  const [oneNote, setOneNote] = useState(null);

  // Voice state
  const [voiceNote, setVoiceNote] = useState(null);
  const [voiceCents, setVoiceCents] = useState(0);
  const [voiceFreq, setVoiceFreq] = useState(null);
  const [micActive, setMicActive] = useState(false);

  // Call & Response state
  const [crPhrase, setCrPhrase] = useState([]);
  const [crGuess, setCrGuess] = useState([]);
  const [crLength, setCrLength] = useState(2);
  const [crFeedback, setCrFeedback] = useState(null); // 'correct' | 'wrong' | null
  const [crScore, setCrScore] = useState({ hit: 0, total: 0 });
  const [crStreak, setCrStreak] = useState(0);

  // Guided state
  const [guidedEx, setGuidedEx] = useState(null); // index into GUIDED_EXERCISES
  const [guidedStep, setGuidedStep] = useState(0);
  const [guidedActive, setGuidedActive] = useState(false);

  // Stats
  const [sessionStart] = useState(Date.now());

  const scaleData = useMemo(() => generateScale(root, scaleType), [root, scaleType]);
  const scaleNotes = scaleData.notes;
  const typeInfo = SCALE_TYPES[scaleType] || SCALE_TYPES['minor-pentatonic'];
  const rootColor = getColorForNote(root);

  // Drone follows root
  const prevRootRef = useRef(root);
  useEffect(() => {
    if (drone.playing && root !== prevRootRef.current) {
      drone.stop(); setTimeout(() => drone.start(root), 350);
    }
    prevRootRef.current = root;
  }, [root]);

  // ─── Hear→Find ───
  const newChallenge = useCallback(() => {
    const notes = scaleData.notes;
    const note = notes[Math.floor(Math.random() * notes.length)];
    const oct = Math.random() > 0.5 ? '4' : '3';
    setHfTarget({ note, full: note + oct });
    setHfFeedback(null); setHfRevealed(false);
    playWarmNote(note + oct, '2n');
  }, [scaleData]);

  const checkHfGuess = useCallback((tapInfo) => {
    if (!hfTarget) return;
    if (normalizeNote(tapInfo.noteName) === normalizeNote(hfTarget.note)) {
      setHfFeedback('yes'); setHfScore(p => ({ hit: p.hit + 1, total: p.total + 1 })); setHfStreak(p => p + 1); setHfRevealed(true);
      setTimeout(() => newChallenge(), 1400);
    } else {
      setHfFeedback('no'); setHfScore(p => ({ ...p, total: p.total + 1 })); setHfStreak(0);
      setTimeout(() => setHfFeedback(null), 1000);
    }
  }, [hfTarget, newChallenge]);

  // ─── Voice ───
  const handlePitchDetected = useCallback(({ note, cents, freq }) => {
    setVoiceNote(note); setVoiceCents(cents); setVoiceFreq(Math.round(freq));
  }, []);

  // ─── Call & Response ───
  const generatePhrase = useCallback((len) => {
    const notes = scaleData.notes;
    const phrase = [];
    let prev = Math.floor(Math.random() * notes.length);
    for (let i = 0; i < len; i++) {
      // Favor stepwise motion (adjacent scale degrees)
      const step = Math.random() < 0.7 ? (Math.random() > 0.5 ? 1 : -1) : Math.floor(Math.random() * 3) - 1;
      const idx = Math.max(0, Math.min(notes.length - 1, prev + step));
      phrase.push(notes[idx]);
      prev = idx;
    }
    return phrase;
  }, [scaleData]);

  const playCrPhrase = useCallback((phrase) => {
    phrase.forEach((note, i) => {
      setTimeout(() => playWarmNote(note + '4', '4n'), i * 400);
    });
  }, []);

  const newCrPhrase = useCallback(() => {
    const phrase = generatePhrase(crLength);
    setCrPhrase(phrase); setCrGuess([]); setCrFeedback(null);
    setTimeout(() => playCrPhrase(phrase), 200);
  }, [crLength, generatePhrase, playCrPhrase]);

  const handleCrTap = useCallback((tapInfo) => {
    if (!crPhrase.length || crFeedback) return;
    const newGuess = [...crGuess, tapInfo.noteName];
    setCrGuess(newGuess);
    if (newGuess.length === crPhrase.length) {
      const correct = newGuess.every((n, i) => normalizeNote(n) === normalizeNote(crPhrase[i]));
      setCrFeedback(correct ? 'correct' : 'wrong');
      if (correct) {
        setCrScore(p => ({ hit: p.hit + 1, total: p.total + 1 }));
        setCrStreak(p => {
          const next = p + 1;
          // Auto-increase difficulty
          if (next >= 3 && crLength < 4) setTimeout(() => setCrLength(l => Math.min(4, l + 1)), 800);
          return next;
        });
        setTimeout(newCrPhrase, 1400);
      } else {
        setCrScore(p => ({ ...p, total: p.total + 1 })); setCrStreak(0);
        setTimeout(() => setCrFeedback(null), 1200);
      }
    }
  }, [crPhrase, crGuess, crFeedback, crLength, newCrPhrase]);

  // ─── Guided ───
  const startGuided = useCallback((idx) => {
    setGuidedEx(idx); setGuidedStep(0); setGuidedActive(true);
    // If drone-related exercise, auto-start drone
    if (!drone.playing) drone.start(root);
  }, [drone, root]);

  const advanceGuided = useCallback(() => {
    if (guidedEx === null) return;
    const ex = GUIDED_EXERCISES[guidedEx];
    const next = guidedStep + 1;
    if (next >= ex.steps.length) { setGuidedActive(false); setGuidedEx(null); return; }
    setGuidedStep(next);
    const step = ex.steps[next];
    const rootIdx = CHROMATIC.indexOf(normalizeNote(root));
    const rootFreqNote = root + '3';
    if (step.action === 'play_root') playWarmNote(rootFreqNote, '2n');
    if (step.action === 'play_fifth') { const fifth = CHROMATIC[(rootIdx + 7) % 12]; playWarmNote(fifth + '3', '2n'); }
    if (step.action === 'play_third') { const third = CHROMATIC[(rootIdx + 3) % 12]; playWarmNote(third + '3', '2n'); }
    if (step.action === 'play_fourth') { const fourth = CHROMATIC[(rootIdx + 5) % 12]; playWarmNote(fourth + '3', '2n'); }
    if (step.action === 'play_scale') {
      scaleData.notes.forEach((n, i) => setTimeout(() => playWarmNote(n + '4', '4n'), i * 500));
    }
    if (step.action === 'play_scale_slow') {
      scaleData.notes.forEach((n, i) => setTimeout(() => playWarmNote(n + '4', '2n'), i * 900));
    }
  }, [guidedEx, guidedStep, root, scaleData]);

  // ─── Mode-specific tap handler ───
  const handleNoteTap = useCallback((tapInfo) => {
    if (mode === 'hearFind') checkHfGuess(tapInfo);
    else if (mode === 'callResponse') handleCrTap(tapInfo);
    else if (mode === 'oneNote' && !oneNote) setOneNote(tapInfo.noteName);
  }, [mode, checkHfGuess, handleCrTap, oneNote]);

  useEffect(() => {
    if (mode === 'hearFind') setTimeout(newChallenge, 300);
    if (mode === 'callResponse') setTimeout(newCrPhrase, 300);
    if (mode === 'oneNote') setOneNote(null);
    if (mode !== 'voice') { setVoiceNote(null); setMicActive(false); }
    if (mode === 'voice') setMicActive(true);
    if (mode === 'guided') { setGuidedActive(false); setGuidedEx(null); }
    setVoiceNote(null);
  }, [mode]);

  // ─── Styles ───
  const modeTabStyle = (id) => ({
    padding: isMobile ? '10px 14px' : '6px 14px',
    borderRadius: T.radius, border: 'none', cursor: 'pointer',
    background: mode === id ? `${rootColor}12` : 'transparent',
    color: mode === id ? T.textDark : T.textLight,
    fontSize: 11, fontWeight: mode === id ? 700 : 400, fontFamily: T.sans,
    textTransform: 'uppercase', letterSpacing: 1,
    borderBottom: mode === id ? `2px solid ${rootColor}` : '2px solid transparent',
    transition: 'all 0.2s', whiteSpace: 'nowrap', minHeight: 44,
    display: 'flex', alignItems: 'center',
  });

  const btnStyle = (active, color) => ({
    padding: isMobile ? '10px 16px' : '6px 14px',
    borderRadius: T.radius, cursor: 'pointer', fontFamily: T.sans,
    fontSize: 12, fontWeight: 600, minHeight: 44,
    background: active ? `${color}12` : T.bgCard,
    color: active ? color : T.textMed,
    border: `1px solid ${active ? color + '60' : T.border}`,
    display: 'flex', alignItems: 'center', gap: 4,
    transition: 'all 0.2s',
  });

  // Show color wheel: always on desktop, toggle on mobile
  const showWheel = !isMobile || wheelVisible;

  return (
    <div style={{
      fontFamily: T.sans, color: T.textDark,
      padding: embedded ? '12px 0' : '16px 12px',
      maxWidth: 960, margin: '0 auto',
      display: 'flex', flexDirection: 'column',
      minHeight: embedded ? 'auto' : 'calc(100vh - 80px)',
    }}>
      <style>{`
        @keyframes wheelPulse { 0%,100%{opacity:0.4} 50%{opacity:0.8} }
        @keyframes droneGlow { 0%,100%{box-shadow:0 0 4px ${rootColor}40} 50%{box-shadow:0 0 12px ${rootColor}80} }
      `}</style>

      {/* ── HEADER: Back + Summary + Drone ── */}
      {!embedded && (
        <div style={{
          display: 'flex', alignItems: 'center', gap: 8,
          marginBottom: 8, minHeight: 44,
        }}>
          {onBack && (
            <button onClick={onBack} style={{
              background: 'none', border: 'none', cursor: 'pointer', padding: 8,
              color: T.textMed, display: 'flex', alignItems: 'center', minWidth: 44, minHeight: 44,
            }}><ArrowLeft size={20} /></button>
          )}

          {/* Collapsible summary: "A Min Pent ▾" */}
          <button onClick={() => setSettingsOpen(!settingsOpen)} style={{
            flex: 1, background: 'none', border: 'none', cursor: 'pointer',
            display: 'flex', alignItems: 'center', gap: 8, padding: '4px 0',
            textAlign: 'left',
          }}>
            <div style={{
              width: 28, height: 28, borderRadius: 4,
              background: rootColor, display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 11, fontWeight: 800, color: '#fff', fontFamily: 'monospace',
              flexShrink: 0,
            }}>{root}</div>
            <div>
              <div style={{ fontSize: 15, fontWeight: 700, fontFamily: T.serif, color: T.textDark }}>
                Color Music
              </div>
              <div style={{ fontSize: 10, color: T.textMuted, fontFamily: T.sans }}>
                {root} {typeInfo.name}
              </div>
            </div>
            {settingsOpen ? <ChevronUp size={14} color={T.textMuted} /> : <ChevronDown size={14} color={T.textMuted} />}
          </button>

          {/* Drone toggle */}
          <button onClick={() => drone.playing ? drone.stop() : drone.start(root)} style={{
            ...btnStyle(drone.playing, rootColor),
            animation: drone.playing ? 'droneGlow 3s ease-in-out infinite' : 'none',
          }}>
            <Volume2 size={14} />
            {!isMobile && (drone.playing ? 'Drone On' : 'Drone')}
          </button>

          {/* Color wheel toggle (mobile only) */}
          {isMobile && (
            <button onClick={() => setWheelVisible(!wheelVisible)} style={{
              ...btnStyle(wheelVisible, rootColor),
              padding: '10px 12px',
            }}>
              <div style={{
                width: 16, height: 16, borderRadius: '50%',
                background: `conic-gradient(#E83A30, #F59A1E, #E8D830, #2E9E5A, #2570B0, #8B2D8B, #E83A30)`,
              }} />
            </button>
          )}
        </div>
      )}

      {/* ── COLLAPSIBLE ROOT/SCALE SELECTORS ── */}
      {!embedded && settingsOpen && (
        <div style={{
          padding: '12px', marginBottom: 8, borderRadius: T.radiusMd,
          background: T.bgSoft, border: `1px solid ${T.border}`,
        }}>
          {/* Root selector — bigger on mobile */}
          <div style={{ display: 'flex', gap: isMobile ? 4 : 3, marginBottom: 10, flexWrap: 'wrap' }}>
            {CHROMATIC.map(n => {
              const c = getColorForNote(n);
              const sel = normalizeNote(n) === normalizeNote(root);
              return (
                <button key={n} onClick={() => setRoot(n)} style={{
                  width: isMobile ? 44 : 30, height: isMobile ? 40 : 26, borderRadius: 4,
                  background: sel ? `${c}25` : T.bgCard,
                  border: sel ? `2px solid ${c}` : `1px solid ${T.borderSoft}`,
                  color: sel ? c : T.textMuted,
                  fontSize: isMobile ? 11 : 9, fontWeight: sel ? 800 : 400, fontFamily: 'monospace',
                  cursor: 'pointer', transition: 'all 0.2s',
                }}>{n}</button>
              );
            })}
          </div>
          {/* Scale selector */}
          <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
            {Object.entries(SCALE_TYPES).map(([key, info]) => {
              const sel = key === scaleType;
              return (
                <button key={key} onClick={() => setScaleType(key)} style={{
                  padding: isMobile ? '8px 12px' : '4px 10px', borderRadius: T.radius,
                  background: sel ? `${rootColor}08` : 'transparent',
                  border: `1px solid ${sel ? rootColor + '60' : T.borderSoft}`,
                  color: sel ? T.textDark : T.textMuted,
                  fontSize: isMobile ? 12 : 10, fontFamily: T.sans, cursor: 'pointer',
                  minHeight: isMobile ? 44 : 'auto',
                  transition: 'all 0.2s',
                }}>{info.name}</button>
              );
            })}
          </div>
        </div>
      )}

      {/* ── COLOR WHEEL (collapsible on mobile, inline on desktop) ── */}
      {showWheel && (
        <div style={{
          display: 'flex', justifyContent: 'center', marginBottom: 12,
          ...(isMobile ? {} : { float: 'left', marginRight: 16 }),
        }}>
          <ColorWheel
            theme={T} root={root} scaleNotes={scaleNotes}
            voiceNote={voiceNote}
            activeNote={hfRevealed ? hfTarget?.note : null}
            size={isMobile ? 140 : 160}
          />
        </div>
      )}

      {/* ── FRETBOARD (the primary interaction — centered on screen) ── */}
      <div style={{ flex: isMobile ? 1 : 'none', display: 'flex', flexDirection: 'column', justifyContent: 'center', marginBottom: 8 }}>
        <FretboardDiagram
          theme={T}
          scaleData={scaleData}
          colorMode={true}
          richTone={true}
          voiceNote={voiceNote}
          oneNoteFilter={mode === 'oneNote' ? oneNote : null}
          onNoteTap={handleNoteTap}
        />
        {/* Scale info (compact, below fretboard) */}
        {mode === 'explore' && (
          <div style={{ padding: '4px 8px', fontSize: 9, color: T.textMuted, fontFamily: 'monospace', textAlign: 'center' }}>
            {scaleNotes.join(' \u00B7 ')} — {typeInfo.desc}
          </div>
        )}
      </div>

      {/* ── MODE TABS (bottom section on mobile) ── */}
      {!embedded && (
        <div style={{
          display: 'flex', gap: 2, marginBottom: 8,
          overflowX: 'auto', paddingBottom: 2,
          justifyContent: isMobile ? 'stretch' : 'flex-start',
        }}>
          {MODES.map(m => (
            <button key={m.id} onClick={() => setMode(m.id)}
              style={{ ...modeTabStyle(m.id), flex: isMobile ? 1 : 'none', justifyContent: 'center' }}>
              {m.label}
            </button>
          ))}
        </div>
      )}

      {/* ── MODE PANEL (at bottom = thumb zone on mobile) ── */}
      <div style={{
        padding: isMobile ? '12px' : '14px 16px',
        borderRadius: T.radiusMd,
        background: T.bgSoft, border: `1px solid ${T.border}`,
      }}>

        {/* EXPLORE */}
        {mode === 'explore' && (
          <div style={{ fontSize: 13, color: T.textMed, lineHeight: 1.6, fontStyle: 'italic', fontFamily: T.serif }}>
            Tap notes. Listen. Adjacent colors = harmonic neighbors.
            {!drone.playing && ' Turn on the drone to hear each note against the root.'}
            <div style={{ fontSize: 9, color: T.textLight, marginTop: 6, fontStyle: 'normal', fontFamily: T.sans }}>
              \u25A0 = name &nbsp; \u25CF = function &nbsp; toggle above fretboard
            </div>
          </div>
        )}

        {/* HEAR→FIND */}
        {mode === 'hearFind' && (
          <div>
            <div style={{ display: 'flex', gap: 6, alignItems: 'center', flexWrap: 'wrap', marginBottom: 8 }}>
              <button onClick={newChallenge} style={btnStyle(true, rootColor)}>New Note</button>
              <button onClick={() => hfTarget && playWarmNote(hfTarget.full, '2n')} style={btnStyle(false, rootColor)}>Replay</button>
              <button onClick={() => setHfRevealed(true)} style={{ ...btnStyle(false, T.textMuted), fontSize: 10 }}>Reveal</button>
              <div style={{ marginLeft: 'auto', fontFamily: 'monospace', fontSize: 13 }}>
                <span style={{ color: rootColor, fontWeight: 700 }}>{hfScore.hit}</span>
                <span style={{ color: T.textMuted }}>/{hfScore.total}</span>
                {hfStreak >= 3 && <span style={{ color: '#E8D830', marginLeft: 6 }}>{hfStreak}</span>}
              </div>
            </div>
            {hfFeedback && (
              <div style={{
                padding: '8px 12px', borderRadius: T.radius, fontSize: 13, fontWeight: 600,
                background: hfFeedback === 'yes' ? T.successSoft : T.coralSoft,
                color: hfFeedback === 'yes' ? T.success : T.coral,
                marginBottom: 6,
              }}>
                {hfFeedback === 'yes'
                  ? `\u2713 ${hfTarget?.note}. ${hfStreak >= 3 ? 'Locked in.' : 'Nice.'}`
                  : '\u2717 Listen again. Feel where it lives.'}
              </div>
            )}
            {hfRevealed && hfTarget && (
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 4 }}>
                <div style={{
                  width: 32, height: 32, borderRadius: 4,
                  background: getColorForNote(hfTarget.note),
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 11, fontWeight: 800, color: '#fff', fontFamily: 'monospace',
                  boxShadow: `0 0 10px ${getColorForNote(hfTarget.note)}60`,
                }}>{hfTarget.note}</div>
                <span style={{ fontSize: 12, color: T.textMed }}>was the note</span>
              </div>
            )}
          </div>
        )}

        {/* VOICE */}
        {mode === 'voice' && (
          <div>
            {/* Detected note display (above the detector) */}
            {voiceNote && (
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 10 }}>
                <div style={{
                  width: 44, height: 44, borderRadius: '50%',
                  background: getColorForNote(voiceNote),
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 14, fontWeight: 800, color: '#fff', fontFamily: 'monospace',
                  boxShadow: `0 0 16px ${getColorForNote(voiceNote)}60`,
                  transition: 'all 0.15s',
                }}>{voiceNote}</div>
                <div>
                  <div style={{ fontSize: 12, color: T.textMuted, fontFamily: 'monospace' }}>{voiceFreq}Hz</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 2 }}>
                    <div style={{ width: 60, height: 4, borderRadius: 2, background: T.borderSoft, position: 'relative' }}>
                      <div style={{ position: 'absolute', left: '50%', top: -1, width: 1, height: 6, background: T.textMuted }} />
                      <div style={{
                        position: 'absolute', left: `${Math.max(0, Math.min(100, 50 + voiceCents / 2))}%`, top: -2,
                        width: 6, height: 8, borderRadius: 3,
                        background: Math.abs(voiceCents) < 10 ? T.success : Math.abs(voiceCents) < 25 ? '#F5C518' : T.coral,
                        transition: 'left 0.1s',
                      }} />
                    </div>
                    <span style={{ fontSize: 9, color: T.textMuted, fontFamily: 'monospace' }}>
                      {voiceCents > 0 ? '+' : ''}{voiceCents}\u00A2
                    </span>
                  </div>
                </div>
                {scaleNotes.includes(normalizeNote(voiceNote)) && (
                  <span style={{ fontSize: 11, color: T.success, fontWeight: 600 }}>\u2713 in scale</span>
                )}
              </div>
            )}
            {/* Inline LivePitchDetector — user clicks its own Start button */}
            <LivePitchDetector theme={T} inline={true} onPitchDetected={handlePitchDetected} />
            <div style={{ fontSize: 12, color: T.textMed, fontStyle: 'italic', fontFamily: T.serif, marginTop: 8 }}>
              Sing or hum \u2014 watch the fretboard light up. Your voice paints the guitar.
            </div>
          </div>
        )}

        {/* CALL & RESPONSE */}
        {mode === 'callResponse' && (
          <div>
            <div style={{ display: 'flex', gap: 6, alignItems: 'center', flexWrap: 'wrap', marginBottom: 10 }}>
              <button onClick={newCrPhrase} style={btnStyle(true, rootColor)}>New Phrase</button>
              <button onClick={() => crPhrase.length && playCrPhrase(crPhrase)} style={btnStyle(false, rootColor)}>Replay</button>
              <div style={{ display: 'flex', gap: 3, marginLeft: 8 }}>
                {[2, 3, 4].map(n => (
                  <button key={n} onClick={() => { setCrLength(n); }} style={{
                    width: 28, height: 28, borderRadius: T.radius, border: `1px solid ${crLength === n ? rootColor : T.borderSoft}`,
                    background: crLength === n ? `${rootColor}12` : 'transparent',
                    color: crLength === n ? rootColor : T.textMuted, fontSize: 11, fontWeight: 600,
                    cursor: 'pointer', fontFamily: T.sans,
                  }}>{n}</button>
                ))}
              </div>
              <div style={{ marginLeft: 'auto', fontFamily: 'monospace', fontSize: 13 }}>
                <span style={{ color: rootColor, fontWeight: 700 }}>{crScore.hit}</span>
                <span style={{ color: T.textMuted }}>/{crScore.total}</span>
              </div>
            </div>
            {/* Phrase display */}
            {crPhrase.length > 0 && (
              <div style={{ marginBottom: 8 }}>
                <div style={{ fontSize: 9, color: T.textMuted, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 4 }}>Phrase</div>
                <div style={{ display: 'flex', gap: 6 }}>
                  {crPhrase.map((note, i) => (
                    <div key={i} style={{
                      width: 36, height: 36, borderRadius: 4,
                      background: getColorForNote(note),
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: 10, fontWeight: 700, color: '#fff', fontFamily: 'monospace',
                      opacity: crFeedback === 'wrong' ? 1 : (crGuess.length > i ? 0.5 : 1),
                      boxShadow: `0 0 6px ${getColorForNote(note)}40`,
                    }}>{note}</div>
                  ))}
                </div>
              </div>
            )}
            {/* Guess display */}
            {crGuess.length > 0 && (
              <div style={{ marginBottom: 8 }}>
                <div style={{ fontSize: 9, color: T.textMuted, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 4 }}>Your answer</div>
                <div style={{ display: 'flex', gap: 6 }}>
                  {crGuess.map((note, i) => {
                    const correct = normalizeNote(note) === normalizeNote(crPhrase[i]);
                    return (
                      <div key={i} style={{
                        width: 36, height: 36, borderRadius: 4,
                        background: getColorForNote(note),
                        border: `2px solid ${correct ? T.success : T.coral}`,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: 10, fontWeight: 700, color: '#fff', fontFamily: 'monospace',
                      }}>{note}</div>
                    );
                  })}
                </div>
              </div>
            )}
            {crFeedback && (
              <div style={{
                padding: '6px 12px', borderRadius: T.radius, fontSize: 12, fontWeight: 600,
                background: crFeedback === 'correct' ? T.successSoft : T.coralSoft,
                color: crFeedback === 'correct' ? T.success : T.coral,
              }}>
                {crFeedback === 'correct' ? '\u2713 Perfect echo!' : '\u2717 Not quite \u2014 listen again.'}
              </div>
            )}
            {!crPhrase.length && (
              <div style={{ fontSize: 12, color: T.textMuted, fontStyle: 'italic', fontFamily: T.serif }}>
                Tap "New Phrase" to hear a melodic pattern. Echo it back by tapping the fretboard.
              </div>
            )}
          </div>
        )}

        {/* GUIDED */}
        {mode === 'guided' && !guidedActive && (
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {GUIDED_EXERCISES.map((ex, i) => (
              <button key={ex.id} onClick={() => startGuided(i)} style={{
                padding: '10px 14px', borderRadius: T.radiusMd,
                background: T.bgCard, border: `1px solid ${T.border}`,
                color: T.textMed, fontSize: 12, textAlign: 'left',
                cursor: 'pointer', flex: '1 1 140px', minHeight: 44,
                transition: 'all 0.2s',
              }}>
                <div style={{ fontWeight: 600, marginBottom: 2, fontFamily: T.serif }}>{ex.title}</div>
                <div style={{ fontSize: 10, color: T.textMuted }}>{ex.desc}</div>
              </button>
            ))}
          </div>
        )}
        {mode === 'guided' && guidedActive && guidedEx !== null && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
              <span style={{ fontSize: 10, color: T.textMuted, fontFamily: 'monospace', textTransform: 'uppercase', letterSpacing: 1 }}>
                {GUIDED_EXERCISES[guidedEx].title} \u2014 {guidedStep + 1}/{GUIDED_EXERCISES[guidedEx].steps.length}
              </span>
              <button onClick={() => { setGuidedActive(false); setGuidedEx(null); }}
                style={{ ...btnStyle(false, T.textMuted), fontSize: 9, padding: '4px 8px', minHeight: 32 }}>Exit</button>
            </div>
            <div style={{
              fontSize: 15, color: T.textDark, lineHeight: 1.6,
              padding: '12px 0', minHeight: 50, fontFamily: T.serif,
            }}>
              {GUIDED_EXERCISES[guidedEx].steps[guidedStep].text}
            </div>
            {/* Progress bar */}
            <div style={{ display: 'flex', gap: 3, marginBottom: 10 }}>
              {GUIDED_EXERCISES[guidedEx].steps.map((_, i) => (
                <div key={i} style={{
                  flex: 1, height: 3, borderRadius: 2,
                  background: i <= guidedStep ? rootColor : T.borderSoft,
                  transition: 'background 0.3s',
                }} />
              ))}
            </div>
            <button onClick={advanceGuided} style={btnStyle(true, rootColor)}>
              {guidedStep >= GUIDED_EXERCISES[guidedEx].steps.length - 1 ? 'Finish' : 'Next \u2192'}
            </button>
          </div>
        )}

        {/* ONE NOTE */}
        {mode === 'oneNote' && (
          <div>
            {oneNote ? (
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
                <div style={{
                  width: 44, height: 44, borderRadius: 4,
                  background: getColorForNote(oneNote),
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 18, fontWeight: 800, color: '#fff', fontFamily: T.serif,
                  boxShadow: `0 0 14px ${getColorForNote(oneNote)}50`,
                }}>{oneNote}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13, color: T.textMed, fontStyle: 'italic', fontFamily: T.serif }}>
                    Express everything with timing and feel.
                  </div>
                </div>
                <button onClick={() => setOneNote(null)} style={btnStyle(false, T.textMuted)}>Reset</button>
              </div>
            ) : (
              <div style={{ fontSize: 13, color: T.textMuted, fontStyle: 'italic', fontFamily: T.serif }}>
                Tap any scale note to choose your one note.
              </div>
            )}
          </div>
        )}
      </div>

      {/* ── Stats ── */}
      {!embedded && (hfScore.total > 0 || crScore.total > 0) && (
        <div style={{
          marginTop: 8, padding: '6px 12px',
          fontSize: 10, color: T.textMuted, fontFamily: T.sans,
          textTransform: 'uppercase', letterSpacing: 1.5,
          display: 'flex', gap: 16,
        }}>
          <span>{Math.round(hfScore.hit / hfScore.total * 100)}%</span>
          <span>Streak {hfStreak}</span>
          <span>{Math.floor((Date.now() - sessionStart) / 60000)}m</span>
        </div>
      )}
    </div>
  );
}

export default ColorMusicTrainer;
