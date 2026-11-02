#!/usr/bin/env bash
# Renders the HyperFrames compositions and encodes web-optimised video assets.
# Requirements: Node >= 22, FFmpeg, Chromium (bundled with the hyperframes CLI).
# Usage: npm run videos
set -euo pipefail
cd "$(dirname "$0")"
OUT=../public/videos
mkdir -p "$OUT"

# name  poster-second  web-width  crf(vp9)  crf(h264)
COMPS=(
  "hero-ambient 5.5 1600 40 30"
  "clinic-intro 4.9 1280 36 27"
)

for row in "${COMPS[@]}"; do
  read -r name poster width vp9 h264 <<<"$row"
  echo "▶ $name"
  mkdir -p "$name/assets"
  cp shared/* "$name/assets/"
  # minimal project files expected by the CLI
  [ -f "$name/meta.json" ] || echo "{\"id\":\"$name\",\"name\":\"$name\"}" > "$name/meta.json"
  (cd "$name" && npx --yes hyperframes@0.9.1 lint . && npx --yes hyperframes@0.9.1 render -q delivery -o "renders/master.mp4")

  src="$name/renders/master.mp4"
  # Web MP4 (H.264, broad compatibility, fast start, no audio)
  ffmpeg -y -loglevel error -i "$src" -an -vf "scale=${width}:-2:flags=lanczos" \
    -c:v libx264 -profile:v high -pix_fmt yuv420p -preset slow -crf "$h264" -movflags +faststart "$OUT/$name.mp4"
  # Web WebM (VP9, smaller for modern browsers)
  ffmpeg -y -loglevel error -i "$src" -an -vf "scale=${width}:-2:flags=lanczos" \
    -c:v libvpx-vp9 -b:v 0 -crf "$vp9" -row-mt 1 -deadline good -cpu-used 2 "$OUT/$name.webm"
  # Poster frame (shown before the video loads, on phones, and with reduced motion)
  ffmpeg -y -loglevel error -ss "$poster" -i "$src" -frames:v 1 -vf "scale=${width}:-2:flags=lanczos" -q:v 4 "$OUT/$name.jpg"
done

# Open Graph share image (1200x630) from the clinic intro wordmark frame
ffmpeg -y -loglevel error -ss 4.9 -i clinic-intro/renders/master.mp4 -frames:v 1 \
  -vf "scale=1200:-2:flags=lanczos,crop=1200:630" -q:v 3 ../public/og-image.jpg

ls -lh "$OUT" ../public/og-image.jpg
