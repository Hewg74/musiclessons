import React, { useState, useEffect } from 'react';
import { T } from '../theme.js';

// --- Helper Functions & Components ---
export const formatTime = (time) => {
  if (!time || isNaN(time)) return "0:00";
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
};

export const parseTime = (str) => {
  if (!str) return 0;
  if (!str.includes(':')) return parseFloat(str) || 0;
  const parts = str.split(':');
  if (parts.length === 2) {
    return parseInt(parts[0], 10) * 60 + parseFloat(parts[1]);
  }
  return 0;
};

export const TimeInput = ({ time, onChange, T }) => {
  const [val, setVal] = useState(formatTime(time));
  useEffect(() => { setVal(formatTime(time)); }, [time]);

  return (
    <input
      value={val}
      onChange={e => setVal(e.target.value)}
      onBlur={() => {
        let t = parseTime(val);
        if (isNaN(t)) t = 0;
        onChange(t);
        setVal(formatTime(t));
      }}
      onKeyDown={e => {
        if (e.key === 'Enter') e.target.blur();
      }}
      style={{
        width: 44, background: 'transparent', border: 'none', borderBottom: `1px solid transparent`,
        color: T.textDark, fontFamily: T.sans, fontSize: 15, fontWeight: 600, textAlign: 'center', padding: "0 0 2px 0",
        outline: 'none', fontVariantNumeric: "tabular-nums", transition: "border-color 0.2s"
      }}
      onFocus={e => e.target.style.borderBottom = `1px solid ${T.gold}`}
      onBlurCapture={e => e.target.style.borderBottom = `1px solid transparent`}
    />
  );
};
