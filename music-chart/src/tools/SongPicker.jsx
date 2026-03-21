import React, { useState, useEffect } from 'react';
import { Music, X } from 'lucide-react';
import { T } from '../theme.js';
import { loadYouTubeAPI, extractYouTubeId, YouTubeAudioPlayer } from './youtube.jsx';
import { MiniAudioPlayer } from './BackingTrackPlayer.jsx';
import { TAB_CONTENT } from './OfflineTabs.jsx';

const CHART_SONGS = [
  { id: "soldelsur", name: "Sol Del Sur", artist: "Sun Room", src: "/sol-del-sur.mp3", bpm: 120, key: "F#", tabId: "soldelsur" },
  { id: "iltwyw", name: "I Like The Way You Walk", artist: "The Donkeys", src: "/iltwyw.mp3", bpm: 97, key: "A", tabId: "iltwyw" },
];

export default function SongPicker({ theme: T, youtubeUrl, onYoutubeChange, hidePlayer, onSongChange }) {
  const [songId, setSongId] = useState("");
  const [showTabs, setShowTabs] = useState(false);
  const [ytInput, setYtInput] = useState(youtubeUrl || "");
  const song = CHART_SONGS.find(s => s.id === songId);
  const ytVideoId = extractYouTubeId(youtubeUrl || "");

  // When YouTube URL prop changes externally, sync local input
  useEffect(() => {
    if (youtubeUrl !== undefined) setYtInput(youtubeUrl || "");
  }, [youtubeUrl]);

  const handleYtInputChange = (val) => {
    setYtInput(val);
    const id = extractYouTubeId(val);
    if (id) {
      setSongId(""); // Clear dropdown when valid YT URL
      setShowTabs(false);
      if (onYoutubeChange) onYoutubeChange(val);
    } else if (!val.trim()) {
      if (onYoutubeChange) onYoutubeChange("");
    }
  };

  const handleSongChange = (newSongId) => {
    setSongId(newSongId);
    setShowTabs(false);
    if (newSongId && onYoutubeChange) {
      onYoutubeChange(""); // Clear YouTube when song selected
      setYtInput("");
    }
  };

  // Notify parent of song changes so it can render the player separately on desktop
  useEffect(() => {
    if (onSongChange) onSongChange(song || null);
  }, [songId]);

  return (
    <div style={{ marginBottom: hidePlayer ? 0 : 16 }}>
      {/* Song select or YouTube URL — unified row */}
      <div style={{
        display: "flex", alignItems: "center", gap: 8, marginBottom: (!hidePlayer && (song || ytVideoId)) ? 8 : 0,
        flexWrap: "wrap",
      }}>
        <Music size={14} style={{ color: T.textMuted, flexShrink: 0 }} />

        {/* Song dropdown — hide when YouTube URL is active */}
        {!ytVideoId && (
          <select
            value={songId}
            onChange={e => handleSongChange(e.target.value)}
            style={{
              flex: 1, minWidth: 140, fontSize: 13, fontFamily: T.serif, fontWeight: 600, color: T.textDark,
              background: T.bgSoft, border: `1px solid ${T.border}`, borderRadius: T.radius,
              padding: "7px 10px", cursor: "pointer", outline: "none",
              appearance: "auto",
            }}
          >
            <option value="">Choose a song...</option>
            {CHART_SONGS.map(s => (
              <option key={s.id} value={s.id}>{s.name} — {s.artist} ({s.bpm} BPM, {s.key})</option>
            ))}
          </select>
        )}

        {/* Divider — show when no song selected and no YouTube */}
        {!song && !ytVideoId && (
          <span style={{ fontSize: 10, color: T.textMuted, fontFamily: T.sans, fontWeight: 500 }}>or</span>
        )}

        {/* YouTube URL input — compact when song dropdown visible, full-width when active */}
        <div style={{ display: "flex", alignItems: "center", gap: 6, flex: ytVideoId ? 1 : "0 1 auto", minWidth: ytVideoId ? 0 : 160 }}>
          <input
            type="text"
            value={ytInput}
            onChange={e => handleYtInputChange(e.target.value)}
            placeholder={ytVideoId ? "YouTube URL" : "YouTube URL..."}
            style={{
              flex: 1, fontSize: 12, fontFamily: T.sans, color: T.textDark,
              background: T.bgSoft, border: `1px solid ${ytVideoId ? T.gold + "60" : T.border}`,
              borderRadius: T.radius, padding: "7px 10px", outline: "none",
              transition: "border-color 0.15s",
              minWidth: 0,
            }}
          />
          {ytVideoId && (
            <button onClick={() => { setYtInput(""); if (onYoutubeChange) onYoutubeChange(""); }} style={{
              fontSize: 9, padding: "5px 8px", borderRadius: T.radius, cursor: "pointer",
              fontWeight: 700, fontFamily: T.sans, textTransform: "uppercase", letterSpacing: 1,
              background: "transparent", color: T.textMuted, border: `1px solid ${T.border}`,
              flexShrink: 0,
            }}><X size={12} /></button>
          )}
        </div>

        {song && song.tabId && TAB_CONTENT[song.tabId] && (
          <button onClick={() => setShowTabs(!showTabs)} style={{
            background: showTabs ? T.getTint(T.gold, 0.1) : "none",
            border: `1px solid ${showTabs ? T.gold + "40" : T.borderSoft}`,
            borderRadius: T.radius, padding: "5px 10px", cursor: "pointer",
            fontSize: 9, fontWeight: 700, color: showTabs ? T.gold : T.textMuted,
            fontFamily: T.sans, textTransform: "uppercase", letterSpacing: 1,
            transition: "all 0.15s", flexShrink: 0,
          }}>Tabs</button>
        )}
      </div>

      {/* YouTube player or MiniAudioPlayer — rendered inline when not hidden */}
      {!hidePlayer && (ytVideoId ? (
        <YouTubeAudioPlayer videoId={ytVideoId} theme={T} title="YouTube" />
      ) : song ? (
        <MiniAudioPlayer src={song.src} theme={T} title={`${song.name} — ${song.artist}`} />
      ) : null)}

      {/* Tabs expansion */}
      {showTabs && song && song.tabId && TAB_CONTENT[song.tabId] && (
        <div style={{
          border: `1px solid ${T.borderSoft}`, borderRadius: T.radius,
          overflow: "hidden", marginTop: 8,
        }}>
          <pre style={{
            margin: 0, padding: "12px 16px", background: T.bgSoft,
            fontSize: 11, fontFamily: "'Courier New', monospace",
            color: T.textDark, whiteSpace: "pre", overflowX: "auto",
            maxHeight: 280, overflowY: "auto", lineHeight: 1.6,
          }}>{TAB_CONTENT[song.tabId].trim()}</pre>
        </div>
      )}
    </div>
  );
}
