import React, { useState } from 'react';
import { T } from '../theme.js';

export const TAB_CONTENT = {
  soldelsur: `
Sol Del Sur - Sun Room
Standard Tuning

[Intro / Main Lead Riff]
E |---12--12--9-7-9-------------------|
B |-------------------5-7-------------|
G |-----------------------------------|
D |-----------------------------------|
A |-----------------------------------|
E |-----------------------------------|

[Rhythm Chords]
The main chord progression throughout the song is:
C#m  ->  B  ->  F#  ->  E

[Verse 1]
C#m                  B
I once heard
F#                   E
'Bout a place
C#m                  B
I want to go but there ain't steps you can retrace
F#                   E

[Verse 2]
C#m                  B
Somewhere south
F#                   E
Far away
C#m                  B
I heard the sun don't leave
F#                   E

[Chorus]
C#m    B     F#    E
It stays
And it shines
All day
All the time
Sol del Sur

[Bridge/Lead Section]
(Play the main lead riff while rhythm plays C#m B F# E)

[Verse 3]
C#m                  B
Miles from here
F#                   E
The waters blue
C#m                  B
I want to go there but the way I never knew
F#                   E

[Verse 2]
C#m                  B
Somewhere south
F#                   E
Far away
C#m                  B
I heard the sun don't leave
F#                   E

[Chorus]
C#m    B     F#    E
It stays
And it shines
All day
All the time
Sol del Sur

(Play slow and precise. Accuracy over speed. Rhythm is syncopated.)
  `,
  iltwyw: `
I Like The Way You Walk - The Donkeys
Key syncopation note: The last word of each line falls BETWEEN beats.

[Verse 1]
I like the way that you... [walk]
And all the things that you... [do]
You like honey... [dew]
Those bees are all around... [you]

[Verse 2]
You wrote a Brautigan... [letter]
Taped it on the... [mirror]
You cannot drive a... [shifter]
But you can always... [steer]

[Verse 3]
I like the way that you... [talk]
And all the things that you... [do]
You do like honey... [do]
Those bees are all around... [you]

[Outro]
There's a house on the... [hill]
I bought a Coupe de... [Ville]
We'll get out on that... [road]
With you I'm always... [home]
Ooh...

[Chorus]
'Cause I love you with all my... [heart]
Love you with all my... [heart]
Love you with all my... [heart]
Love you with all my... [heart]

(Nod on the metronome clicks, sing the bracketed words on the UP-nod.)
  `
};

export default function OfflineTabs({ theme: T }) {
  const [activeTab, setActiveTab] = useState('sol');

  return (
    <div>
      <div style={{ display: 'flex', gap: 10, marginBottom: 16 }}>
        <button onClick={() => setActiveTab('sol')} style={{
          background: activeTab === 'sol' ? T.gold : T.bgCard,
          color: activeTab === 'sol' ? '#fff' : T.textMed,
          border: `1px solid ${T.border}`, padding: '8px 16px', borderRadius: T.radius, cursor: 'pointer'
        }}>Sol Del Sur</button>
        <button onClick={() => setActiveTab('iltwyw')} style={{
          background: activeTab === 'iltwyw' ? T.gold : T.bgCard,
          color: activeTab === 'iltwyw' ? '#fff' : T.textMed,
          border: `1px solid ${T.border}`, padding: '8px 16px', borderRadius: T.radius, cursor: 'pointer'
        }}>I Like The Way You Walk</button>
      </div>
      <pre style={{
        background: T.bgSoft, padding: 16, border: `1px solid ${T.border}`,
        borderRadius: T.radius, overflowX: 'auto', fontFamily: 'monospace', fontSize: 13,
        color: T.textDark, lineHeight: 1.5
      }}>
        {activeTab === 'sol' ? TAB_CONTENT.soldelsur.trim() : TAB_CONTENT.iltwyw.trim()}
      </pre>
    </div>
  );
}
