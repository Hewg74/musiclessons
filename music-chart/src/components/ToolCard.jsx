import React, { useState } from 'react';
import { T } from '../theme.js';

export default function ToolCard({ title, icon, defaultOpen = false, children }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div style={{
      background: T.bgCard, border: `1px solid ${T.border}`, borderRadius: T.radius,
      marginBottom: 12, overflow: "hidden", transition: "all 0.2s"
    }}>
      <div onClick={() => setOpen(!open)} style={{
        display: "flex", alignItems: "center", gap: 14, padding: "16px", cursor: "pointer"
      }}>
        <div style={{ fontSize: 24, flexShrink: 0, width: 32, textAlign: "center" }}>{icon}</div>
        <div style={{ flex: 1 }}>
          <div style={{ fontWeight: 600, fontSize: 18, color: T.textDark, fontFamily: T.serif }}>{title}</div>
        </div>
        <div style={{ color: T.textMuted, display: "flex", transition: "transform 0.2s", transform: open ? "rotate(180deg)" : "" }}>
          <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M7 10l5 5 5-5z" /></svg>
        </div>
      </div>
      {open && (
        <div style={{ padding: "0 16px 16px", borderTop: `1px solid ${T.borderSoft}`, paddingTop: 16 }}>
          {children}
        </div>
      )}
    </div>
  );
}
