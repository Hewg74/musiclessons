import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Plus, Trash2, Upload } from 'lucide-react';
import { T } from '../theme.js';
import { validateAndSanitizeChart } from './chartHelpers.js';

// ─── Chart List View ────────────────────────────────────────────────────────
export function ChartListView({ theme: T, onSelect, onNew }) {
  const [charts, setCharts] = useState([]);
  const [showImport, setShowImport] = useState(false);
  const [importText, setImportText] = useState("");
  const [importError, setImportError] = useState("");
  const [deleteToast, setDeleteToast] = useState(null); // { id, chart, timer }
  const deleteToastRef = useRef(null);

  useEffect(() => {
    try {
      const all = JSON.parse(localStorage.getItem("strumCharts") || "{}");
      const list = Object.values(all).sort((a, b) => (b.updatedAt || 0) - (a.updatedAt || 0));
      setCharts(list);
    } catch { setCharts([]); }
  }, []);

  // Commit a pending delete (actually remove from localStorage)
  const commitDelete = useCallback((id) => {
    try {
      const all = JSON.parse(localStorage.getItem("strumCharts") || "{}");
      delete all[id];
      localStorage.setItem("strumCharts", JSON.stringify(all));
    } catch { }
  }, []);

  const deleteChart = (id) => {
    // If there's already a pending delete, commit it first
    if (deleteToastRef.current) {
      commitDelete(deleteToastRef.current.id);
      clearTimeout(deleteToastRef.current.timer);
    }

    const deletedChart = charts.find(c => c.id === id);
    // Remove from visible list immediately
    setCharts(prev => prev.filter(c => c.id !== id));

    // Set up undo toast with 5s timer
    const timer = setTimeout(() => {
      commitDelete(id);
      setDeleteToast(null);
      deleteToastRef.current = null;
    }, 5000);

    const toast = { id, chart: deletedChart, timer };
    setDeleteToast(toast);
    deleteToastRef.current = toast;
  };

  const undoDelete = () => {
    if (!deleteToastRef.current) return;
    clearTimeout(deleteToastRef.current.timer);
    const restored = deleteToastRef.current.chart;
    if (restored) {
      setCharts(prev => [restored, ...prev].sort((a, b) => (b.updatedAt || 0) - (a.updatedAt || 0)));
    }
    setDeleteToast(null);
    deleteToastRef.current = null;
  };

  const handleImport = () => {
    setImportError("");
    if (importText.length > 500000) { setImportError("JSON too large — max 500KB"); return; }
    let obj;
    try { obj = JSON.parse(importText); } catch { setImportError("Invalid JSON — could not parse"); return; }
    const result = validateAndSanitizeChart(obj);
    if (result.error) { setImportError(result.error); return; }
    try {
      const all = JSON.parse(localStorage.getItem("strumCharts") || "{}");
      all[result.chart.id] = result.chart;
      localStorage.setItem("strumCharts", JSON.stringify(all));
      setShowImport(false);
      setImportText("");
      onSelect(result.chart);
    } catch { setImportError("Failed to save — localStorage may be full"); }
  };

  const getPreview = (chart) => {
    const n = chart.measures?.length || 0;
    const bpm = chart.bpm || 80;
    const sections = [...new Set((chart.measures || []).map(m => m.sectionLabel).filter(Boolean))];
    const sectionStr = sections.length ? sections.join(", ") : "";
    return `${bpm} BPM · ${n} measure${n !== 1 ? "s" : ""}${sectionStr ? " · " + sectionStr : ""}`;
  };

  return (
    <div>
      <button onClick={onNew} style={{
        width: "100%", padding: "16px", background: T.getTint(T.gold, 0.05),
        border: `1px dashed ${T.gold}60`, borderRadius: T.radiusMd, cursor: "pointer",
        color: T.gold, fontSize: 13, fontFamily: T.sans, fontWeight: 700, marginBottom: 8,
        display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
      }}><Plus size={16} /> New Chart</button>

      <button onClick={() => { setShowImport(!showImport); setImportError(""); }} style={{
        width: "100%", padding: "12px", background: showImport ? T.getTint(T.gold, 0.08) : "transparent",
        border: `1px dashed ${T.border}`, borderRadius: T.radiusMd, cursor: "pointer",
        color: T.textMed, fontSize: 12, fontFamily: T.sans, fontWeight: 600, marginBottom: 16,
        display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
        transition: "all 0.15s",
      }}><Upload size={14} /> Import Chart</button>

      {showImport && (
        <div style={{
          marginBottom: 16, padding: "16px", background: T.bgCard,
          border: `1px solid ${T.border}`, borderRadius: T.radiusMd,
          boxShadow: "0 2px 8px rgba(44,40,37,0.03)",
        }}>
          <div style={{ fontSize: 11, color: T.textMed, fontFamily: T.sans, fontWeight: 600, marginBottom: 8, textTransform: "uppercase", letterSpacing: 1 }}>
            Paste chart JSON
          </div>
          <textarea
            value={importText}
            onChange={e => { setImportText(e.target.value); setImportError(""); }}
            placeholder='{"title":"My Chart","bpm":100,"measures":[...]}'
            style={{
              width: "100%", minHeight: 100, padding: "10px 12px", fontSize: 12, fontFamily: "'Courier New', monospace",
              background: T.bgSoft, border: `1px solid ${T.border}`, borderRadius: T.radius,
              color: T.textDark, resize: "vertical", outline: "none", boxSizing: "border-box",
            }}
          />
          {importError && (
            <div style={{ fontSize: 11, color: T.coral, fontFamily: T.sans, fontWeight: 600, marginTop: 6 }}>
              {importError}
            </div>
          )}
          <div style={{ display: "flex", gap: 8, marginTop: 10 }}>
            <button onClick={handleImport} style={{
              flex: 1, padding: "10px", fontSize: 11, fontWeight: 700, fontFamily: T.sans,
              background: T.gold, color: "#fff", border: "none", borderRadius: T.radius,
              cursor: "pointer", textTransform: "uppercase", letterSpacing: 1,
            }}>Load Chart</button>
            <button onClick={() => { setShowImport(false); setImportText(""); setImportError(""); }} style={{
              padding: "10px 16px", fontSize: 11, fontWeight: 600, fontFamily: T.sans,
              background: "transparent", color: T.textMed, border: `1px solid ${T.border}`,
              borderRadius: T.radius, cursor: "pointer",
            }}>Cancel</button>
          </div>
        </div>
      )}

      {charts.length === 0 && !showImport && (
        <div style={{
          textAlign: "center", padding: "40px 20px", color: T.textLight,
          fontFamily: T.serif, fontStyle: "italic", fontSize: 14,
        }}>
          No charts yet — create your first one!
        </div>
      )}

      {charts.map(ch => (
        <div key={ch.id} onClick={() => onSelect(ch)} style={{
          padding: "16px 20px", background: T.bgCard, border: `1px solid ${T.border}`,
          borderRadius: T.radiusMd, marginBottom: 8, cursor: "pointer",
          transition: "box-shadow 0.15s",
        }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <div style={{
                fontSize: 15, fontFamily: T.serif, fontWeight: 600, color: T.textDark,
                marginBottom: 4,
              }}>{ch.title || "Untitled Chart"}</div>
              <div style={{ fontSize: 11, color: T.textLight, fontFamily: T.sans }}>
                {getPreview(ch)} · {ch.measures?.length || 0} measure{(ch.measures?.length || 0) !== 1 ? "s" : ""}
              </div>
              <div style={{ fontSize: 9, color: T.textMuted, fontFamily: T.sans, marginTop: 4 }}>
                {ch.updatedAt ? new Date(ch.updatedAt).toLocaleDateString() : ""}
              </div>
            </div>
            <button onClick={e => { e.stopPropagation(); deleteChart(ch.id); }} style={{
              background: "none", border: "none", cursor: "pointer", color: T.textMuted, padding: 8,
            }}><Trash2 size={14} /></button>
          </div>
        </div>
      ))}

      {/* Delete undo toast */}
      {deleteToast && (
        <div style={{
          position: "fixed", bottom: 80, left: "50%", transform: "translateX(-50%)",
          background: T.textDark, color: "#fff", padding: "10px 20px", borderRadius: T.radiusMd,
          fontSize: 12, fontFamily: T.sans, display: "flex", gap: 12, alignItems: "center",
          zIndex: 999, boxShadow: T.md,
        }}>
          <span>Chart deleted</span>
          <button onClick={undoDelete} style={{
            background: T.gold, color: "#fff", border: "none", padding: "4px 12px",
            borderRadius: T.radius, cursor: "pointer", fontSize: 11, fontWeight: 700,
          }}>Undo</button>
        </div>
      )}
    </div>
  );
}

export default ChartListView;
