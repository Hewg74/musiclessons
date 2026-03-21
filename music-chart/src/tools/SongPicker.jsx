import React, { useState, useEffect } from 'react';
import { Music, X } from 'lucide-react';
import { T } from '../theme.js';
import { extractYouTubeId, YouTubeAudioPlayer } from './youtube.jsx';

export default function SongPicker({ theme: T, youtubeUrl, onYoutubeChange, hidePlayer }) {
  const [ytInput, setYtInput] = useState(youtubeUrl || "");
  const ytVideoId = extractYouTubeId(youtubeUrl || "");

  // Sync when prop changes externally
  useEffect(() => {
    if (youtubeUrl !== undefined) setYtInput(youtubeUrl || "");
  }, [youtubeUrl]);

  const handleChange = (val) => {
    setYtInput(val);
    const id = extractYouTubeId(val);
    if (id) {
      if (onYoutubeChange) onYoutubeChange(val);
    } else if (!val.trim()) {
      if (onYoutubeChange) onYoutubeChange("");
    }
  };

  return (
    <div style={{ marginBottom: hidePlayer ? 0 : 16 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: (!hidePlayer && ytVideoId) ? 8 : 0 }}>
        <Music size={14} style={{ color: T.textMuted, flexShrink: 0 }} />
        <input
          type="text"
          value={ytInput}
          onChange={e => handleChange(e.target.value)}
          placeholder="Paste YouTube URL..."
          style={{
            flex: 1, fontSize: 13, fontFamily: T.sans, color: T.textDark,
            background: T.bgSoft, border: `1px solid ${ytVideoId ? T.gold + "60" : T.border}`,
            borderRadius: T.radius, padding: "8px 12px", outline: "none",
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

      {!hidePlayer && ytVideoId && (
        <YouTubeAudioPlayer videoId={ytVideoId} theme={T} title="YouTube" />
      )}
    </div>
  );
}
