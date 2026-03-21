// ─── Web Worker timer for background-safe intervals ───────────────────
// Browser throttles setInterval to ~1Hz in background tabs.
// Web Worker timers are NOT throttled, so drone cycle mode stays accurate.
export function createTimerWorker() {
  const blob = new Blob([`
    let tid = null;
    self.onmessage = (e) => {
      if (e.data.cmd === 'start') { clearInterval(tid); tid = setInterval(() => self.postMessage('tick'), e.data.ms); }
      else if (e.data.cmd === 'stop') { clearInterval(tid); tid = null; }
      else if (e.data.cmd === 'update') { clearInterval(tid); tid = setInterval(() => self.postMessage('tick'), e.data.ms); }
    };
  `], { type: 'application/javascript' });
  const url = URL.createObjectURL(blob);
  const worker = new Worker(url);
  worker._blobUrl = url;
  return worker;
}

export function terminateWorker(worker) {
  if (!worker) return;
  URL.revokeObjectURL(worker._blobUrl);
  worker.terminate();
}
