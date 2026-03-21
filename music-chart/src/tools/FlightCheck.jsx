import React, { useState } from 'react';
import { T } from '../theme.js';

export default function FlightCheck({ theme: T }) {
  const [status, setStatus] = useState('idle');
  const [results, setResults] = useState([]);

  const expectedAssets = [
    '/index.html',
    '/surf-rock-120.mp3',
    '/groove-beat-90.mp3',
    '/sol-del-sur.mp3',
    '/iltwyw.mp3'
  ];

  const checkCaches = async () => {
    setStatus('checking');
    try {
      const cacheNames = await window.caches.keys();
      const logs = [];

      for (const asset of expectedAssets) {
        let found = false;
        for (const cName of cacheNames) {
          const cache = await window.caches.open(cName);
          // Check for exact match or matching pathname (ignores domain)
          const keys = await cache.keys();
          const match = keys.find(req => {
            try {
              const url = new URL(req.url);
              return url.pathname === asset || url.pathname === `/sarah-practice-plan${asset}`;
            } catch {
              return req.url.includes(asset);
            }
          });

          if (match) {
            found = true;
            break;
          }
        }
        logs.push({ asset, found });
      }
      setResults(logs);
      setStatus('done');
    } catch (e) {
      console.error(e);
      setStatus('error');
    }
  };

  return (
    <div>
      <p style={{ fontSize: 14, color: T.textMed, marginBottom: 16 }}>
        Verify that all media is successfully cached by the Service Worker before going off-grid.
      </p>
      <button
        onClick={checkCaches}
        style={{
          background: T.gold, color: '#fff', border: 'none', padding: '10px 20px',
          borderRadius: T.radius, cursor: 'pointer', fontFamily: T.sans, fontWeight: 600,
          textTransform: 'uppercase', letterSpacing: 1, marginBottom: 16
        }}
      >
        {status === 'checking' ? 'Checking...' : 'Run Diagnostics'}
      </button>

      {status === 'done' && (
        <div style={{ marginTop: 12 }}>
          {results.map((r, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', marginBottom: 8, fontSize: 14 }}>
              <span style={{ color: r.found ? T.success : T.coral, marginRight: 10, fontSize: 18 }}>
                {r.found ? '\u2705' : '\u274C'}
              </span>
              <span style={{ fontFamily: 'monospace', color: r.found ? T.textMed : T.coral }}>
                {r.asset}
              </span>
            </div>
          ))}
          {results.some(r => !r.found) && (
            <div style={{ marginTop: 12, fontSize: 12, color: T.coral }}>
              Warning: Some assets are missing! Ensure you have placed the files in the public folder and refreshed the app while online.
            </div>
          )}
        </div>
      )}
    </div>
  );
}
