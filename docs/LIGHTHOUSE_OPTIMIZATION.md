# 🚦 Lighthouse Optimization Guide

This guide will help you achieve a Lighthouse score of 95+ across all categories.

## 📊 Target Scores

- **Performance:** 95-100
- **Accessibility:** 95-100
- **Best Practices:** 95-100
- **SEO:** 95-100
- **PWA:** 100 (if icons/screenshots are added)

## 🎯 How to Run Lighthouse

### Option 1: Chrome DevTools (Recommended)

1. **Open your portfolio** in Chrome
   - Use production URL (not localhost for accurate results)

2. **Open DevTools:** Press F12

3. **Go to Lighthouse tab**
   - Click "Lighthouse" (or "Audit" in older Chrome versions)

4. **Configure audit:**
   - ✅ Performance
   - ✅ Accessibility
   - ✅ Best Practices
   - ✅ SEO
   - ✅ Progressive Web App
   - Mode: "Navigation" (default)
   - Device: Desktop or Mobile

5. **Run audit:** Click "Analyze page load"

6. **Review results:** Check scores and recommendations

### Option 2: CLI (Advanced)

```bash
# Install Lighthouse globally
npm install -g lighthouse

# Run audit
lighthouse https://your-domain.com --output html --output-path ./lighthouse-report.html

# Open report
open lighthouse-report.html  # macOS
xdg-open lighthouse-report.html  # Linux
start lighthouse-report.html  # Windows
```

### Option 3: Web.dev Measure

1. Visit [web.dev/measure](https://web.dev/measure/)
2. Enter your URL
3. Run audit
4. Get detailed report with recommendations

## ✅ Already Optimized

Your portfolio already includes many optimizations:

### Performance ✅
- ✅ Lazy loading images with `loading="lazy"`
- ✅ Image dimensions specified (width/height)
- ✅ Scroll throttling (100ms)
- ✅ Code splitting (Vite automatic)
- ✅ Minified production build
- ✅ Tree-shaking enabled
- ✅ Efficient animations with Framer Motion

### Accessibility ✅
- ✅ Semantic HTML
- ✅ ARIA labels on buttons/links
- ✅ Proper heading hierarchy
- ✅ Sufficient color contrast (dark mode support)
- ✅ Keyboard navigation
- ✅ Screen reader friendly
- ✅ `prefers-reduced-motion` support

### SEO ✅
- ✅ Meta tags (title, description, keywords)
- ✅ Open Graph tags
- ✅ Twitter Cards
- ✅ Schema.org structured data
- ✅ robots.txt
- ✅ sitemap.xml
- ✅ Canonical URLs

### Best Practices ✅
- ✅ HTTPS (required in production)
- ✅ Error boundaries
- ✅ No console errors
- ✅ Modern image formats ready (WebP)

### PWA ✅
- ✅ Web App Manifest
- ✅ Installable
- ✅ iOS support
- ✅ App shortcuts
- ⏳ Icons (need to be generated)
- ⏳ Screenshots (need to be captured)

## 🔧 Additional Optimizations

### 1. Critical Resource Preloading

Already implemented in `index.html`, but you can add more:

```html
<!-- Preload critical fonts -->
<link rel="preload" href="/fonts/your-font.woff2" as="font" type="font/woff2" crossorigin>

<!-- Preconnect to external domains -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="dns-prefetch" href="https://analytics.example.com">
```

### 2. Font Optimization

If using custom fonts:

```css
/* Use font-display: swap for better performance */
@font-face {
  font-family: 'YourFont';
  src: url('/fonts/your-font.woff2') format('woff2');
  font-display: swap; /* Important! */
  font-weight: 400;
}
```

### 3. Image Optimization

**Generate WebP versions:**

```bash
# Run the image optimization script
npm run optimize-images

# Or manually with Sharp
npm install -g sharp-cli
sharp --input src/assets/*.png --output public/images/ --format webp --quality 85
```

**Use picture element for modern formats:**

```jsx
<picture>
  <source srcset="/images/photo.webp" type="image/webp" />
  <img src="/images/photo.jpg" alt="Description" loading="lazy" />
</picture>
```

### 4. Bundle Size Optimization

**Analyze bundle:**

```bash
# Build with visualization
npm run build -- --mode=analyze

# Or use vite-bundle-visualizer
npm install -D vite-bundle-visualizer
```

**Add to vite.config.js:**

```javascript
import { visualizer } from 'vite-bundle-visualizer'

export default defineConfig({
  plugins: [
    react(),
    visualizer({ open: true })
  ]
})
```

### 5. Code Splitting

Already automatic with Vite, but for lazy-loading components:

```javascript
// Instead of:
import HeavyComponent from './HeavyComponent'

// Use:
const HeavyComponent = lazy(() => import('./HeavyComponent'))

// Wrap in Suspense
<Suspense fallback={<LoadingFallback />}>
  <HeavyComponent />
</Suspense>
```

### 6. Remove Unused Dependencies

**Analyze:**

```bash
# Install depcheck
npm install -g depcheck

# Run analysis
depcheck

# Remove unused packages
npm uninstall <unused-package>
```

### 7. Optimize Tailwind CSS

Already optimized with purge in production, but verify:

```javascript
// tailwind.config.js
export default {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  // Tailwind will automatically purge unused styles
}
```

## 📱 Mobile Performance

### Reduce Main Thread Work

```javascript
// Use Web Workers for heavy computations
const worker = new Worker('/workers/heavy-task.js')

worker.postMessage({ data: largeDataset })
worker.onmessage = (e) => {
  console.log('Result:', e.data)
}
```

### Optimize Animations

```javascript
// Prefer transform and opacity (GPU-accelerated)
// ✅ Good
motion.div({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 }
})

// ❌ Avoid animating height, width, top, left
motion.div({
  animate: { height: 200 } // Causes layout recalculation
})
```

### Reduce JavaScript Execution Time

```javascript
// Debounce expensive operations
const debouncedSearch = useDebounce((query) => {
  // Expensive search operation
}, 500)

// Throttle scroll handlers (already implemented)
const throttledScroll = useThrottle(handleScroll, 100)
```

## 🎨 Accessibility Improvements

### Color Contrast

Ensure 4.5:1 ratio for normal text:

```javascript
// Check contrast ratios
// Tool: https://webaim.org/resources/contrastchecker/

// Example: Ensure links are distinguishable
<a className="text-blue-600 underline hover:text-blue-800">
  Link text
</a>
```

### Focus Indicators

```css
/* Ensure visible focus indicators */
button:focus-visible {
  outline: 2px solid #4F46E5;
  outline-offset: 2px;
}

/* Don't remove outlines without replacement */
/* ❌ BAD: outline: none; */
```

### Form Accessibility

```jsx
// Already implemented in ContactForm
<Label htmlFor="email">Email</Label>
<Input
  id="email"
  type="email"
  aria-describedby="email-error"
  aria-invalid={!!errors.email}
/>
{errors.email && (
  <p id="email-error" role="alert">
    {errors.email.message}
  </p>
)}
```

## 🔍 SEO Enhancements

### Canonical URLs

Update in `index.html`:

```html
<!-- Replace with your actual domain -->
<link rel="canonical" href="https://portfolio.lekesiz.fr/" />
```

### Structured Data Validation

```bash
# Test your structured data
# Tool: https://search.google.com/test/rich-results

# Or use Schema Markup Validator
# https://validator.schema.org/
```

### XML Sitemap

Update `public/sitemap.xml` with your domain:

```xml
<url>
  <loc>https://portfolio.lekesiz.fr/</loc>
  <lastmod>2025-11-06</lastmod>
  <changefreq>monthly</changefreq>
  <priority>1.0</priority>
</url>
```

## 🚀 Production Checklist

### Before Deployment

- [ ] Run `npm run build` successfully
- [ ] Test production build locally: `npm run preview`
- [ ] Verify no console errors
- [ ] Check all images load correctly
- [ ] Test all links work
- [ ] Verify contact form works
- [ ] Test on multiple browsers
- [ ] Test on mobile devices
- [ ] Generate PWA icons
- [ ] Capture PWA screenshots

### After Deployment

- [ ] Run Lighthouse audit
- [ ] Check scores (target: 95+)
- [ ] Verify HTTPS is enabled
- [ ] Test PWA installation
- [ ] Check sitemap is accessible: /sitemap.xml
- [ ] Verify robots.txt: /robots.txt
- [ ] Test analytics tracking
- [ ] Check email form backend

### Performance Monitoring

```javascript
// Add performance monitoring
if ('PerformanceObserver' in window) {
  const observer = new PerformanceObserver((list) => {
    for (const entry of list.getEntries()) {
      console.log('LCP:', entry.renderTime || entry.loadTime)
      // Send to analytics
      analytics.trackEvent('Web Vitals', {
        metric: 'LCP',
        value: entry.renderTime || entry.loadTime
      })
    }
  })

  observer.observe({ entryTypes: ['largest-contentful-paint'] })
}
```

## 📊 Lighthouse Score Breakdown

### Performance (Target: 95+)

**Metrics:**
- **FCP** (First Contentful Paint): < 1.8s
- **LCP** (Largest Contentful Paint): < 2.5s
- **TBT** (Total Blocking Time): < 200ms
- **CLS** (Cumulative Layout Shift): < 0.1
- **SI** (Speed Index): < 3.4s

**Tips to improve:**
- Reduce unused JavaScript
- Optimize images (WebP, proper sizing)
- Minimize main thread work
- Use code splitting
- Enable compression (gzip/brotli) on server

### Accessibility (Target: 100)

**Common issues:**
- Missing alt text on images
- Low color contrast
- Missing ARIA labels
- No focus indicators
- Missing form labels

**Already fixed in this portfolio! ✅**

### Best Practices (Target: 100)

**Requirements:**
- HTTPS enabled
- No browser errors
- Secure JavaScript libraries
- Proper image aspect ratios
- No deprecated APIs

**Should score 100 in production with HTTPS ✅**

### SEO (Target: 100)

**Requirements:**
- Meta description
- Valid robots.txt
- Viewport meta tag
- Legible font sizes
- Tap targets sized appropriately

**Already implemented! ✅**

### PWA (Target: 100)

**Requirements:**
- ✅ Web app manifest
- ✅ Service worker (optional, but beneficial)
- ✅ HTTPS
- ✅ Responsive design
- ✅ Works offline (optional)
- ⏳ Icons generated
- ⏳ Screenshots added

**Complete PWA setup to score 100!**

## 🐛 Common Issues & Fixes

### Issue: Low Performance Score

**Cause:** Large JavaScript bundle

**Fix:**
```bash
# Analyze bundle
npm run build
# Look for large dependencies
# Consider alternatives or lazy loading
```

### Issue: Images Slow to Load

**Cause:** Unoptimized images

**Fix:**
```bash
# Optimize all images
npm run optimize-images

# Or use online tools
# TinyPNG: https://tinypng.com/
# Squoosh: https://squoosh.app/
```

### Issue: Layout Shift (High CLS)

**Cause:** Missing width/height on images or dynamic content

**Fix:**
```jsx
// Always specify dimensions
<img
  src="/image.jpg"
  width="800"
  height="600"
  alt="Description"
/>

// Reserve space for dynamic content
<div style={{ minHeight: '200px' }}>
  {loading ? <Skeleton /> : <Content />}
</div>
```

### Issue: Accessibility Violations

**Cause:** Missing ARIA labels or alt text

**Fix:**
```jsx
// Add descriptive labels
<button aria-label="Open navigation menu">
  <MenuIcon />
</button>

// Add alt text to all images
<img src="/photo.jpg" alt="Person working on laptop" />
```

## 📈 Monitoring & Analytics

### Core Web Vitals Tracking

Add to your analytics:

```javascript
// src/lib/analytics.js
import { getCLS, getFID, getFCP, getLCP, getTTFB } from 'web-vitals'

export function initWebVitals() {
  getCLS(metric => analytics.trackEvent('CLS', { value: metric.value }))
  getFID(metric => analytics.trackEvent('FID', { value: metric.value }))
  getFCP(metric => analytics.trackEvent('FCP', { value: metric.value }))
  getLCP(metric => analytics.trackEvent('LCP', { value: metric.value }))
  getTTFB(metric => analytics.trackEvent('TTFB', { value: metric.value }))
}
```

### Install web-vitals:

```bash
npm install web-vitals
```

## 🎯 Final Checklist

### Critical (Must Have)
- [ ] Lighthouse Performance: 95+
- [ ] Lighthouse Accessibility: 100
- [ ] Lighthouse SEO: 100
- [ ] No console errors
- [ ] HTTPS enabled
- [ ] Mobile responsive
- [ ] Fast load time (< 3s)

### Important (Should Have)
- [ ] Lighthouse PWA: 100
- [ ] WebP images
- [ ] Lazy loading
- [ ] Code splitting
- [ ] Analytics tracking
- [ ] Error monitoring

### Nice to Have
- [ ] Service worker
- [ ] Offline support
- [ ] Push notifications
- [ ] App shortcuts
- [ ] Web Vitals tracking

## 📚 Resources

### Tools
- [Lighthouse](https://developers.google.com/web/tools/lighthouse)
- [WebPageTest](https://www.webpagetest.org/)
- [GTmetrix](https://gtmetrix.com/)
- [PageSpeed Insights](https://pagespeed.web.dev/)

### Learning
- [Web.dev Learn](https://web.dev/learn/)
- [MDN Performance](https://developer.mozilla.org/en-US/docs/Web/Performance)
- [Core Web Vitals](https://web.dev/vitals/)

### Testing
- [Contrast Checker](https://webaim.org/resources/contrastchecker/)
- [Schema Validator](https://validator.schema.org/)
- [SSL Test](https://www.ssllabs.com/ssltest/)

---

## 🎉 Expected Results

With all optimizations in place, you should achieve:

- **Performance:** 95-100
- **Accessibility:** 100
- **Best Practices:** 100
- **SEO:** 100
- **PWA:** 100 (after adding icons/screenshots)

**Total Time to Complete:** 30-60 minutes

Good luck! 🚀
