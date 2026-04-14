"""
One-drop pattern verification.

A true one-drop reggae pattern has:
- Kick drum ONLY on beat 3 of each bar (NOT beat 1)
- Rim/cross-stick on beat 3 (with kick)
- Hi-hat steady eighths/sixteenths

Detection logic:
1. Beat-track the file to align with tempo grid
2. Isolate the kick band (30-150 Hz)
3. For each beat position within a bar (1, 2, 3, 4), sum kick energy
4. A one-drop will show energy[beat3] >> energy[beat1,2,4]
5. A four-on-the-floor/rock pattern will show energy[beat1] >= energy[beat3]

Usage: python analyze-reggae-drums.py <file1.mp3> [file2.mp3 ...]
"""

import sys
import numpy as np
import librosa


def kick_band_energy(y, sr):
    S = np.abs(librosa.stft(y, n_fft=2048, hop_length=512))
    freqs = librosa.fft_frequencies(sr=sr, n_fft=2048)
    kick_mask = (freqs >= 40) & (freqs <= 120)
    kick_energy = S[kick_mask, :].sum(axis=0)
    return kick_energy


def analyze(path):
    print(f"\n=== {path} ===")
    y, sr = librosa.load(path, mono=True, offset=10.0, duration=60.0)

    tempo, beats = librosa.beat.beat_track(y=y, sr=sr, units="frames")
    tempo = float(tempo) if np.ndim(tempo) else tempo
    print(f"  Detected tempo: {tempo:.1f} BPM ({len(beats)} beats in 60s)")

    kick = kick_band_energy(y, sr)
    hop = 512
    beat_times = librosa.frames_to_time(beats, sr=sr, hop_length=hop)

    per_beat = []
    for i, b in enumerate(beats):
        start = b
        end = beats[i + 1] if i + 1 < len(beats) else b + int(sr * 0.5 / hop)
        per_beat.append(kick[start:end].sum())

    bar_len = 4
    n_bars = len(per_beat) // bar_len
    if n_bars < 4:
        print("  Not enough bars detected. Skipping.")
        return

    mat = np.array(per_beat[: n_bars * bar_len]).reshape(n_bars, bar_len)
    pos_avg = mat.mean(axis=0)
    pos_norm = pos_avg / pos_avg.max()

    print(f"  Kick energy by beat position (4 guess): 1={pos_norm[0]:.2f}  2={pos_norm[1]:.2f}  3={pos_norm[2]:.2f}  4={pos_norm[3]:.2f}")

    for offset in range(4):
        rotated = np.roll(pos_avg, -offset)
        rotated_norm = rotated / rotated.max()
        one_drop_score = rotated_norm[2] - max(rotated_norm[0], rotated_norm[1], rotated_norm[3])
        print(f"    shift {offset}: 1={rotated_norm[0]:.2f} 2={rotated_norm[1]:.2f} 3={rotated_norm[2]:.2f} 4={rotated_norm[3]:.2f}  one-drop score: {one_drop_score:+.2f}")

    best_shift = 0
    best_score = -999
    for offset in range(4):
        rotated = np.roll(pos_avg, -offset)
        rotated_norm = rotated / rotated.max()
        score = rotated_norm[2] - max(rotated_norm[0], rotated_norm[1], rotated_norm[3])
        if score > best_score:
            best_score = score
            best_shift = offset

    if best_score > 0.3:
        verdict = "TRUE one-drop (kick strongly favors beat 3)"
    elif best_score > 0.1:
        verdict = "Possible one-drop (beat 3 slightly favored)"
    elif best_score > -0.2:
        verdict = "Ambiguous (no clear one-drop pattern)"
    else:
        verdict = "NOT one-drop (kick does not favor beat 3)"

    print(f"  Verdict: {verdict}")
    print(f"  Best one-drop score: {best_score:+.2f} (values above +0.3 are clear one-drop)")


if __name__ == "__main__":
    for path in sys.argv[1:]:
        analyze(path)
