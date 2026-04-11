#!/usr/bin/env bash
# Regenerate assets/audio/reethigowla.mp3 from the credited YouTube recording
# (MedicoVita / TheVedicMedic — same video linked in the footer).
#
# Usage:
#   ./scripts/extract-ambient-audio.sh [START_SEC] [DURATION_SEC]
# Defaults: 00:48–2:10 (48s → 130s = 82s).
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
URL="https://www.youtube.com/watch?v=hDZ9g1E2qgg"
START_SEC="${1:-48}"
DURATION="${2:-82}"
END_SEC=$((START_SEC + DURATION))
AUDIO_DIR="$ROOT/assets/audio"
TMP_BASE="$AUDIO_DIR/reethigowla_dl"

cd "$AUDIO_DIR"
rm -f reethigowla_dl.*

yt-dlp -x --audio-format mp3 --audio-quality 2 \
  --download-sections "*${START_SEC}-${END_SEC}" \
  -o "reethigowla_dl.%(ext)s" --force-overwrites "$URL"

DL="$(ls -1 reethigowla_dl.* 2>/dev/null | head -1)"
test -n "$DL"
ffmpeg -y -i "$DL" -t "$DURATION" -c:a libmp3lame -q:a 2 reethigowla.mp3
rm -f reethigowla_dl.*
echo "Wrote $AUDIO_DIR/reethigowla.mp3 (${DURATION}s from source t=${START_SEC}s)"
