import React from 'react';
import { Wrench, Music } from 'lucide-react';
import { T } from '../theme.js';

export default function BottomNav({ tab, setTab, isDark }) {
  return (
    <div className={`bottom-nav mobile-only ${isDark ? "bottom-nav-dark" : ""}`}>
      <button className={`nav-item ${tab === "tools" ? "active" : ""}`} onClick={() => setTab("tools")}>
        <Wrench size={20} />
        <span className="nav-label">Tools</span>
      </button>

      <button className={`nav-item ${tab === "charts" ? "active" : ""}`} onClick={() => setTab("charts")}>
        <Music size={20} />
        <span className="nav-label">Charts</span>
      </button>
    </div>
  );
}
