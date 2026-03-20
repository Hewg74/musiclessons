// Shared audio keepalive — prevents browser from suspending AudioContext in background tabs.
// Ref-counted: stays active while any audio feature (metronome, drone) is playing.
const SILENT_MP3 = "data:audio/mp3;base64,SUQzBAAAAAAAI1RTU0UAAAAPAAADTGF2ZjU4Ljc2LjEwMAAAAAAAAAAAAAAA//tQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAWGluZwAAAA8AAAACAAABhgC7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7//////////////////////////////////////////////////////////////////8AAAAATGF2YzU4LjEzAAAAAAAAAAAAAAAAJAAAAAAAAAAAAYYoRBqmAAAAAAD/+1DEAAAHAAGf9AAAIgAANIAAAAQAAANIAAAASEFNRTMuMTAwVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVf/7UMQbA8AAAaQAAAAgAAA0gAAABFVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVQ==";
let _keepaliveAudio = null;
let _keepaliveUsers = 0;

export function acquireKeepalive() {
  _keepaliveUsers++;
  if (_keepaliveAudio) return;
  try {
    _keepaliveAudio = new Audio(SILENT_MP3);
    _keepaliveAudio.loop = true;
    _keepaliveAudio.volume = 0.01;
    _keepaliveAudio.play().catch(() => {
      _keepaliveAudio = null;
      _keepaliveUsers = Math.max(0, _keepaliveUsers - 1);
    });
  } catch {
    _keepaliveAudio = null;
    _keepaliveUsers = Math.max(0, _keepaliveUsers - 1);
  }
}

export function releaseKeepalive() {
  _keepaliveUsers = Math.max(0, _keepaliveUsers - 1);
  if (_keepaliveUsers === 0 && _keepaliveAudio) {
    _keepaliveAudio.pause();
    _keepaliveAudio = null;
  }
}

// ─── Media Session helpers ────────────────────────────────────────────
export function setMediaSession(title, artist, handlers) {
  if (!('mediaSession' in navigator)) return;
  try {
    navigator.mediaSession.metadata = new MediaMetadata({ title, artist });
    if (handlers) {
      Object.entries(handlers).forEach(([action, handler]) => {
        navigator.mediaSession.setActionHandler(action, handler);
      });
    }
  } catch {}
}

export function clearMediaSession() {
  if (!('mediaSession' in navigator)) return;
  try { navigator.mediaSession.metadata = null; } catch {}
}
