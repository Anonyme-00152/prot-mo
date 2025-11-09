/**
 * Email Service Integration
 * Supports both EmailJS and Formspree
 */

// Email service configuration
const config = {
  provider: import.meta.env.VITE_EMAIL_PROVIDER || 'none', // 'emailjs', 'formspree', or 'none'

  // EmailJS Configuration
  emailjs: {
    serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID,
    templateId: import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
    publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
  },

  // Formspree Configuration
  formspree: {
    formId: import.meta.env.VITE_FORMSPREE_FORM_ID,
  },

  // Fallback email for mailto
  fallbackEmail: 'mikail@lekesiz.fr',
}

/**
 * Send email using EmailJS
 * Requires: EmailJS account and configuration
 * Free tier: 200 emails/month
 */
async function sendWithEmailJS(formData) {
  const { emailjs } = config

  if (!emailjs.serviceId || !emailjs.templateId || !emailjs.publicKey) {
    throw new Error('EmailJS not configured. Please set environment variables.')
  }

  // Load EmailJS script if not already loaded
  if (typeof window.emailjs === 'undefined') {
    await loadEmailJSScript()
  }

  // Initialize EmailJS
  window.emailjs.init(emailjs.publicKey)

  // Send email
  const response = await window.emailjs.send(
    emailjs.serviceId,
    emailjs.templateId,
    {
      from_name: formData.name,
      from_email: formData.email,
      subject: formData.subject,
      message: formData.message,
      to_email: config.fallbackEmail,
    }
  )

  if (response.status !== 200) {
    throw new Error('Failed to send email via EmailJS')
  }

  return { success: true, provider: 'emailjs' }
}

/**
 * Send email using Formspree
 * Requires: Formspree account and form ID
 * Free tier: 50 emails/month
 */
async function sendWithFormspree(formData) {
  const { formspree } = config

  if (!formspree.formId) {
    throw new Error('Formspree not configured. Please set VITE_FORMSPREE_FORM_ID.')
  }

  const response = await fetch(`https://formspree.io/f/${formspree.formId}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body: JSON.stringify({
      name: formData.name,
      email: formData.email,
      subject: formData.subject,
      message: formData.message,
    }),
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.error || 'Failed to send email via Formspree')
  }

  return { success: true, provider: 'formspree' }
}

/**
 * Fallback to mailto link
 * Used when no email service is configured
 */
function sendWithMailto(formData) {
  const mailtoLink = `mailto:${config.fallbackEmail}?subject=${encodeURIComponent(
    formData.subject
  )}&body=${encodeURIComponent(
    `From: ${formData.name} (${formData.email})\n\n${formData.message}`
  )}`

  window.location.href = mailtoLink

  return { success: true, provider: 'mailto' }
}

/**
 * Load EmailJS script dynamically
 */
function loadEmailJSScript() {
  return new Promise((resolve, reject) => {
    if (typeof window.emailjs !== 'undefined') {
      resolve()
      return
    }

    const script = document.createElement('script')
    script.src = 'https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js'
    script.async = true
    script.onload = resolve
    script.onerror = () => reject(new Error('Failed to load EmailJS script'))
    document.head.appendChild(script)
  })
}

/**
 * Main function to send contact form email
 * Automatically selects the appropriate provider
 *
 * @param {Object} formData - Form data { name, email, subject, message }
 * @returns {Promise<Object>} - { success: boolean, provider: string }
 */
export async function sendContactEmail(formData) {
  try {
    // Validate form data
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      throw new Error('All fields are required')
    }

    // Select provider and send email
    switch (config.provider) {
      case 'emailjs':
        return await sendWithEmailJS(formData)

      case 'formspree':
        return await sendWithFormspree(formData)

      case 'none':
      default:
        // Fallback to mailto
        return sendWithMailto(formData)
    }
  } catch (error) {
    console.error('Email sending error:', error)

    // Fallback to mailto on any error
    console.log('Falling back to mailto...')
    return sendWithMailto(formData)
  }
}

/**
 * Check if email service is configured
 */
export function isEmailServiceConfigured() {
  return config.provider !== 'none'
}

/**
 * Get current email provider
 */
export function getEmailProvider() {
  return config.provider
}
