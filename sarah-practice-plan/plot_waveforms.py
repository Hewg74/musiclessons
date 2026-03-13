import matplotlib.pyplot as plt
import librosa
import librosa.display
import os

sounds_dir = "public/sounds"
files = [f for f in os.listdir(sounds_dir) if f.endswith('.mp3')]

fig, axs = plt.subplots(len(files), 1, figsize=(10, 2 * len(files)))

for i, f in enumerate(files):
    filepath = os.path.join(sounds_dir, f)
    y, sr = librosa.load(filepath, sr=None)
    librosa.display.waveshow(y, sr=sr, ax=axs[i])
    axs[i].set_title(f"Waveform: {f}")
    axs[i].set_xlabel("Time (s)")
    axs[i].set_ylabel("Amplitude")

plt.tight_layout()
plt.savefig("waveforms.png")
print("Saved waveforms.png")
