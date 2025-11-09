# 🚀 Deployment Guide

This guide covers multiple deployment options for your portfolio.

## 🎯 Quick Deployment

### Option 1: Vercel (Recommended)

**Why Vercel?**
- ✅ Zero configuration
- ✅ Automatic HTTPS
- ✅ Global CDN
- ✅ Perfect for Vite projects
- ✅ Free for personal projects

**Deploy in 2 minutes:**

```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy
vercel

# Deploy to production
vercel --prod
```

**Or connect GitHub:**
1. Go to [vercel.com/new](https://vercel.com/new)
2. Import your GitHub repository
3. Click "Deploy"
4. Done! Auto-deploys on every push

### Option 2: Netlify

**Why Netlify?**
- ✅ Great for static sites
- ✅ Built-in form handling
- ✅ Excellent documentation
- ✅ Free SSL
- ✅ Generous free tier

**Deploy in 2 minutes:**

```bash
# Install Netlify CLI
npm i -g netlify-cli

# Login
netlify login

# Deploy
netlify deploy

# Deploy to production
netlify deploy --prod
```

**Or drag & drop:**
1. Run `npm run build`
2. Go to [app.netlify.com/drop](https://app.netlify.com/drop)
3. Drag the `dist/` folder
4. Done!

### Option 3: GitHub Pages

**Why GitHub Pages?**
- ✅ Free hosting
- ✅ Custom domain support
- ✅ Direct from repository
- ✅ No external accounts needed

**Setup:**

1. **Install gh-pages:**
   ```bash
   npm install -D gh-pages
   ```

2. **Add to package.json:**
   ```json
   {
     "scripts": {
       "deploy": "vite build && gh-pages -d dist"
     }
   }
   ```

3. **Update vite.config.js:**
   ```javascript
   export default defineConfig({
     base: '/repository-name/',  // Replace with your repo name
     // ...
   })
   ```

4. **Deploy:**
   ```bash
   npm run deploy
   ```

5. **Enable GitHub Pages:**
   - Repository Settings → Pages
   - Source: Deploy from branch
   - Branch: gh-pages
   - Save

---

## ⚙️ Automatic Deployment with GitHub Actions

Your repository now includes CI/CD workflows!

### Available Workflows

1. **CI (Continuous Integration)** - `.github/workflows/ci.yml`
   - Runs on every push
   - Lints code
   - Builds project
   - Runs Lighthouse audit (on PRs)
   - Analyzes bundle size

2. **Vercel Deployment** - `.github/workflows/deploy-vercel.yml`
   - Deploys to Vercel on push to main
   - Manual trigger available

3. **Netlify Deployment** - `.github/workflows/deploy-netlify.yml`
   - Deploys to Netlify on push to main
   - Creates preview for pull requests
   - Manual trigger available

### Setup GitHub Actions Deployment

#### For Vercel:

1. **Get Vercel credentials:**
   ```bash
   # Install and login
   npm i -g vercel
   vercel login

   # Link your project
   vercel link

   # Get your token
   vercel token create
   ```

2. **Find your IDs:**
   - After running `vercel link`, check `.vercel/project.json`
   - `orgId` → VERCEL_ORG_ID
   - `projectId` → VERCEL_PROJECT_ID

3. **Add secrets to GitHub:**
   - Go to repository Settings → Secrets and variables → Actions
   - Click "New repository secret"
   - Add:
     - `VERCEL_TOKEN`
     - `VERCEL_ORG_ID`
     - `VERCEL_PROJECT_ID`

4. **Push to main branch:**
   ```bash
   git push origin main
   ```

5. **Watch the magic!**
   - Go to Actions tab in GitHub
   - See your deployment in progress

#### For Netlify:

1. **Get Netlify credentials:**
   - Go to [app.netlify.com](https://app.netlify.com)
   - User Settings → Applications → Personal access tokens
   - Create new token → Copy it

2. **Get Site ID:**
   - Site settings → General → Site details
   - Copy "API ID"

3. **Add secrets to GitHub:**
   - Repository Settings → Secrets → Actions
   - Add:
     - `NETLIFY_AUTH_TOKEN`
     - `NETLIFY_SITE_ID`

4. **Configure environment variables:**
   - Add your environment variables as GitHub secrets:
     - `VITE_EMAIL_PROVIDER`
     - `VITE_EMAILJS_SERVICE_ID`
     - etc. (see .env.example)

5. **Push to main:**
   ```bash
   git push origin main
   ```

### Workflow Features

✅ **Automatic Linting:** ESLint runs on every push
✅ **Build Verification:** Ensures project builds successfully
✅ **Lighthouse Audits:** Performance checks on PRs
✅ **Bundle Analysis:** Tracks bundle size
✅ **Preview Deployments:** Test PRs before merging (Netlify)
✅ **Production Deployments:** Auto-deploy on main branch
✅ **Manual Triggers:** Deploy anytime from Actions tab

---

## 🌐 Custom Domain Setup

### Vercel

1. **Add domain:**
   - Project Settings → Domains
   - Enter your domain → Add

2. **Configure DNS:**
   - Add CNAME record: `www → cname.vercel-dns.com`
   - Add A record: `@ → 76.76.21.21`

3. **Wait for propagation** (up to 24 hours)

### Netlify

1. **Add domain:**
   - Site Settings → Domain management
   - Add custom domain

2. **Configure DNS:**
   - Use Netlify DNS (recommended):
     - Add nameservers to your domain registrar
   - Or use external DNS:
     - Add CNAME: `www → your-site.netlify.app`
     - Add A record: `@ → 75.2.60.5`

3. **Enable HTTPS:**
   - Automatic with Let's Encrypt
   - Takes a few minutes

### Cloudflare (Optional)

For better performance and DDoS protection:

1. **Add site to Cloudflare**
2. **Update nameservers** at domain registrar
3. **Configure SSL:**
   - SSL/TLS → Full (strict)
4. **Enable caching:**
   - Cache rules → Create rule
5. **Done!**

---

## 🔐 Environment Variables

### Set in Deployment Platform

**Vercel:**
```bash
# Via CLI
vercel env add VITE_EMAIL_PROVIDER

# Or in dashboard
Project Settings → Environment Variables
```

**Netlify:**
```bash
# Via CLI
netlify env:set VITE_EMAIL_PROVIDER emailjs

# Or in dashboard
Site settings → Environment variables
```

**GitHub Pages:**
- Environment variables are embedded during build
- Use GitHub Actions secrets
- Set in: Settings → Secrets → Actions

### Required Variables

```env
VITE_ENABLE_ANALYTICS=true
VITE_EMAIL_PROVIDER=emailjs
VITE_EMAILJS_SERVICE_ID=your-service-id
VITE_EMAILJS_TEMPLATE_ID=your-template-id
VITE_EMAILJS_PUBLIC_KEY=your-public-key
```

See `.env.example` for full list.

---

## 📊 Post-Deployment Checklist

After deploying, verify everything works:

### Functionality
- [ ] Site loads without errors
- [ ] All sections render correctly
- [ ] Navigation works smoothly
- [ ] Contact form sends emails
- [ ] CV download works
- [ ] Social links work
- [ ] Theme toggle works
- [ ] Language switcher works

### Performance
- [ ] Run Lighthouse audit (95+ score)
- [ ] Check load time (< 3s)
- [ ] Verify images load quickly
- [ ] Test on mobile device
- [ ] Check Core Web Vitals

### SEO
- [ ] Verify meta tags
- [ ] Check Open Graph preview (Facebook, Twitter)
- [ ] Submit sitemap to Google Search Console
- [ ] Test structured data (Google Rich Results)
- [ ] Verify robots.txt is accessible

### PWA
- [ ] Test "Install App" on mobile
- [ ] Verify icons appear correctly
- [ ] Check manifest.json loads
- [ ] Test offline functionality (if enabled)

### Security
- [ ] HTTPS is enabled
- [ ] SSL certificate is valid
- [ ] No mixed content warnings
- [ ] CSP headers configured (optional)

---

## 🐛 Troubleshooting

### Build Fails

**Error: "Cannot find module"**
```bash
# Clear cache and reinstall
rm -rf node_modules pnpm-lock.yaml
pnpm install
pnpm run build
```

**Error: "Out of memory"**
```bash
# Increase Node.js memory
NODE_OPTIONS="--max-old-space-size=4096" pnpm run build
```

### Deployment Fails

**Vercel: "Forbidden"**
- Check VERCEL_TOKEN is valid
- Verify VERCEL_ORG_ID and VERCEL_PROJECT_ID
- Regenerate token if needed

**Netlify: "Build failed"**
- Check build logs for errors
- Verify Node.js version (should be 20+)
- Check environment variables are set

### Site Not Loading

**Error: "404 Not Found"**
- Check base path in vite.config.js
- Verify deployment succeeded
- Check domain DNS settings

**Error: "Mixed content"**
- Ensure all resources use HTTPS
- Update external links (http → https)

### PWA Not Installing

**"Install" button doesn't appear**
- Verify HTTPS is enabled
- Check manifest.json is valid
- Generate PWA icons
- Clear browser cache

---

## 📈 Monitoring

### Analytics Setup

After deployment, set up monitoring:

1. **Google Search Console**
   - Submit sitemap
   - Monitor search performance
   - Check indexing status

2. **Analytics (Plausible/GA)**
   - Verify tracking is working
   - Set up goals/events
   - Monitor traffic

3. **Error Tracking (Optional)**
   - Sentry: `npm install @sentry/react`
   - Configure in src/main.jsx
   - Monitor production errors

### Performance Monitoring

```javascript
// Add to src/lib/analytics.js
import { getCLS, getFID, getLCP } from 'web-vitals'

export function initWebVitals() {
  getCLS(console.log)
  getFID(console.log)
  getLCP(console.log)
}
```

---

## 🔄 Update Deployment

### Manual Update

```bash
# Pull latest changes
git pull origin main

# Build
npm run build

# Deploy (depending on platform)
vercel --prod
# or
netlify deploy --prod
```

### Automatic Updates (GitHub Actions)

Just push to main:
```bash
git add .
git commit -m "Update content"
git push origin main
```

GitHub Actions will:
1. Run tests
2. Build project
3. Deploy to production
4. Send notification

---

## 🎯 Deployment Comparison

| Feature | Vercel | Netlify | GitHub Pages |
|---------|--------|---------|--------------|
| **Price (Free Tier)** | Excellent | Excellent | Unlimited |
| **Build Speed** | ⚡ Fast | ⚡ Fast | Medium |
| **Global CDN** | ✅ Yes | ✅ Yes | ✅ Yes |
| **Auto HTTPS** | ✅ Yes | ✅ Yes | ✅ Yes |
| **Custom Domain** | ✅ Free | ✅ Free | ✅ Free |
| **Environment Variables** | ✅ Easy | ✅ Easy | ⚠️ Manual |
| **Preview Deployments** | ✅ Yes | ✅ Yes | ❌ No |
| **Form Handling** | ⚠️ Paid | ✅ Free | ❌ No |
| **Functions/API** | ✅ Yes | ✅ Yes | ❌ No |
| **Setup Difficulty** | Easy | Easy | Medium |

**Recommendation:**
- **Vercel:** Best for most users (recommended)
- **Netlify:** Great if you need form handling
- **GitHub Pages:** Good for simple static sites

---

## 📚 Resources

### Documentation
- [Vercel Docs](https://vercel.com/docs)
- [Netlify Docs](https://docs.netlify.com/)
- [GitHub Pages Docs](https://docs.github.com/en/pages)
- [GitHub Actions Docs](https://docs.github.com/en/actions)

### Tools
- [Lighthouse CI](https://github.com/GoogleChrome/lighthouse-ci)
- [Bundle Analyzer](https://github.com/btd/rollup-plugin-visualizer)
- [Uptime Monitor](https://uptimerobot.com/)

---

## ✅ Success Checklist

- [ ] Choose deployment platform
- [ ] Configure environment variables
- [ ] Deploy successfully
- [ ] Set up custom domain (optional)
- [ ] Enable HTTPS
- [ ] Run Lighthouse audit
- [ ] Set up monitoring
- [ ] Test all features
- [ ] Configure GitHub Actions (optional)
- [ ] Submit to search engines

---

**Need help?** Check the troubleshooting section or create an issue in the repository.

Happy deploying! 🚀
