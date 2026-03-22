#!/bin/bash
# Gemini Song Analysis Script
# Analyzes YouTube videos one at a time for maximum quality

GEMINI_API_KEY="${GEMINI_API_KEY:-AIzaSyBEw_oa2GYPx1aKWUFtjGzXD5z2pAu4H-U}"
MODEL="gemini-3.1-pro-preview"
OUTPUT_FILE="tasks/gemini-song-analysis-results.md"

# The analysis prompt (same for all songs)
read -r -d '' PROMPT_TEMPLATE << 'PROMPT_EOF'
You are a music analysis AI helping build a personalized guitar curriculum. Listen to this song's audio and extract detailed guitar technique information.

IMPORTANT RULES:
- The chords are ALREADY VERIFIED. Do NOT re-analyze chord names. Focus on HOW they're played.
- Mark every finding with confidence: HEARD (clear in audio), INFERRED (likely but not certain), UNCLEAR (can't determine).
- If the guitar is buried in the mix, say so. Don't guess.
- Describe techniques in beginner-friendly language.

SONG: %SONG_NAME%
ARTIST: %ARTIST%
VERIFIED CHORDS: %CHORDS%
%KNOWN_TECHNIQUES%

Analyze the audio and provide this EXACT format:

SONG: %SONG_NAME% — %ARTIST%
BPM: [count from audio] [HEARD/INFERRED]
KEY: [confirm if possible] [HEARD/INFERRED]

STRUM PATTERN: [describe precisely — e.g., D-DU-UDU, or words] [HEARD/INFERRED]
FEEL: [straight/swung/syncopated] [on-beat/behind-beat/ahead] [HEARD/INFERRED]
PICK ATTACK: [soft/medium/hard] [HEARD/INFERRED]
GHOST STRUMS: [yes/no, describe] [HEARD/INFERRED]

TONE: [clean/overdrive/fuzz] + [effects] [HEARD/INFERRED]
REVERB: [none/subtle/medium/drenched] [HEARD/INFERRED]
BRIGHTNESS: [dark-warm / neutral / bright-jangly] [HEARD/INFERRED]

VOICING STYLE: [open chords / partial barres / full barres / fingerpicked] [HEARD/INFERRED]
EMBELLISHMENTS: [hammer-ons, pull-offs, slides, sus additions, etc.] [HEARD/INFERRED]
OPEN STRINGS: [ringing open strings creating jangle?] [HEARD/INFERRED]

LEAD TECHNIQUES: [bends (half/whole/quarter-tone/pre-bend), slides, double stops, tremolo picking, harmonics] [HEARD/INFERRED/UNCLEAR]
VIBRATO: [speed/width, which notes] [HEARD/INFERRED/UNCLEAR]

TRANSITION STYLE: [how chords connect — slides, walks, hammer-ons, anticipation, beat 1 or pushed?] [HEARD/INFERRED]
BASS WALKS: [passing tones between chords?] [HEARD/INFERRED/UNCLEAR]
CHORD EMBELLISHMENT PATTERNS: [sus4 resolves, add9 lifts, 6th additions?] [HEARD/INFERRED/UNCLEAR]

PICK HAND: [pick/fingers/hybrid, angle, string emphasis] [HEARD/INFERRED]
MUTING: [palm mute depth, left-hand dead notes, chop style] [HEARD/INFERRED]
STACCATO VS LEGATO: [ringing out or chopped short?] [HEARD/INFERRED]

VERSE GUITAR: [what the guitar does in the verse]
CHORUS GUITAR: [what changes in the chorus]
BRIDGE/OTHER: [any other sections]
GUITAR DROPS: [does it drop out anywhere?]

SIGNATURE LICK: [recognizable riff or hook — describe notes/shape/fret positions if possible] [HEARD/INFERRED/UNCLEAR]
STANDOUT MOMENTS: [riffs, fills, solos, notable guitar moments]

TEACHING NOTES: [2-3 sentences on what a student should focus on to capture this song's feel — the "sauce" that makes it sound like itself rather than a chord chart]
PROMPT_EOF

# Song data: "name|artist|chords|youtube_url|known_techniques"
SONGS=(
  "Dope & Smoke|DOPE LEMON|Am, D, Am7, D7 (NO G chord)|https://www.youtube.com/watch?v=9OzmlCmTvc4|Known: Lo-fi, behind the beat, reverb-drenched. Major-minor oscillation trick."
  "Sol Del Sur|Sun Room|C#m-B-F# (verse), E-F# (chorus)|https://www.youtube.com/watch?v=2Q8T3l9g5DM|Known: Jazzmaster + Tubescreamer always-on, syncopated D-DU-DU strum with muted hits."
  "Breakdown|Jack Johnson|G-Bm-Em-D (verse), G-D/F#-Em-D (chorus), Capo 5|https://www.youtube.com/watch?v=Y4O7ufx9D_s|Known: Acoustic fingerpicking, Travis picking style, laid-back feel."
  "Friends|levitation room|Em-Dmaj7 (verse), A-Em (chorus)|https://www.youtube.com/watch?v=P-cJWkZLy0k|"
  "Gimme Love|The Elovaters|F-C-G|https://www.youtube.com/watch?v=NtF2NFyWq64|"
  "Jah Werx|SUSTO|B-F#-E|https://www.youtube.com/watch?v=TKd2TXAS2fE|"
  "Real Love Baby|Father John Misty|D-Em-G-A7|https://www.youtube.com/watch?v=XkJJPM4qGzE|"
  "Going Gets Tough|The Growlers|G-C-Cadd6 (intro), C-Em-D (pre), G-D-Em-C (chorus), Capo 1|https://www.youtube.com/watch?v=_fL0vu1VwKQ|Known: Garage-surf, lo-fi, reverb + grit."
  "Something About You|Eyedress|F-Em-Am-Dm (pattern: F-Em-F-Em-Am-Dm-Em)|https://www.youtube.com/watch?v=0VAAS9xnS5U|"
  "Marsha|Current Swell|Dm-C-G-F-Bb (verse), G-F-Bb-F-C then Bb-C-Dm (chorus)|https://www.youtube.com/watch?v=QAB7TpNGZ4g|"
  "Sunset Garage|Sun Room|G-Em-C-D|https://www.youtube.com/watch?v=NO32lcup-FA|Known: Jazzmaster + Tubescreamer always-on, syncopated strum."
  "I Didn't Know|Skinshape|Bbmaj7-F-G (intro), Gm-C-F-Bb / Gm-C-A7-Dm (verse)|https://www.youtube.com/watch?v=phpLi1e1904|Known: Heavy 7ths, drums-first process, dub influence."
  "Texas Sun|Khruangbin feat. Leon Bridges|Am-G (main), Em-Bm (bridge only)|https://www.youtube.com/watch?v=Whe7MURlKLw|Known: Strat with flatwound strings, 3-note voicings top 3 strings, parked wah, 60%+ silence, behind-the-beat."
  "Rules|Khruangbin|G-Am-F-G-Em-F-Em-Am|https://www.youtube.com/watch?v=rYF01U2FdKE|Known: Strat with flatwound strings, 3-note voicings top 3 strings, parked wah, 60%+ silence, behind-the-beat."
  "Peace Blossom Boogy|Babe Rainbow|D-G7 (main), A (solo only)|https://www.youtube.com/watch?v=p875E_kk50o|"
  "1999|NO CIGAR|E-B-F#-A|https://www.youtube.com/watch?v=T8bbX2ZTeh0|"
  "It's a Love|Baskervillain|E-A-C#m-F#-B|https://www.youtube.com/watch?v=iUsEKsxZV-s|"
  "Son of a Beach|The Polarity|F-G-C-Am|https://www.youtube.com/watch?v=5DGFKZK3LO0|"
  "Coastline|Hollow Coves|G-Bm-A (capo 2, original CGDGGD tuning)|https://www.youtube.com/watch?v=DAE1NbKstqk|"
)

# Initialize output file
cat > "$OUTPUT_FILE" << 'HEADER'
# Gemini Song Analysis Results

> Generated by Gemini 3.1 Pro Preview from YouTube audio analysis.
> Confidence tiers: **HEARD** = clear in audio | **INFERRED** = likely | **UNCLEAR** = can't determine
> Chords were pre-verified from Ultimate Guitar tabs — Gemini analyzed technique/feel only.

---

HEADER

echo "Starting analysis of ${#SONGS[@]} songs..."
echo ""

for i in "${!SONGS[@]}"; do
  IFS='|' read -r SONG_NAME ARTIST CHORDS URL KNOWN_TECH <<< "${SONGS[$i]}"

  SONG_NUM=$((i + 1))
  echo "[$SONG_NUM/${#SONGS[@]}] Analyzing: $SONG_NAME — $ARTIST"

  # Build the prompt with substitutions
  SONG_PROMPT="${PROMPT_TEMPLATE//%SONG_NAME%/$SONG_NAME}"
  SONG_PROMPT="${SONG_PROMPT//%ARTIST%/$ARTIST}"
  SONG_PROMPT="${SONG_PROMPT//%CHORDS%/$CHORDS}"
  if [ -n "$KNOWN_TECH" ]; then
    SONG_PROMPT="${SONG_PROMPT//%KNOWN_TECHNIQUES%/$KNOWN_TECH}"
  else
    SONG_PROMPT="${SONG_PROMPT//%KNOWN_TECHNIQUES%/No specific artist technique data available.}"
  fi

  # Escape for JSON
  ESCAPED_PROMPT=$(echo "$SONG_PROMPT" | python3 -c "import sys,json; print(json.dumps(sys.stdin.read()))")

  # Make API call
  RESPONSE=$(curl -s --max-time 300 \
    "https://generativelanguage.googleapis.com/v1beta/models/$MODEL:generateContent?key=$GEMINI_API_KEY" \
    -H "Content-Type: application/json" \
    -d "{
      \"contents\": [{
        \"parts\": [
          {
            \"fileData\": {
              \"fileUri\": \"$URL\",
              \"mimeType\": \"video/mp4\"
            }
          },
          {
            \"text\": $ESCAPED_PROMPT
          }
        ]
      }],
      \"generationConfig\": {
        \"maxOutputTokens\": 4096,
        \"temperature\": 0.2
      }
    }" 2>&1)

  # Extract text from response
  RESULT=$(echo "$RESPONSE" | python3 -c "
import sys, json
try:
    data = json.load(sys.stdin)
    if 'error' in data:
        print(f'ERROR: {data[\"error\"][\"message\"]}')
    elif 'candidates' in data:
        parts = data['candidates'][0]['content']['parts']
        print(''.join(p.get('text','') for p in parts))
    else:
        print('UNEXPECTED RESPONSE FORMAT')
        print(json.dumps(data, indent=2)[:500])
except Exception as e:
    print(f'PARSE ERROR: {e}')
" 2>&1)

  # Append to output file
  echo "" >> "$OUTPUT_FILE"
  echo "## $SONG_NUM. $SONG_NAME — $ARTIST" >> "$OUTPUT_FILE"
  echo "" >> "$OUTPUT_FILE"
  echo "$RESULT" >> "$OUTPUT_FILE"
  echo "" >> "$OUTPUT_FILE"
  echo "---" >> "$OUTPUT_FILE"

  echo "  ✓ Done"

  # Small delay to avoid rate limiting
  sleep 2
done

echo ""
echo "All songs analyzed. Results saved to $OUTPUT_FILE"
