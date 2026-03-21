// ─── DESIGN SYSTEM (sarahglassmusic.com) ────────────────────────────
let T = {
  bg: "#ffffff", bgSoft: "#fdfbf9", bgCard: "#ffffff",
  border: "#eae1d9", borderSoft: "#f5f0ec",
  textDark: "#2c2825", textMed: "#59534e", textLight: "#8c867f", textMuted: "#b8b2ab",
  gold: "#d4a373", goldDark: "#b58454", goldSoft: "#f9f3ec", goldMed: "#e8d1b7",
  success: "#7f9e88", successSoft: "#f0f5f2",
  warm: "#d97d54", warmSoft: "#f9f0ec",
  coral: "#d68383", coralSoft: "#f9f0f0",
  plum: "#9e829c", plumSoft: "#f5f0f4",
  slate: "#6b8e9f", slateSoft: "#f0f4f6",
  serif: "'Playfair Display',serif",
  sans: "'Lato',-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif",
  // Square corners to match her elegant layout
  radius: "2px",
  radiusMd: "6px",

  sm: "0 4px 12px rgba(44, 40, 37, 0.03)",
  md: "0 12px 32px rgba(44, 40, 37, 0.06), 0 4px 12px rgba(44, 40, 37, 0.02)",
};

// Helper for dynamic tinted backgrounds
T.getTint = (color, opacity = 0.03) => {
  if (!color) return T.bgSoft;
  // If color is hex, convert to rgba
  if (color.startsWith('#')) {
    const r = parseInt(color.slice(1, 3), 16);
    const g = parseInt(color.slice(3, 5), 16);
    const b = parseInt(color.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${opacity})`;
  }
  return color;
};

// Helper for dynamic tinted shadows
T.getShadow = (color, strength = 'sm') => {
  const opacity = strength === 'sm' ? 0.1 : 0.2;
  const blur = strength === 'sm' ? 12 : 32;
  const spread = strength === 'sm' ? 0 : 4;
  if (color && color.startsWith('#')) {
    const r = parseInt(color.slice(1, 3), 16);
    const g = parseInt(color.slice(3, 5), 16);
    const b = parseInt(color.slice(5, 7), 16);
    return `0 ${blur/3}px ${blur}px ${spread}px rgba(${r}, ${g}, ${b}, ${opacity})`;
  }
  return T[strength];
};

const LIGHT_THEME = { ...T };
const DARK_THEME = {
  ...T,
  bg: "#121212", bgSoft: "#1e1e1e", bgCard: "#181818",
  border: "#333333", borderSoft: "#222222",
  textDark: "#f5f5f5", textMed: "#cccccc", textLight: "#999999", textMuted: "#666666",
  goldSoft: "#3a2e22",
  successSoft: "#1e2b22",
  warmSoft: "#3b2216",
  coralSoft: "#3b1f1f",
  plumSoft: "#2e202d",
  slateSoft: "#1e2a30",
  sm: "0 4px 12px rgba(0,0,0,0.3)",
  md: "0 12px 32px rgba(0,0,0,0.5), 0 4px 12px rgba(0,0,0,0.2)",
};

let ACCENT_CONFIG = {}; // Will be initialized below

export function applyTheme(isDark) {
  Object.assign(T, isDark ? DARK_THEME : LIGHT_THEME);
  ACCENT_CONFIG.accent = { velocity: 1.0, pitchOffset: 0, label: "Accent", color: T.gold };
  ACCENT_CONFIG.normal = { velocity: 0.5, pitchOffset: 12, label: "Normal", color: T.textMed };
  ACCENT_CONFIG.ghost = { velocity: 0.2, pitchOffset: 12, label: "Ghost", color: T.textMuted };
  ACCENT_CONFIG.mute = { velocity: 0.0, pitchOffset: 0, label: "Mute", color: T.border };
}
// Initialize
applyTheme(false);

export { T, LIGHT_THEME, DARK_THEME, ACCENT_CONFIG };
