import React, { useState } from 'react';
import * as Tone from 'tone';
import { T } from '../theme.js';

export default function InlineKeyboard({
  range = ["C3", "B4"],
  highlightNotes = [],
  label = "",
  theme,
  zoneMap = [] // optional: [{range: [minIdx, maxIdx], color: string}]
}) {
  const T = theme;
  const CHROMATIC = ["C", "C#", "D", "E♭", "E", "F", "F#", "G", "A♭", "A", "B♭", "B"];
  const WHITE_NAMES = ["C", "D", "E", "F", "G", "A", "B"];
  const BLACK_MAP = { "C": "C#", "D": "E♭", "F": "F#", "G": "A♭", "A": "B♭" };

  // Parse range
  const startOct = parseInt(range[0].slice(-1));
  const endOct = parseInt(range[1].slice(-1));

  const octaves = [];
  for (let o = startOct; o <= endOct; o++) octaves.push(o);

  // Build highlight matching using pitch classes — matches regardless of octave or flat format
  const normalizeToken = (n) => (n || "").trim().replace(/\u266D/g, 'b').replace(/\u266F/g, '#');
  const getPitchClass = (n) => { const m = normalizeToken(n).match(/^([A-Ga-g][#b]?)/); return m ? m[1].toUpperCase() : ""; };

  const highlightNoteSet = new Set();
  const highlightPCSet = new Set();
  (highlightNotes || []).forEach(n => {
    const norm = normalizeToken(n);
    highlightNoteSet.add(norm);
    // Also add unicode variant
    if (norm.includes('b')) highlightNoteSet.add(norm.replace(/b/g, '\u266D'));
    else if (norm.includes('\u266D')) highlightNoteSet.add(norm.replace(/\u266D/g, 'b'));
    // Add pitch class for octave-independent matching
    const pc = getPitchClass(n);
    if (pc) highlightPCSet.add(pc);
  });
  const isHighlighted = (note) => {
    const norm = normalizeToken(note);
    if (highlightNoteSet.has(norm)) return true;
    const pc = getPitchClass(note);
    return pc && highlightPCSet.has(pc);
  };

  const playNote = async (n) => {
    if (Tone.context.state !== 'running') await Tone.context.resume();
    const synth = new Tone.Synth({
      oscillator: { type: 'triangle' },
      envelope: { attack: 0.1, decay: 0.2, sustain: 1, release: 1 }
    }).toDestination();
    synth.volume.value = -18;
    synth.triggerAttackRelease(n.replace('♭', 'b'), "2n");
    setTimeout(() => synth.dispose(), 2000);
  };

  const whiteKeys = [];
  const blackKeys = [];
  let absoluteIndex = 0;

  octaves.forEach(oct => {
    WHITE_NAMES.forEach(w => {
      const note = `${w}${oct}`;
      whiteKeys.push({ note, index: absoluteIndex });
      absoluteIndex++;

      const bName = BLACK_MAP[w];
      if (bName) {
        blackKeys.push({ note: `${bName}${oct}`, index: absoluteIndex, afterWhite: whiteKeys.length - 1 });
        absoluteIndex++;
      }
    });
  });

  // Default theme fallback if not provided
  const Th = T || {
    bgSoft: "#fdfbf9", bgCard: "#ffffff", border: "#eae1d9", borderSoft: "#f5f0ec",
    textDark: "#2c2825", textMed: "#59534e", textLight: "#8c867f", textMuted: "#b8b2ab",
    gold: "#d4a373", goldDark: "#b58454", goldSoft: "#f9f3ec", radiusMd: "6px", sans: "'Lato', sans-serif"
  };

  const bg = `linear-gradient(180deg, ${Th.bgSoft} 0%, ${Th.bgCard} 100%)`;
  const containerBorder = `1px solid ${Th.border}`;
  const labelColor = Th.textMuted;
  const keyBedBg = "linear-gradient(180deg, #e8e3de 0%, #dcd6d0 100%)";
  const keyBedBorder = `1px solid ${Th.borderSoft}`;

  // White Key styling
  const whiteGradNormal = "linear-gradient(180deg, #ffffff 0%, #f4f4f4 85%, #e6e6e6 100%)";
  const whiteGradActive = `linear-gradient(180deg, #ffffff 0%, ${Th.goldSoft} 100%)`;
  const whiteTextNormal = Th.textLight;

  // Black Key styling
  const blackGradNormal = "linear-gradient(180deg, #383330 0%, #2a2725 90%, #221f1d 100%)";
  const blackGradActive = `linear-gradient(180deg, ${Th.goldDark} 0%, ${Th.gold} 100%)`;
  const blackBorder = `1px solid #1a1817`;

  return (
    <div data-keyboard="true" style={{
      background: bg, border: containerBorder, borderRadius: Th.radiusMd,
      padding: "16px 16px 20px", marginBottom: 16,
      boxShadow: "0 4px 16px rgba(44,40,37,0.04)"
    }}>
      {label && <div style={{ fontSize: 10, fontWeight: 600, color: labelColor, marginBottom: 12, letterSpacing: 2, fontFamily: Th.sans, textTransform: "uppercase", textAlign: "center" }}>{label}</div>}

      <div style={{ overflowX: "auto", WebkitOverflowScrolling: "touch", paddingBottom: 4, textAlign: "center" }}>
        <div style={{
          display: "inline-flex", position: "relative", height: 140, borderRadius: "0 0 5px 5px",
          border: keyBedBorder, background: keyBedBg, margin: "0 auto", textAlign: "left",
          padding: "0 2px 3px", boxShadow: "inset 0 2px 4px rgba(0,0,0,0.08), 0 2px 8px rgba(0,0,0,0.05)"
        }}>
          {whiteKeys.map(({ note, index }) => {
            const isHighlight = isHighlighted(note);
            const isC = note.startsWith("C") && !note.startsWith("C#");
            const zone = zoneMap.find(z => index >= z.range[0] && index < z.range[1]);

            // Determine active/highlight visual state
            const visualStateBg = isHighlight
              ? whiteGradActive
              : (zone ? `${zone.color}20` : whiteGradNormal);

            const bottomBorder = isHighlight
              ? `3px solid ${Th.gold}`
              : (zone ? `4px solid ${zone.color}` : `1px solid #dcd6d0`);

            return (
              <div key={note} style={{ position: "relative", display: "flex" }}>
                <div onClick={() => playNote(note)} style={{
                  width: 44, height: "100%",
                  background: visualStateBg,
                  borderLeft: isC ? `2px solid #e8e3de` : `1px solid #efeae4`,
                  borderRight: `1px solid #efeae4`,
                  borderBottom: bottomBorder,
                  borderRadius: "0 0 4px 4px",
                  display: "flex", alignItems: "flex-end", justifyContent: "center",
                  paddingBottom: 10, cursor: "pointer", zIndex: 1,
                  boxShadow: isHighlight
                    ? `inset 0 -6px 16px ${Th.gold}15, 0 1px 3px rgba(0,0,0,0.05)`
                    : "inset 0 -2px 6px rgba(0,0,0,0.02), 0 1px 2px rgba(0,0,0,0.04)",
                  transition: "transform 0.1s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.1s, background 0.2s"
                }}
                  onPointerDown={e => { e.currentTarget.style.transform = "translateY(2px)"; e.currentTarget.style.background = whiteGradActive; }}
                  onPointerUp={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.background = visualStateBg; }}
                  onPointerLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.background = visualStateBg; }}
                >
                  <span style={{
                    fontSize: 10, fontWeight: isHighlight ? 700 : 600,
                    color: isHighlight ? Th.goldDark : whiteTextNormal,
                    fontFamily: Th.sans, letterSpacing: 0.5
                  }}>{note.replace('♭', 'b')}</span>
                </div>
              </div>
            );
          })}
          {blackKeys.map(({ note, index, afterWhite }) => {
            const isHighlight = isHighlighted(note);
            const left = (afterWhite + 1) * 44 - 15;
            const zone = zoneMap.find(z => index >= z.range[0] && index < z.range[1]);

            return (
              <div key={note} onClick={() => playNote(note)} style={{
                position: "absolute", left, top: 0, width: 30, height: 85,
                background: isHighlight ? blackGradActive : (zone ? zone.color : blackGradNormal),
                border: blackBorder,
                borderTop: "none",
                borderBottom: isHighlight ? `3px solid ${Th.gold}` : blackBorder,
                borderRadius: "0 0 4px 4px",
                zIndex: 2, cursor: "pointer",
                boxShadow: isHighlight
                  ? `0 4px 8px rgba(0,0,0,0.2), inset 0 -2px 4px rgba(255,255,255,0.08), 0 0 12px ${Th.gold}20`
                  : "0 3px 6px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.06), inset 0 -1px 2px rgba(0,0,0,0.4)",
                display: "flex", alignItems: "flex-end", justifyContent: "center",
                paddingBottom: 8, transition: "transform 0.1s cubic-bezier(0.4, 0, 0.2, 1), background 0.2s"
              }}
                onPointerDown={e => { e.currentTarget.style.transform = "translateY(2px)"; e.currentTarget.style.background = blackGradActive; }}
                onPointerUp={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.background = isHighlight ? blackGradActive : (zone ? zone.color : blackGradNormal); }}
                onPointerLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.background = isHighlight ? blackGradActive : (zone ? zone.color : blackGradNormal); }}
              >
                <span style={{ fontSize: 9, fontWeight: 700, color: "rgba(255,255,255,0.7)", fontFamily: Th.sans, letterSpacing: 0.5 }}>{note.replace('♭', 'b')}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
