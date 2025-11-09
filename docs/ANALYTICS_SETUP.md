# Analytics Integration Guide

## Overview

This guide covers how to add analytics to your portfolio to track visitors, page views, and user interactions.

## Recommended Solutions

### 1. Google Analytics 4 (GA4) - Free

**Pros:**
- Free and comprehensive
- Industry standard
- Detailed reports and insights
- Real-time data

**Cons:**
- Privacy concerns (cookies)
- GDPR compliance required
- Requires cookie consent banner

#### Setup:

1. **Create GA4 Property:**
   - Go to [Google Analytics](https://analytics.google.com/)
   - Create account and property
   - Get your Measurement ID (G-XXXXXXXXXX)

2. **Add to `.env`:**
   ```bash
   VITE_GA_MEASUREMENT_ID=G-XXXXXXXXXX
   ```

3. **Install Package:**
   ```bash
   pnpm add react-ga4
   ```

4. **Create Analytics Component** (`src/lib/analytics.js`):
   ```javascript
   import ReactGA from 'react-ga4';

   export const initGA = () => {
     const measurementId = import.meta.env.VITE_GA_MEASUREMENT_ID;
     if (measurementId) {
       ReactGA.initialize(measurementId);
     }
   };

   export const logPageView = () => {
     ReactGA.send({ hitType: 'pageview', page: window.location.pathname });
   };

   export const logEvent = (category, action, label) => {
     ReactGA.event({
       category,
       action,
       label,
     });
   };
   ```

5. **Initialize in `main.jsx`:**
   ```javascript
   import { initGA, logPageView } from './lib/analytics'

   // Initialize GA
   if (import.meta.env.PROD) {
     initGA()
     logPageView()
   }
   ```

6. **Track Custom Events:**
   ```javascript
   import { logEvent } from '@/lib/analytics'

   // Track CV download
   const downloadCV = () => {
     logEvent('User', 'Download CV', language)
     // ... rest of code
   }

   // Track contact form submission
   const onSubmit = async (data) => {
     logEvent('Contact', 'Form Submit', 'Contact Form')
     // ... rest of code
   }
   ```

---

### 2. Plausible Analytics - Privacy-Friendly (Recommended)

**Pros:**
- Privacy-focused (no cookies)
- GDPR compliant
- Lightweight (<1 KB)
- No cookie consent banner needed
- Beautiful, simple dashboard

**Cons:**
- Paid service ($9/month for 10K pageviews)
- Less detailed than GA4

#### Setup:

1. **Sign up:**
   - Go to [Plausible.io](https://plausible.io/)
   - Add your domain

2. **Add Script** to `index.html`:
   ```html
   <script
     defer
     data-domain="yourdomain.com"
     src="https://plausible.io/js/script.js"
   ></script>
   ```

3. **Track Custom Events** (Optional):
   ```html
   <script src="https://plausible.io/js/script.tagged-events.js"></script>
   ```

   ```javascript
   // Track custom events
   const downloadCV = () => {
     window.plausible('Download CV', { props: { language } })
     // ... rest of code
   }
   ```

---

### 3. Vercel Analytics - Simplest

**Pros:**
- Free on Vercel
- Zero configuration
- Privacy-friendly
- Built-in Web Vitals tracking

**Cons:**
- Only works on Vercel
- Basic features

#### Setup:

1. **Install:**
   ```bash
   pnpm add @vercel/analytics
   ```

2. **Add to `main.jsx`:**
   ```javascript
   import { Analytics } from '@vercel/analytics/react';

   createRoot(document.getElementById('root')).render(
     <StrictMode>
       <ErrorBoundary>
         <Suspense fallback={<LoadingFallback />}>
           <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
             <App />
             <Analytics />
           </ThemeProvider>
         </Suspense>
       </ErrorBoundary>
     </StrictMode>,
   )
   ```

That's it! Automatic tracking enabled.

---

## Comparison Table

| Feature | Google Analytics | Plausible | Vercel Analytics |
|---------|-----------------|-----------|------------------|
| Price | Free | $9/mo | Free (Vercel only) |
| Privacy | ⚠️ Cookies | ✅ No cookies | ✅ No cookies |
| GDPR | ⚠️ Requires consent | ✅ Compliant | ✅ Compliant |
| Weight | ~45 KB | <1 KB | <1 KB |
| Real-time | ✅ Yes | ✅ Yes | ✅ Yes |
| Custom Events | ✅ Yes | ✅ Yes | ❌ No |
| Dashboard | Complex | Simple | Basic |

---

## Privacy & GDPR

### If using Google Analytics:

1. **Add Cookie Consent Banner:**
   ```bash
   pnpm add react-cookie-consent
   ```

   ```javascript
   import CookieConsent from "react-cookie-consent";

   <CookieConsent
     location="bottom"
     buttonText="Accept"
     declineButtonText="Decline"
     enableDeclineButton
     onAccept={() => initGA()}
   >
     This website uses cookies to enhance the user experience.
   </CookieConsent>
   ```

2. **Update Privacy Policy:**
   - Add `/privacy-policy` page
   - Explain what data is collected
   - How to opt-out

### If using Plausible or Vercel:

No cookie consent needed! These are GDPR-compliant by default.

---

## Recommended Tracking Events

```javascript
// Navigation
logEvent('Navigation', 'Click', 'About Section')

// CV Download
logEvent('User Action', 'Download CV', language)

// Contact Form
logEvent('Contact', 'Form Submit', 'Success')
logEvent('Contact', 'Form Error', errorMessage)

// Social Links
logEvent('Social', 'Click', 'LinkedIn')

// Language Switch
logEvent('Settings', 'Language Change', newLanguage)

// Theme Toggle
logEvent('Settings', 'Theme Change', newTheme)

// Project Links
logEvent('Projects', 'External Link', projectName)
```

---

## Performance Considerations

1. **Load analytics asynchronously:**
   ```javascript
   useEffect(() => {
     if (import.meta.env.PROD) {
       // Load after initial render
       setTimeout(() => initGA(), 1000)
     }
   }, [])
   ```

2. **Only in production:**
   ```javascript
   if (import.meta.env.PROD) {
     // Analytics code
   }
   ```

3. **Use lighthouse to check impact:**
   ```bash
   npm install -g lighthouse
   lighthouse https://yourdomain.com
   ```

---

## Our Recommendation

For this portfolio, we recommend **Plausible Analytics** because:

1. ✅ Privacy-friendly (no cookies, no consent banner needed)
2. ✅ Lightweight (doesn't slow down page)
3. ✅ GDPR compliant out of the box
4. ✅ Simple, beautiful dashboard
5. ✅ Fair pricing ($9/mo)

**Quick Start:**
```html
<!-- Add to index.html -->
<script
  defer
  data-domain="yourdomain.com"
  src="https://plausible.io/js/script.js"
></script>
```

Done! That's all you need.

---

## Additional Resources

- [GA4 Setup Guide](https://support.google.com/analytics/answer/9304153)
- [Plausible Docs](https://plausible.io/docs)
- [Vercel Analytics](https://vercel.com/analytics)
- [GDPR Compliance](https://gdpr.eu/)
