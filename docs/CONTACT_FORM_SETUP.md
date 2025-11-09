# 📧 Contact Form Backend Setup

This guide will help you set up a backend for your contact form. You have three options:

1. **EmailJS** - Recommended for most users (200 emails/month free)
2. **Formspree** - Alternative option (50 emails/month free, better spam protection)
3. **Mailto Fallback** - No setup required, but opens user's email client

## 🌟 Option 1: EmailJS (Recommended)

### Why EmailJS?
- ✅ 200 emails/month on free tier
- ✅ Easy setup, no backend required
- ✅ Works entirely in the browser
- ✅ Email templates with customization
- ✅ Multi-language support

### Setup Steps:

#### 1. Create EmailJS Account
1. Go to [emailjs.com](https://www.emailjs.com/)
2. Sign up for a free account
3. Verify your email

#### 2. Add Email Service
1. Go to **Email Services** in dashboard
2. Click **Add New Service**
3. Choose your email provider (Gmail, Outlook, etc.)
4. Follow the instructions to connect your email
5. Copy the **Service ID** (looks like: `service_xxxxxxx`)

#### 3. Create Email Template
1. Go to **Email Templates**
2. Click **Create New Template**
3. Use this template structure:

```
Subject: {{subject}} - Portfolio Contact Form

From: {{from_name}} ({{from_email}})

Message:
{{message}}

---
This message was sent via your portfolio contact form.
```

4. Save and copy the **Template ID** (looks like: `template_xxxxxxx`)

#### 4. Get Public Key
1. Go to **Account** → **General**
2. Copy your **Public Key** (looks like: `xxxxxxxxxxxxxxx`)

#### 5. Configure Your Portfolio
1. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```

2. Edit `.env` and add your EmailJS credentials:
   ```env
   VITE_EMAIL_PROVIDER=emailjs
   VITE_EMAILJS_SERVICE_ID=service_xxxxxxx
   VITE_EMAILJS_TEMPLATE_ID=template_xxxxxxx
   VITE_EMAILJS_PUBLIC_KEY=xxxxxxxxxxxxxxx
   ```

3. Restart your dev server:
   ```bash
   npm run dev
   ```

#### 6. Test Your Form
1. Fill out the contact form on your site
2. Check your email inbox
3. Verify the email was received with correct formatting

### Troubleshooting EmailJS

**Problem:** Emails not received
- Check spam folder
- Verify Service ID, Template ID, and Public Key are correct
- Check EmailJS dashboard for error logs
- Ensure email service is properly connected

**Problem:** Template variables not working
- Check template syntax: use `{{variable_name}}`
- Make sure variable names match exactly (case-sensitive)

---

## 🔒 Option 2: Formspree

### Why Formspree?
- ✅ Server-side processing (more secure)
- ✅ Built-in spam protection
- ✅ File uploads support (paid plan)
- ✅ Form analytics
- ❌ Only 50 emails/month on free tier

### Setup Steps:

#### 1. Create Formspree Account
1. Go to [formspree.io](https://formspree.io/)
2. Sign up for a free account
3. Verify your email

#### 2. Create New Form
1. Click **+ New Form**
2. Give it a name (e.g., "Portfolio Contact Form")
3. Copy the **Form ID** (looks like: `xxxxxxxx` or `your@email.com`)

#### 3. Configure Form Settings
1. Go to form settings
2. **Email:** Set your notification email
3. **Redirect:** Leave empty (handled by React)
4. **Spam Protection:** Enable reCAPTCHA (optional)
5. **Reply-To:** Enable to use sender's email for replies

#### 4. Configure Your Portfolio
1. Edit `.env`:
   ```env
   VITE_EMAIL_PROVIDER=formspree
   VITE_FORMSPREE_FORM_ID=xxxxxxxx
   ```

2. Restart dev server:
   ```bash
   npm run dev
   ```

#### 5. Test Your Form
1. Fill out the contact form
2. Check your email
3. Try replying to the email to test Reply-To functionality

### Troubleshooting Formspree

**Problem:** 403 Forbidden error
- Check if Form ID is correct
- Verify form is not archived
- Check Formspree dashboard for blocked submissions

**Problem:** Emails in spam
- Configure SPF/DKIM records in Formspree settings (paid plan)
- Ask recipients to whitelist Formspree emails

---

## 📬 Option 3: Mailto Fallback (Default)

### How It Works
- No backend required
- Opens user's default email client
- Contact form data pre-fills email body
- User must manually click "Send" in their email client

### Setup
Already configured! If you don't set up EmailJS or Formspree, the form will automatically use this fallback.

### Pros & Cons
- ✅ No setup required
- ✅ No email quota limits
- ✅ Works offline
- ❌ Requires user to have email client configured
- ❌ Not ideal for mobile users
- ❌ Lower conversion rate

---

## 🚀 Deployment Considerations

### Environment Variables
When deploying to production, make sure to add your environment variables:

**Vercel:**
```bash
vercel env add VITE_EMAIL_PROVIDER
vercel env add VITE_EMAILJS_SERVICE_ID
vercel env add VITE_EMAILJS_TEMPLATE_ID
vercel env add VITE_EMAILJS_PUBLIC_KEY
```

**Netlify:**
- Go to Site Settings → Environment Variables
- Add each variable with its value

**Other Platforms:**
- Check your hosting provider's documentation for setting environment variables

### Security Notes

1. **Public Keys Are Safe:**
   - EmailJS Public Key is meant to be exposed
   - Formspree Form ID is public
   - Both services have rate limiting and spam protection

2. **Don't Expose:**
   - Never commit `.env` file to git (it's in `.gitignore`)
   - Don't hardcode credentials in source code

3. **Spam Protection:**
   - EmailJS: Configure CAPTCHA in dashboard (paid plan)
   - Formspree: Free built-in spam filtering
   - Consider adding honeypot field for extra protection

---

## 📊 Comparison Table

| Feature | EmailJS | Formspree | Mailto |
|---------|---------|-----------|--------|
| Free Tier | 200/month | 50/month | Unlimited |
| Setup Difficulty | Easy | Easy | None |
| Spam Protection | Paid | Included | None |
| File Uploads | No | Paid | No |
| Analytics | Yes | Yes | No |
| Mobile Friendly | ✅ | ✅ | ❌ |
| Requires Backend | No | No | No |
| Email Templates | Yes | No | No |

---

## 🎯 Recommended Setup

**For most users:** Use **EmailJS**
- Better free tier (200 vs 50 emails)
- Template customization
- Easy to set up

**For high-traffic sites:** Consider both
- Use Formspree for primary
- EmailJS as backup when quota reached
- Mailto as final fallback

**For personal projects:** Mailto fallback is fine
- Zero cost
- Zero maintenance
- Works well for low-traffic sites

---

## 🔧 Advanced: Multiple Providers

You can modify `src/lib/email.js` to support multiple providers with automatic fallback:

```javascript
// Try primary provider, fallback to secondary if quota exceeded
try {
  return await sendWithFormspree(data)
} catch (error) {
  if (error.message.includes('quota')) {
    return await sendWithEmailJS(data)
  }
  throw error
}
```

---

## 📝 Testing

### Development Testing
```bash
# Enable console logging
VITE_ENV=development npm run dev

# Fill out form and check browser console
# You'll see: "Email sent via: [provider]"
```

### Production Testing
1. Deploy to staging environment
2. Test with real email addresses
3. Check spam folders
4. Verify reply-to functionality
5. Test on mobile devices

---

## ❓ FAQ

**Q: Can I use my own backend?**
A: Yes! Modify `src/lib/email.js` and add your API endpoint.

**Q: Which provider is more reliable?**
A: Both are reliable. EmailJS has better free tier, Formspree has better spam protection.

**Q: Do I need to pay for production use?**
A: No, free tiers are sufficient for most portfolio sites.

**Q: Can I customize the email template?**
A: Yes with EmailJS. Formspree templates are only available on paid plans.

**Q: Is my email address exposed in the code?**
A: The fallback email (mikail@lekesiz.fr) is visible in source. For privacy, use EmailJS/Formspree.

---

## 📚 Additional Resources

- [EmailJS Documentation](https://www.emailjs.com/docs/)
- [Formspree Documentation](https://help.formspree.io/)
- [Contact Form Best Practices](https://www.nngroup.com/articles/contact-forms/)
- [GDPR Compliance for Forms](https://gdpr.eu/contact-forms/)

---

Need help? Create an issue in the repository or contact via the form (once set up! 😄)
