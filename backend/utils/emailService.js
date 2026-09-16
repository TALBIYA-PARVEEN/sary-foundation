const brevo = require('@getbrevo/brevo');
const { getBrevoClient } = require('../config/brevo');

const ADMIN_EMAIL = process.env.ADMIN_NOTIFICATION_EMAIL || 'arshahmad441@gmail.com';
const SENDER_EMAIL = process.env.BREVO_SENDER_EMAIL || 'noreply@saryfoundation.org';
const SENDER_NAME = 'SARY Foundation';

/**
 * Send email via Brevo transactional API with fallback to console logging
 */
const sendEmail = async ({ toEmail, toName, subject, htmlContent, textContent }) => {
  const client = getBrevoClient();

  if (!client) {
    console.log(`[Brevo Development Fallback] To: ${toEmail} (${toName}) | Subject: ${subject}`);
    console.log(`[Email Preview]:\n${textContent || htmlContent.substring(0, 200)}...`);
    return { success: true, mocked: true };
  }

  try {
    const sendSmtpEmail = new brevo.SendSmtpEmail();
    sendSmtpEmail.sender = { name: SENDER_NAME, email: SENDER_EMAIL };
    sendSmtpEmail.to = [{ email: toEmail, name: toName }];
    sendSmtpEmail.subject = subject;
    sendSmtpEmail.htmlContent = htmlContent;
    if (textContent) sendSmtpEmail.textContent = textContent;

    const response = await client.sendTransacEmail(sendSmtpEmail);
    console.log(`[Brevo Email Sent] MessageId: ${response?.body?.messageId || 'Success'}`);
    return { success: true, data: response };
  } catch (error) {
    console.error(`[Brevo Error]:`, error?.response?.body || error.message);
    // Return gracefully without throwing so form submission still succeeds
    return { success: false, error: error.message };
  }
};

/**
 * Send Contact Inquiries Notification
 */
const sendContactNotification = async (contact) => {
  // 1. Alert Foundation Admin
  const adminHtml = `
    <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #233;">
      <h2 style="color: #1e7e34; border-bottom: 2px solid #28a745; padding-bottom: 8px;">
        🌿 New Contact Inquiry - SARY Foundation
      </h2>
      <p>A new message has been received from the website contact form.</p>
      <table style="width: 100%; border-collapse: collapse; margin: 16px 0;">
        <tr><td style="padding: 8px; font-weight: bold; width: 120px;">Name:</td><td style="padding: 8px;">${contact.name}</td></tr>
        <tr><td style="padding: 8px; font-weight: bold;">Email:</td><td style="padding: 8px;"><a href="mailto:${contact.email}">${contact.email}</a></td></tr>
        <tr><td style="padding: 8px; font-weight: bold;">Phone:</td><td style="padding: 8px;">${contact.phone || 'Not provided'}</td></tr>
        <tr><td style="padding: 8px; font-weight: bold;">Subject:</td><td style="padding: 8px;">${contact.subject || 'General Inquiry'}</td></tr>
        <tr><td style="padding: 8px; font-weight: bold; vertical-align: top;">Message:</td><td style="padding: 8px; background: #f8f9fa; border-radius: 4px;">${contact.message}</td></tr>
      </table>
      <p style="font-size: 13px; color: #6c757d;">You can manage this message directly from the SARY Foundation Portal.</p>
    </div>
  `;

  await sendEmail({
    toEmail: ADMIN_EMAIL,
    toName: 'SARY Foundation Admin',
    subject: `New Inquiry from ${contact.name} - SARY Foundation`,
    htmlContent: adminHtml,
    textContent: `New Inquiry from ${contact.name} (${contact.email}): ${contact.message}`
  });

  // 2. Acknowledgment to Sender
  const userHtml = `
    <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #233;">
      <h2 style="color: #1e7e34;">Thank you for contacting SARY Foundation</h2>
      <p>Dear ${contact.name},</p>
      <p>Thank you for reaching out to us. We have received your message regarding "<strong>${contact.subject || 'General Inquiry'}</strong>" and our team will review it and get back to you shortly.</p>
      <blockquote style="background: #f4fbf7; border-left: 4px solid #28a745; padding: 12px; margin: 15px 0;">
        ${contact.message}
      </blockquote>
      <p>Together, let's make an impact and give back to nature!</p>
      <br/>
      <p>Warm regards,<br/><strong>SARY Foundation Team</strong><br/>Phone: +91 9517330895<br/>Email: arshahmad441@gmail.com</p>
    </div>
  `;

  await sendEmail({
    toEmail: contact.email,
    toName: contact.name,
    subject: 'We received your message - SARY Foundation',
    htmlContent: userHtml,
    textContent: `Dear ${contact.name}, thank you for contacting SARY Foundation. We will respond to your message shortly.`
  });
};

/**
 * Send Volunteer Registration Notification
 */
const sendVolunteerNotification = async (volunteer) => {
  // 1. Alert Foundation Admin
  const adminHtml = `
    <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #233;">
      <h2 style="color: #1e7e34; border-bottom: 2px solid #28a745; padding-bottom: 8px;">
        🤝 New Volunteer Registration - SARY Foundation
      </h2>
      <p>A new volunteer has joined the SARY Foundation movement!</p>
      <table style="width: 100%; border-collapse: collapse; margin: 16px 0;">
        <tr><td style="padding: 8px; font-weight: bold; width: 140px;">Name:</td><td style="padding: 8px;">${volunteer.name}</td></tr>
        <tr><td style="padding: 8px; font-weight: bold;">Email:</td><td style="padding: 8px;"><a href="mailto:${volunteer.email}">${volunteer.email}</a></td></tr>
        <tr><td style="padding: 8px; font-weight: bold;">Phone:</td><td style="padding: 8px;"><a href="tel:${volunteer.phone}">${volunteer.phone}</a></td></tr>
        <tr><td style="padding: 8px; font-weight: bold;">City:</td><td style="padding: 8px;">${volunteer.city}</td></tr>
        <tr><td style="padding: 8px; font-weight: bold;">Interest Area:</td><td style="padding: 8px;">${volunteer.interest}</td></tr>
        <tr><td style="padding: 8px; font-weight: bold;">Availability:</td><td style="padding: 8px;">${volunteer.availability}</td></tr>
        ${volunteer.message ? `<tr><td style="padding: 8px; font-weight: bold; vertical-align: top;">Motivation:</td><td style="padding: 8px; background: #f8f9fa;">${volunteer.message}</td></tr>` : ''}
      </table>
    </div>
  `;

  await sendEmail({
    toEmail: ADMIN_EMAIL,
    toName: 'SARY Foundation Admin',
    subject: `New Volunteer: ${volunteer.name} (${volunteer.city})`,
    htmlContent: adminHtml,
    textContent: `New volunteer registered: ${volunteer.name}, Phone: ${volunteer.phone}, City: ${volunteer.city}, Area: ${volunteer.interest}`
  });

  // 2. Welcome Email to Volunteer
  const welcomeHtml = `
    <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #233;">
      <h2 style="color: #1e7e34;">Welcome to the SARY Foundation Family!</h2>
      <p>Dear ${volunteer.name},</p>
      <p>We are thrilled to welcome you as a volunteer with <strong>SARY Foundation</strong>. Your dedication to environmental preservation and community empowerment will help create cleaner, greener, and healthier surroundings for generations to come.</p>
      <p>Our volunteer coordinator will get in touch with you before our upcoming drive or campaign in <strong>${volunteer.city}</strong>.</p>
      <p style="background: #e8f5e9; padding: 12px; border-radius: 6px; color: #1b5e20;">
        🌱 <strong>Registered Interest:</strong> ${volunteer.interest}<br/>
        ⏱ <strong>Availability:</strong> ${volunteer.availability}
      </p>
      <p>If you have any questions in the meantime, feel free to contact us at +91 9517330895 or reply to this email.</p>
      <br/>
      <p>With gratitude,<br/><strong>SARY Foundation</strong><br/>Email: arshahmad441@gmail.com | Phone: 9517330895</p>
    </div>
  `;

  await sendEmail({
    toEmail: volunteer.email,
    toName: volunteer.name,
    subject: 'Welcome to SARY Foundation Volunteer Community 🌱',
    htmlContent: welcomeHtml,
    textContent: `Dear ${volunteer.name}, welcome to SARY Foundation. Thank you for volunteering with us!`
  });
};

module.exports = {
  sendEmail,
  sendContactNotification,
  sendVolunteerNotification
};
