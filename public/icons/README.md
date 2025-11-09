# PWA Icons Guide

This directory should contain app icons in various sizes for Progressive Web App (PWA) functionality.

## Required Icon Sizes

You need to generate the following icon sizes:

- **72x72** - Android notification icon
- **96x96** - Android launcher icon (low density)
- **128x128** - Chrome Web Store icon
- **144x144** - Android launcher icon (high density)
- **152x152** - iPad touch icon
- **192x192** - Android launcher icon (extra high density) ⭐ **Required**
- **384x384** - Android splash screen
- **512x512** - Progressive Web App icon ⭐ **Required**

## How to Generate Icons

### Option 1: Online Tools (Easiest)

1. **PWA Asset Generator** (Recommended)
   - Visit: https://www.pwabuilder.com/imageGenerator
   - Upload a square PNG image (at least 512x512px)
   - Download the generated icon pack
   - Extract all files to this directory

2. **Favicon Generator**
   - Visit: https://realfavicongenerator.net/
   - Upload your logo/icon
   - Configure for iOS and Android
   - Download and extract to this directory

3. **PWA Icon Generator**
   - Visit: https://progressier.com/pwa-icon-generator
   - Upload base image
   - Generate all sizes
   - Download and place here

### Option 2: Manual Creation

If you have Photoshop, GIMP, or Figma:

1. Create a base icon (1024x1024px recommended)
2. Export the following sizes:
   - 72x72 → `icon-72x72.png`
   - 96x96 → `icon-96x96.png`
   - 128x128 → `icon-128x128.png`
   - 144x144 → `icon-144x144.png`
   - 152x152 → `icon-152x152.png`
   - 192x192 → `icon-192x192.png`
   - 384x384 → `icon-384x384.png`
   - 512x512 → `icon-512x512.png`

### Option 3: Command Line (For Developers)

Using ImageMagick:

```bash
# Install ImageMagick (if not installed)
brew install imagemagick  # macOS
sudo apt install imagemagick  # Ubuntu

# Generate all sizes from a base icon
convert base-icon.png -resize 72x72 icon-72x72.png
convert base-icon.png -resize 96x96 icon-96x96.png
convert base-icon.png -resize 128x128 icon-128x128.png
convert base-icon.png -resize 144x144 icon-144x144.png
convert base-icon.png -resize 152x152 icon-152x152.png
convert base-icon.png -resize 192x192 icon-192x192.png
convert base-icon.png -resize 384x384 icon-384x384.png
convert base-icon.png -resize 512x512 icon-512x512.png
```

Using Sharp (Node.js):

```bash
# Create a script: generate-icons.js
npm install sharp

# Then run the script (see scripts/generate-icons.js)
node scripts/generate-icons.js
```

## Design Guidelines

### Best Practices

1. **Use Simple Designs**
   - Icons should be recognizable at small sizes
   - Avoid complex details that don't scale well
   - High contrast between foreground and background

2. **Safe Zone**
   - Keep important content within 80% of the icon area
   - Leave 10% padding on all sides for "maskable" icons

3. **Color Scheme**
   - Use your brand colors
   - Ensure good contrast
   - Consider dark mode users

4. **Format**
   - Use PNG format with transparency
   - Optimize file size (use TinyPNG or similar)
   - Ensure all icons are square (1:1 aspect ratio)

### Maskable Icons

For Android adaptive icons:
- 192x192 and 512x512 should be "maskable"
- Design should work when cropped into circle, squircle, or rounded square
- Keep important content in center 80% safe zone

## Testing Your Icons

### Desktop (Chrome/Edge)
1. Open DevTools (F12)
2. Go to Application → Manifest
3. Check if all icons load correctly
4. Click "Install" to test installation

### Mobile (Android)
1. Open your site in Chrome
2. Menu → "Install app" or "Add to Home Screen"
3. Check if icon appears correctly on home screen

### Mobile (iOS)
1. Open in Safari
2. Share → "Add to Home Screen"
3. Icon should appear on home screen

## Troubleshooting

**Icons not showing:**
- Check file paths in manifest.json
- Ensure files are in public/icons/ directory
- Verify file names match exactly (case-sensitive)

**Blurry icons:**
- Use higher resolution source image
- Ensure you're exporting at correct dimensions
- Don't upscale smaller images

**Installation not working:**
- Verify manifest.json is valid (use validator)
- Check that HTTPS is enabled (required for PWA)
- Ensure service worker is registered

## Quick Start Using Your Profile Image

If you want to use your existing profile photo:

```bash
# Copy your profile image
cp src/assets/mikail_lekesiz.png public/icons/base-icon.png

# Generate all sizes (using ImageMagick)
cd public/icons
for size in 72 96 128 144 152 192 384 512; do
  convert base-icon.png -resize ${size}x${size} icon-${size}x${size}.png
done
```

## Recommended Source Image

For best results, create a dedicated icon:
- **Size:** 1024x1024px or larger
- **Format:** PNG with transparency
- **Design:** Your initials "ML" or a logo representing you
- **Colors:** Match your portfolio theme (black/white)
- **Style:** Professional, minimalist, modern

Example design ideas:
- Monogram "ML" in bold typography
- Abstract geometric shape representing tech/development
- Simplified version of your logo
- Your professional headshot in circular crop

---

**Current Status:** ⚠️ Icons not yet generated - Please generate icons using one of the methods above!
