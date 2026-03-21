import React from 'react';
import { T } from '../theme.js';
import InlineKeyboard from './InlineKeyboard.jsx';

export default function PitchPipe({ theme: T }) {
  // Use InlineKeyboard as the Pitch Pipe
  return (
    <div>
      <p style={{ fontSize: 13, color: T.textMed, marginBottom: 24, textAlign: "center", textTransform: "uppercase", letterSpacing: 1.5 }}>
        Reference Keyboard
      </p>
      <InlineKeyboard theme={T} range={["C2", "C5"]} />
    </div>
  );
}
