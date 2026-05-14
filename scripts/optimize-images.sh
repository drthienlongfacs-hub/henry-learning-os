#!/bin/bash
# optimize-images.sh — Convert all PNG images to WebP for ~80% size reduction
# Usage: bash scripts/optimize-images.sh
# Safe: keeps original PNGs, creates .webp alongside

set -euo pipefail

IMAGE_DIR="public/images"
QUALITY=82  # Good balance between quality and size for educational content

echo "🖼️  Henry Learning OS — Image Optimization"
echo "==========================================="

# Count originals
total_png=$(find "$IMAGE_DIR" -name "*.png" | wc -l | tr -d ' ')
echo "📊 Found $total_png PNG files in $IMAGE_DIR"

# Get original size
original_size=$(du -sm "$IMAGE_DIR" | cut -f1)
echo "📦 Original size: ${original_size}MB"

converted=0
skipped=0
saved_bytes=0

find "$IMAGE_DIR" -name "*.png" | while read -r png; do
    webp="${png%.png}.webp"
    
    # Skip if already converted
    if [ -f "$webp" ]; then
        skipped=$((skipped + 1))
        continue
    fi
    
    # Convert
    if cwebp -q "$QUALITY" -quiet "$png" -o "$webp" 2>/dev/null; then
        png_size=$(stat -f%z "$png")
        webp_size=$(stat -f%z "$webp")
        savings=$(( (png_size - webp_size) * 100 / png_size ))
        echo "  ✅ $(basename "$png") → $(basename "$webp") (${savings}% smaller)"
        converted=$((converted + 1))
    else
        echo "  ⚠️  Failed: $(basename "$png")"
    fi
done

# Final report
new_size=$(du -sm "$IMAGE_DIR" | cut -f1)
echo ""
echo "📊 Results:"
echo "   Original: ${original_size}MB"
echo "   After:    ${new_size}MB (includes both PNG + WebP)"
echo "   WebP total: $(find "$IMAGE_DIR" -name "*.webp" -exec du -cm {} + | tail -1 | cut -f1)MB"
echo ""
echo "💡 Next step: Update image references in code from .png → .webp"
echo "   Then delete the original .png files to reclaim space."
