# Quick Image Optimization Guide

Since package installation is having issues, here's the **fastest way** to optimize your images:

## 🚀 Option 1: Online Tools (Recommended - 2 minutes)

### Using Squoosh.app (Google's free tool)

1. Go to **https://squoosh.app**
2. Drag `src/assets/mikail_lekesiz.png` (844 KB)
3. Select **WebP** format (right panel)
4. Set quality to **85%**
5. Download the optimized image
6. Save as `src/assets/mikail_lekesiz.webp`

**Expected result:** 844 KB → ~120 KB (85% smaller!)

### Using TinyPNG.com

1. Go to **https://tinypng.com**
2. Upload `src/assets/mikail_lekesiz.png`
3. Download compressed PNG
4. Optionally use Squoosh to convert to WebP

**Expected result:** 844 KB → ~250-300 KB (65% smaller)

---

## 📦 Option 2: Automated Script (When packages work)

The script is ready in `scripts/optimize-images.js`.

To use it later:

```bash
# Install dependencies (when pnpm is working)
pnpm install sharp glob --save-dev

# Run optimization
pnpm run optimize-images
```

This will:
- Convert all PNG/JPG to WebP
- Generate responsive sizes (320w, 640w, 960w, 1280w)
- Show size savings report

---

## 🖼️ Using WebP in Your App

The code is already prepared in `src/App.jsx` to use WebP images.

### Current code (line 300-308):
```jsx
<img
  src={profileImage}
  alt="Mikail Lekesiz - DevOps Engineer & Full Stack Developer"
  width="384"
  height="384"
  loading="lazy"
  decoding="async"
  className="..."
/>
```

### After optimization, update to:
```jsx
import profileImageWebP from './assets/mikail_lekesiz.webp'
import profileImage from './assets/mikail_lekesiz.png'

// Then use picture element:
<picture>
  <source srcSet={profileImageWebP} type="image/webp" />
  <img
    src={profileImage}
    alt="Mikail Lekesiz - DevOps Engineer & Full Stack Developer"
    width="384"
    height="384"
    loading="lazy"
    decoding="async"
    className="relative w-80 h-80 md:w-96 md:h-96 object-cover rounded-full border-4 border-gray-200 dark:border-gray-800 shadow-2xl"
  />
</picture>
```

This provides WebP for modern browsers, PNG fallback for older browsers.

---

## 📊 Expected Performance Impact

### Before:
- Image size: 844 KB
- Load time (3G): ~2 seconds
- Lighthouse score impact: -10 points

### After (WebP):
- Image size: ~120 KB
- Load time (3G): ~0.3 seconds
- Lighthouse score impact: +10 points

### Lighthouse improvements:
- **LCP (Largest Contentful Paint):** Faster by ~1.7s
- **Total Bundle Size:** -724 KB
- **Performance Score:** +10-15 points

---

## ✅ Recommended Action

1. **Now:** Use Squoosh.app to create WebP version (2 minutes)
2. **Now:** Update App.jsx to use picture element
3. **Later:** When packages work, run automated script

---

## 🎯 Quick Win Checklist

- [ ] Go to https://squoosh.app
- [ ] Upload `src/assets/mikail_lekesiz.png`
- [ ] Select WebP format, quality 85%
- [ ] Download as `mikail_lekesiz.webp`
- [ ] Save to `src/assets/`
- [ ] Update `src/App.jsx` import and img to picture element
- [ ] Test in browser
- [ ] Commit changes

**Time to complete:** 2-5 minutes
**Impact:** ~85% image size reduction, significant Lighthouse improvement

---

For automated optimization later, the script in `scripts/optimize-images.js` is ready to use when dependencies can be installed.
