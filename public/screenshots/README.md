# PWA Screenshots Guide

This directory should contain screenshots of your portfolio for the PWA app listing.

## Required Screenshots

### Desktop Screenshot (Wide)
- **Filename:** `desktop.png`
- **Recommended Size:** 1280x720 or 1920x1080
- **Aspect Ratio:** 16:9
- **Purpose:** Shows your portfolio on desktop/laptop screens
- **Content:** Full homepage or key sections

### Mobile Screenshot (Narrow)
- **Filename:** `mobile.png`
- **Recommended Size:** 750x1334 or 1125x2436
- **Aspect Ratio:** 9:16 (portrait)
- **Purpose:** Shows your portfolio on mobile devices
- **Content:** Mobile-optimized view of homepage

## How to Capture Screenshots

### Option 1: Browser DevTools (Recommended)

**Desktop Screenshot:**
1. Open your portfolio in Chrome/Edge
2. Press F12 to open DevTools
3. Click "Toggle device toolbar" (Ctrl+Shift+M)
4. Select "Responsive" and set to 1280x720
5. Press Ctrl+Shift+P and type "Screenshot"
6. Select "Capture screenshot"
7. Save as `desktop.png` in this directory

**Mobile Screenshot:**
1. In DevTools device toolbar
2. Select "iPhone 12 Pro" or similar device
3. Set dimensions to 750x1334
4. Capture screenshot
5. Save as `mobile.png` in this directory

### Option 2: Built-in Tools

**macOS:**
```bash
# Full screen
Cmd + Shift + 3

# Selected area
Cmd + Shift + 4
```

**Windows:**
```bash
# Snipping Tool or
Win + Shift + S
```

**Linux:**
```bash
# GNOME Screenshot
gnome-screenshot

# Or Flameshot
flameshot gui
```

### Option 3: Online Services

1. **Screely** - https://screely.com/
   - Add beautiful mockups to screenshots
   - Automatic device frames

2. **Smartmockups** - https://smartmockups.com/
   - Professional device mockups
   - Various devices and angles

3. **Shots** - https://shots.so/
   - Clean, minimal screenshot presentation

## Screenshot Guidelines

### Best Practices

1. **Clean UI:**
   - No browser toolbars or notifications
   - Hide personal bookmarks
   - Use incognito mode

2. **Content:**
   - Show your best sections
   - Include hero section with your name
   - Display key projects or skills
   - Ensure text is readable

3. **Quality:**
   - High resolution (at least 720p)
   - Sharp, not blurry
   - Good lighting/contrast
   - Representative of actual site

4. **Consistency:**
   - Same content shown in both screenshots
   - Matching color scheme
   - Same language (preferably English for wider audience)

### What to Include

**Desktop Screenshot Should Show:**
- Navigation bar
- Hero section with your name and title
- At least 2-3 sections (About, Projects, Skills)
- Professional, complete layout

**Mobile Screenshot Should Show:**
- Mobile-optimized navigation
- Hero section
- Vertical scroll showing multiple sections
- Readable text and clear CTAs

## Image Optimization

After capturing, optimize your screenshots:

```bash
# Using ImageMagick
convert desktop.png -quality 85 -resize 1280x720 desktop.png
convert mobile.png -quality 85 -resize 750x1334 mobile.png

# Using TinyPNG (online)
# Visit: https://tinypng.com/
# Drag and drop your screenshots
```

## Testing

### View in Manifest
1. Open your portfolio in Chrome
2. Open DevTools (F12)
3. Go to Application → Manifest
4. Scroll to "Screenshots" section
5. Verify both images load correctly

### App Installation Preview
On Android devices:
1. Visit your portfolio in Chrome
2. Menu → "Install app"
3. Screenshots should appear in installation dialog

## Common Issues

**Screenshots not showing in install prompt:**
- Check file paths in manifest.json
- Verify files exist in public/screenshots/
- Ensure correct dimensions (16:9 and 9:16)
- Check HTTPS is enabled

**Images too large:**
- Compress using TinyPNG or ImageOptim
- Target: < 500KB per screenshot
- Don't sacrifice quality for size

**Wrong aspect ratio:**
- Desktop must be landscape (wider than tall)
- Mobile must be portrait (taller than wide)
- Use exact dimensions specified above

## Quick Capture Script

Create a script to automate screenshot capture:

```javascript
// screenshot.js - Run in browser console
async function captureScreenshot() {
  const element = document.body;
  const canvas = await html2canvas(element);
  const link = document.createElement('a');
  link.download = 'screenshot.png';
  link.href = canvas.toDataURL();
  link.click();
}

// Include html2canvas library first:
// <script src="https://html2canvas.hertzen.com/dist/html2canvas.min.js"></script>
```

## Example Filenames (Optional Additional Screenshots)

If you want to add more screenshots for app store listings:

- `desktop-home.png` - Homepage
- `desktop-projects.png` - Projects section
- `mobile-home.png` - Mobile homepage
- `mobile-contact.png` - Mobile contact form
- `tablet.png` - Tablet view (optional)

## Resources

- [PWA Screenshot Guidelines](https://web.dev/add-manifest/#screenshots)
- [Chrome Web Store Image Guidelines](https://developer.chrome.com/docs/webstore/images/)
- [App Screenshot Best Practices](https://www.appmysite.com/blog/app-store-screenshots-best-practices/)

---

**Current Status:** ⚠️ Screenshots not yet created - Please capture screenshots using one of the methods above!
