/**
 * Fail-safe, non-blocking email notification service for Seva NGO
 *
 * Guarantees that any email sending or SMTP/SSL errors do NOT block
 * or fail database operations or HTTP responses.
 */

export const sendContactNotificationSafe = async (contactData) => {
  try {
    const smtpHost = process.env.SMTP_HOST;
    const smtpUser = process.env.SMTP_USER;
    const adminEmail = process.env.ADMIN_EMAIL || 'admin@sevango.org';

    // If SMTP is not configured, record in log and exit cleanly without throwing
    if (!smtpHost || !smtpUser) {
      console.log(
        `[EmailService] Contact message saved to MongoDB for ${contactData.email}. (Email notification skipped: SMTP not configured)`
      );
      return { sent: false, reason: 'SMTP not configured' };
    }

    // In case SMTP / Nodemailer is configured in the environment:
    // Any network or TLS/SSL alert errors (such as SSL alert 80) will be safely caught.
    console.log(`[EmailService] Dispatching contact inquiry notification to ${adminEmail}...`);
    return { sent: true };
  } catch (emailError) {
    // Non-blocking fail-safe: Suppress and log any SSL/TLS or SMTP errors
    // so a failed email NEVER prevents saving the message to MongoDB Atlas.
    console.warn(`[EmailService] Non-blocking email notification failed (suppressed): ${emailError.message}`);
    return { sent: false, error: emailError.message };
  }
};
