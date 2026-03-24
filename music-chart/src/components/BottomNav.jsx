import React from 'react';
import { Wrench, Music } from 'lucide-react';
import { T } from '../theme.js';

export default function BottomNav({ tab, setTab, isDark }) {
  return (
    <nav className={`bottom-nav mobile-only ${isDark ? "bottom-nav-dark" : ""}`} aria-label="Main navigation">
      {[
        { id: "tools", icon: Wrench, label: "Tools" },
        { id: "charts", icon: Music, label: "Charts" },
      ].map(({ id, icon: Icon, label }) => (
        <button key={id}
          className={`nav-item ${tab === id ? "active" : ""}`}
          onClick={() => setTab(id)}
          aria-current={tab === id ? "page" : undefined}
          aria-label={label}>
          <Icon size={20} aria-hidden="true" />
          <span className="nav-label">{label}</span>
        </button>
      ))}
    </nav>
  );
}
