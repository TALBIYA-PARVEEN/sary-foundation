const brevo = require('@getbrevo/brevo');
const { getBrevoClient } = require('../config/brevo');

const ADMIN_EMAIL = process.env.ADMIN_NOTIFICATION_EMAIL || 'saryfoundation@gmail.com';
const SENDER_EMAIL = process.env.BREVO_SENDER_EMAIL || 'saryfoundation@gmail.com';
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
      <p>Warm regards,<br/><strong>SARY Foundation Team</strong><br/>Phone: +91 9517330895<br/>Email: saryfoundation@gmail.com</p>
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
      <p>With gratitude,<br/><strong>SARY Foundation</strong><br/>Email: saryfoundation@gmail.com | Phone: 9517330895</p>
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

/**
 * Send 80G Donation Receipt to Donor & Admin Notification
 */
const sendDonationReceiptEmail = async (donation) => {
  const formattedDate = new Date(donation.createdAt || Date.now()).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  // 1. Official Receipt to Donor
  const donorHtml = `
    <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #1f2937; max-width: 600px; margin: 0 auto; border: 1px solid #e5e7eb; border-radius: 12px; overflow: hidden;">
      <div style="background: #0B2722; color: #ffffff; padding: 24px; text-align: center;">
        <h1 style="margin: 0; font-size: 22px; color: #34d399; letter-spacing: 1px;">SARY FOUNDATION</h1>
        <p style="margin: 6px 0 0 0; font-size: 13px; color: #d1fae5;">Official Donation & 80G Tax Exemption Receipt</p>
      </div>

      <div style="padding: 24px;">
        <p>Dear <strong>${donation.donorName}</strong>,</p>
        <p>On behalf of everyone at <strong>SARY Foundation</strong>, we extend our heartfelt gratitude for your generous contribution of <strong>₹${Number(donation.amount).toLocaleString('en-IN')}</strong>. Your support directly powers our grassroots riverbank cleanliness drives, urban afforestation, and zero-waste community initiatives.</p>

        <div style="background: #f9fafb; border: 1px solid #e5e7eb; border-radius: 8px; padding: 16px; margin: 20px 0;">
          <h3 style="margin-top: 0; color: #065f46; font-size: 15px; border-bottom: 1px solid #e5e7eb; padding-bottom: 8px;">
            📄 Receipt Details
          </h3>
          <table style="width: 100%; border-collapse: collapse; font-size: 13px;">
            <tr><td style="padding: 6px 0; color: #6b7280;">Receipt Number:</td><td style="padding: 6px 0; font-weight: bold; text-align: right;">${donation.receiptNumber}</td></tr>
            <tr><td style="padding: 6px 0; color: #6b7280;">Payment ID:</td><td style="padding: 6px 0; font-family: monospace; font-weight: bold; text-align: right;">${donation.razorpayPaymentId || 'N/A'}</td></tr>
            <tr><td style="padding: 6px 0; color: #6b7280;">Order ID:</td><td style="padding: 6px 0; font-family: monospace; text-align: right;">${donation.razorpayOrderId}</td></tr>
            <tr><td style="padding: 6px 0; color: #6b7280;">Date & Time:</td><td style="padding: 6px 0; text-align: right;">${formattedDate}</td></tr>
            <tr><td style="padding: 6px 0; color: #6b7280;">Donor Name:</td><td style="padding: 6px 0; text-align: right;">${donation.donorName}</td></tr>
            ${donation.panNumber ? `<tr><td style="padding: 6px 0; color: #6b7280;">PAN Number:</td><td style="padding: 6px 0; font-family: monospace; font-weight: bold; text-align: right;">${donation.panNumber}</td></tr>` : ''}
            <tr style="border-top: 1px solid #e5e7eb;"><td style="padding: 10px 0; font-weight: bold; font-size: 15px; color: #065f46;">Amount Contributed:</td><td style="padding: 10px 0; font-weight: bold; font-size: 16px; color: #065f46; text-align: right;">₹${Number(donation.amount).toLocaleString('en-IN')}</td></tr>
          </table>
        </div>

        <div style="background: #ecfdf5; border-left: 4px solid #10b981; padding: 12px; margin: 16px 0; font-size: 12px; color: #065f46;">
          <strong>80G Tax Exemption Notice:</strong> Donations to SARY Foundation are eligible for tax deduction benefits under Section 80G of the Income Tax Act, 1961. Please retain this receipt for your tax records.
        </div>

        <p style="font-size: 12px; color: #6b7280; margin-top: 24px;">
          <strong>SARY Foundation</strong><br/>
          Registered Address: Ratanlal Nagar, Kanpur Nagar, Uttar Pradesh - 208022<br/>
          Official Email: saryfoundation@gmail.com | Phone: +91 9517330895
        </p>
      </div>
    </div>
  `;

  await sendEmail({
    toEmail: donation.donorEmail,
    toName: donation.donorName,
    subject: `Donation Receipt ${donation.receiptNumber} - SARY Foundation (80G Tax Exempt)`,
    htmlContent: donorHtml,
    textContent: `Dear ${donation.donorName}, thank you for your contribution of ₹${donation.amount} to SARY Foundation. Receipt Number: ${donation.receiptNumber}, Payment ID: ${donation.razorpayPaymentId}`
  });

  // 2. Alert Foundation Admin
  const adminHtml = `
    <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #233;">
      <h2 style="color: #065f46; border-bottom: 2px solid #10b981; padding-bottom: 8px;">
        💰 New Donation Received via Razorpay - SARY Foundation
      </h2>
      <p>A new online donation has been verified and captured successfully.</p>
      <table style="width: 100%; border-collapse: collapse; margin: 16px 0; font-size: 14px;">
        <tr><td style="padding: 8px; font-weight: bold; width: 140px;">Amount:</td><td style="padding: 8px; font-weight: bold; color: #065f46; font-size: 18px;">₹${Number(donation.amount).toLocaleString('en-IN')}</td></tr>
        <tr><td style="padding: 8px; font-weight: bold;">Donor Name:</td><td style="padding: 8px;">${donation.donorName}</td></tr>
        <tr><td style="padding: 8px; font-weight: bold;">Donor Email:</td><td style="padding: 8px;"><a href="mailto:${donation.donorEmail}">${donation.donorEmail}</a></td></tr>
        <tr><td style="padding: 8px; font-weight: bold;">Phone:</td><td style="padding: 8px;">${donation.donorPhone || 'Not provided'}</td></tr>
        <tr><td style="padding: 8px; font-weight: bold;">PAN Number:</td><td style="padding: 8px;">${donation.panNumber || 'Not provided'}</td></tr>
        <tr><td style="padding: 8px; font-weight: bold;">Payment ID:</td><td style="padding: 8px; font-family: monospace;">${donation.razorpayPaymentId}</td></tr>
        <tr><td style="padding: 8px; font-weight: bold;">Receipt Number:</td><td style="padding: 8px; font-weight: bold;">${donation.receiptNumber}</td></tr>
      </table>
      <p style="font-size: 13px; color: #6b7280;">Logged into the database and viewable on the SARY Foundation Admin Portal (/sary-portal).</p>
    </div>
  `;

  await sendEmail({
    toEmail: ADMIN_EMAIL,
    toName: 'SARY Foundation Admin',
    subject: `💰 New Donation of ₹${donation.amount} received from ${donation.donorName}`,
    htmlContent: adminHtml,
    textContent: `New donation: ₹${donation.amount} from ${donation.donorName} (${donation.donorEmail}), Payment ID: ${donation.razorpayPaymentId}`
  });
};

module.exports = {
  sendEmail,
  sendContactNotification,
  sendVolunteerNotification,
  sendDonationReceiptEmail
};
