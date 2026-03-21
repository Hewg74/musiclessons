import React, { useState, useEffect } from 'react';
import * as Tone from 'tone';
import { Sun, Moon } from 'lucide-react';
import { T, applyTheme } from './theme.js';
import { useMetronome, MetronomePanel, TapMatchModal, FloatingMetronome } from './tools/Metronome.jsx';
import { decompressFromURL, makeTemplateChart } from './charts/chartHelpers.js';
import ToolCard from './components/ToolCard.jsx';
import BottomNav from './components/BottomNav.jsx';

// Import all tools
import PracticeTimerTool from './tools/PracticeTimer.jsx';
import DroneGenerator from './tools/DroneGenerator.jsx';
import GenreMetronome from './tools/GenreMetronome.jsx';
import { AudioPlayer } from './tools/BackingTrackPlayer.jsx';
import FlightCheck from './tools/FlightCheck.jsx';
import LivePitchDetector from './tools/LivePitchDetector.jsx';
import PitchPipe from './tools/PitchPipe.jsx';
import AudioRecorder from './tools/AudioRecorder.jsx';
import OfflineTabs from './tools/OfflineTabs.jsx';

// Import chart components
import { StrumChartBuilder } from './charts/StrumChartBuilder.jsx';
import { ChartListView } from './charts/ChartListView.jsx';

export default function App() {
  const [isDark, setIsDark] = useState(() => {
    if (typeof window === "undefined") return false;
    const saved = localStorage.getItem("theme");
    const dark = saved === "dark";
    applyTheme(dark);
    return dark;
  });

  const toggleTheme = () => {
    const next = !isDark;
    applyTheme(next);
    setIsDark(next);
    localStorage.setItem("theme", next ? "dark" : "light");
  };

  const [tab, setTab] = useState("charts"); // 'tools' or 'charts'
  const [activeChart, setActiveChart] = useState(null);
  const [tapMatchBpm, setTapMatchBpm] = useState(null);
  const metro = useMetronome();

  // URL hash chart loading
  useEffect(() => {
    const hash = window.location.hash;
    if (hash.startsWith('#chart=')) {
      try {
        const chart = decompressFromURL(hash.slice(7));
        if (chart && chart.measures) {
          setActiveChart(chart);
          setTab('charts');
          const all = JSON.parse(localStorage.getItem('strumCharts') || '{}');
          all[chart.id] = chart;
          localStorage.setItem('strumCharts', JSON.stringify(all));
        }
      } catch { }
      window.history.replaceState(null, '', window.location.pathname);
    }
  }, []);

  // Init Tone context
  useEffect(() => {
    try { Tone.getContext().lookAhead = 0.1; } catch { }
  }, []);

  const tabs = [
    { id: "tools", label: "Tools" },
    { id: "charts", label: "Charts" },
  ];

  return (
    <div style={{ background: T.bg, minHeight: "100vh", color: T.textDark, fontFamily: T.sans }}>
      <style>{`
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes pulse-ring {
          0% { transform: scale(0.8); box-shadow: 0 0 0 0 rgba(0, 0, 0, 0.4); }
          70% { transform: scale(1); box-shadow: 0 0 0 10px rgba(0, 0, 0, 0); }
          100% { transform: scale(0.8); box-shadow: 0 0 0 0 rgba(0, 0, 0, 0); }
        }
        .interactive-btn {
          transition: all 0.2s ease;
        }
        .interactive-btn:hover {
          transform: scale(1.02);
          opacity: 0.9;
        }
        .interactive-btn:active {
          transform: scale(0.98);
        }
      `}</style>

      {/* Header */}
      <div style={{ background: T.bgCard, borderBottom: `1px solid ${T.border}`, position: "relative", display: "flex", flexDirection: "column", alignItems: "center" }}>
        <div style={{ padding: "48px 24px 32px", width: "100%", maxWidth: 640, position: "relative" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div style={{ fontSize: 9, fontWeight: 900, color: T.gold, letterSpacing: 2.5, textTransform: "uppercase", fontFamily: T.sans }}>Music Chart</div>
            </div>
            <button className="interactive-btn" onClick={toggleTheme} style={{
              background: isDark ? T.bgSoft : T.goldSoft, border: `1px solid ${isDark ? T.border : T.gold}15`,
              color: isDark ? T.gold : T.goldDark, padding: "8px", borderRadius: T.radiusMd,
              cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
              boxShadow: isDark ? "none" : `0 2px 8px ${T.gold}20`
            }}>
              {isDark ? <Sun size={18} strokeWidth={2.5} /> : <Moon size={18} strokeWidth={2.5} />}
            </button>
          </div>
          <div style={{ fontSize: 44, fontWeight: 400, fontFamily: T.serif, color: T.textDark, lineHeight: 1.1, marginBottom: 12 }}>
            {tab === "charts" ? "Charts" : "Tools"}
          </div>
        </div>
      </div>

      {/* Tab bar (Desktop Only) */}
      <div className="hide-scrollbar desktop-only" style={{
        background: isDark ? "rgba(44, 40, 37, 0.55)" : "rgba(253, 251, 249, 0.65)",
        backdropFilter: "blur(24px) saturate(140%)", WebkitBackdropFilter: "blur(24px) saturate(140%)",
        borderBottom: `1px solid ${T.border}`, position: "sticky", top: 0, zIndex: 10, display: "flex",
        justifyContent: "center", boxShadow: isDark ? "0 8px 32px rgba(0,0,0,0.2)" : "0 8px 32px rgba(44,40,37,0.04)",
        overflowX: "auto", WebkitOverflowScrolling: "touch", msOverflowStyle: "none", scrollbarWidth: "none"
      }}>
        <div style={{ display: "flex", gap: 32, padding: "0 20px" }}>
          {tabs.map(t => (
            <button key={t.id} onClick={() => setTab(t.id)} style={{
              padding: "16px 0", background: "none", border: "none",
              borderBottom: `2px solid ${tab === t.id ? T.gold : "transparent"}`,
              color: tab === t.id ? T.gold : T.textMuted,
              fontSize: 14, fontWeight: 500, cursor: "pointer", fontFamily: T.serif, letterSpacing: 0.5,
              transition: "color 0.2s", flexShrink: 0, whiteSpace: "nowrap"
            }}>{t.label}</button>
          ))}
        </div>
      </div>

      <div style={{ maxWidth: tab === "charts" ? 900 : 560, margin: "0 auto", padding: "20px 16px 90px" }}>
        {/* TOOLS TAB — Metronome + all tools combined */}
        {tab === "tools" && (
          <div>
            <div style={{ textAlign: "center", marginBottom: 24 }}>
              <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: 4, textTransform: "uppercase", color: T.gold, fontFamily: T.sans, marginBottom: 8 }}>
                Music Chart
              </div>
              <div style={{ fontSize: 32, fontWeight: 400, fontFamily: T.serif, color: T.textDark }}>Tools</div>
            </div>

            <ToolCard icon="⏱️" title="Practice Timer" defaultOpen={true}>
              <PracticeTimerTool theme={T} />
            </ToolCard>

            <ToolCard icon="🎛️" title="Metronome" defaultOpen={true}>
              <MetronomePanel metro={metro} onOpenTapMatch={setTapMatchBpm} />
            </ToolCard>

            <ToolCard icon="🌫️" title="Drone Generator" defaultOpen={false}>
              <DroneGenerator theme={T} />
            </ToolCard>

            <ToolCard icon="📚" title="Quick Reference" defaultOpen={false}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
                <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: 2, textTransform: "uppercase", color: T.textMuted, fontFamily: T.sans }}>
                  Quick Reference
                </div>
                <button onClick={() => setTapMatchBpm(metro.bpm)} style={{
                  background: "transparent", border: "none", color: T.gold, fontSize: 11, fontWeight: 600, cursor: "pointer",
                  fontFamily: T.sans, textTransform: "uppercase", letterSpacing: 1, padding: 0
                }}>
                  Tap Minigame
                </button>
              </div>
              {[
                { bpm: "78", use: "16th note subdivision (Drill #3)" },
                { bpm: "120", use: "Surf Rock — fingerpick + count + ooh climbing" },
                { bpm: "122", use: "Lyric placement + Sol Del Sur tap-along" },
                { bpm: "165", use: "Island strum (Surf Rock Drum)" },
                { bpm: "200-244", use: "Main metronome work (Drills #1 & #2)" },
              ].map((r, i) => (
                <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: i < 4 ? `1px solid ${T.border}` : "none", fontSize: 13 }}>
                  <span style={{ color: T.gold, fontWeight: 700, fontFamily: T.sans }}>{r.bpm}</span>
                  <span style={{ color: T.textLight, fontFamily: T.sans }}>{r.use}</span>
                </div>
              ))}
            </ToolCard>

            <ToolCard icon="🖇️" title="Backing Track Links" defaultOpen={false}>
              {[
                { label: "Surf Rock 120 BPM", url: "youtube.com/watch?v=AEf8LF4Xu18" },
                { label: "Groove Beat 90 BPM", url: "youtube.com/watch?v=n0nEhFAiorg" },
                { label: "Reggae One Drop 85 BPM", url: "youtube.com/watch?v=1aGp-CnwebE" },
                { label: "Dub Reggae 85 BPM", url: "youtube.com/watch?v=vmH-xBYBQIg" },
                { label: "Desert Blues 75 BPM", url: "youtube.com/watch?v=Yfyymjm24Ro" },
                { label: "Khruangbin Style 80 BPM", url: "youtube.com/watch?v=JlMy52s7qrI" },
                { label: "Cinematic Western 80 BPM", url: "youtube.com/watch?v=EKPjIt9GzX0" },
                { label: "Psych Rock 120 BPM", url: "youtube.com/watch?v=eqI_3Mw8go4" },
                { label: "Deep Soul Groove 80 BPM", url: "youtube.com/watch?v=55MTcCE6ZIk" },
                { label: "Soul Funk Groove 90 BPM", url: "youtube.com/watch?v=HhPq1J93uMI" },
                { label: "Surf Rock 165 BPM", url: "youtube.com/watch?v=gBNY43Xlp1Y" },
                { label: "Groove Beat 80 BPM", url: "youtube.com/watch?v=0vgOdlxSTW0" },
              ].map((l, i, arr) => (
                <div key={i} style={{ padding: "8px 0", fontSize: 13, borderBottom: i < arr.length - 1 ? `1px solid ${T.border}` : "none" }}>
                  <span style={{ color: T.gold, fontFamily: T.sans, fontWeight: 600 }}>{l.label}</span>
                  <span style={{ color: T.textMuted, marginLeft: 10, fontSize: 11, fontFamily: T.sans }}>{l.url}</span>
                </div>
              ))}
            </ToolCard>

            <ToolCard icon="✅" title="Flight Check" defaultOpen={true}>
              <FlightCheck theme={T} />
            </ToolCard>

            <ToolCard icon="✋" title="Tap Practice Minigame">
              <div style={{ textAlign: "center", padding: "10px 0" }}>
                <p style={{ fontSize: 14, color: T.textMed, marginBottom: 20 }}>
                  Practice tapping steadily at any BPM. Helps internalize the groove.
                </p>
                <button onClick={() => setTapMatchBpm(metro.bpm)} style={{
                  background: T.gold, color: "#fff", border: "none", padding: "12px 24px",
                  borderRadius: T.radius, cursor: "pointer", fontFamily: T.sans, fontWeight: 600,
                  textTransform: "uppercase", letterSpacing: 1
                }}>
                  Launch Game
                </button>
              </div>
            </ToolCard>

            <ToolCard icon="🎤" title="Live Pitch Detector">
              <LivePitchDetector theme={T} />
            </ToolCard>

            <ToolCard icon="🎵" title="Pitch Pipe">
              <PitchPipe theme={T} />
            </ToolCard>

            <ToolCard icon="🎙️" title="Quick Recorder">
              <AudioRecorder theme={T} />
            </ToolCard>

            <ToolCard icon="📻" title="Backing Tracks">
              <AudioPlayer theme={T} />
            </ToolCard>

            <ToolCard icon="🎸" title="Tabs & Lyrics">
              <OfflineTabs theme={T} />
            </ToolCard>

          </div>
        )}

        {/* CHARTS TAB */}
        {tab === "charts" && (
          activeChart ? (
            <StrumChartBuilder
              theme={T}
              metro={metro}
              initialChart={activeChart}
              onBack={() => setActiveChart(null)}
            />
          ) : (
            <div>
              {/* Page header */}
              <div style={{ textAlign: "center", marginBottom: 24 }}>
                <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: 4, textTransform: "uppercase", color: T.gold, fontFamily: T.sans, marginBottom: 8 }}>
                  Chart Builder
                </div>
                <div style={{ fontSize: 32, fontWeight: 400, fontFamily: T.serif, color: T.textDark }}>Charts</div>
              </div>

              <ChartListView
                theme={T}
                onSelect={(ch) => setActiveChart(ch)}
                onNew={() => setActiveChart(makeTemplateChart())}
              />
            </div>
          )
        )}
      </div>

      {/* Floating metronome */}
      {metro.playing && tab !== "tools" && !tapMatchBpm && (
        <FloatingMetronome metro={metro} setTab={setTab} isDark={isDark} theme={T} />
      )}

      {/* Tap Tempo Modal */}
      {tapMatchBpm && (
        <TapMatchModal targetBpm={tapMatchBpm} onClose={() => setTapMatchBpm(null)} metro={metro} />
      )}

      {/* Mobile Bottom Navigation */}
      <BottomNav tab={tab} setTab={setTab} isDark={isDark} />

      <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=Lato:wght@300;400;600;700&display=swap" rel="stylesheet" />
    </div>
  );
}
