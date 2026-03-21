export const ALL_NOTES = [
  "C2", "C#2", "D2", "E♭2", "E2", "F2", "F#2", "G2", "A♭2", "A2", "B♭2", "B2",
  "C3", "C#3", "D3", "E♭3", "E3", "F3", "F#3", "G3", "A♭3", "A3", "B♭3", "B3",
  "C4", "C#4", "D4", "E♭4", "E4", "F4", "F#4", "G4", "A♭4", "A4", "B♭4", "B4", "C5"
];

export function getPitchRange(startNote, endNote) {
  const start = ALL_NOTES.indexOf(startNote);
  const end = ALL_NOTES.indexOf(endNote);
  if (start === -1 || end === -1) return [startNote, endNote];

  const range = [];
  if (start <= end) {
    for (let i = start; i <= end; i++) range.push(ALL_NOTES[i]);
  } else {
    for (let i = start; i >= end; i--) range.push(ALL_NOTES[i]);
  }
  return range;
}
