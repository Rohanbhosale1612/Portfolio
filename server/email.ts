import nodemailer from "nodemailer";

export async function sendConfirmationEmail(
  toEmail: string,
  name: string
): Promise<void> {
  const {
    SMTP_HOST,
    SMTP_PORT,
    SMTP_USER,
    SMTP_PASS,
    MAIL_FROM_NAME = "Rohan Bhosale",
    MAIL_FROM_EMAIL = "rohanbhosale1216@gmail.com",
  } = process.env;

  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) {
    console.warn("[sendConfirmationEmail] SMTP not configured - skipping send.");
    console.info(`[sendConfirmationEmail] would send to: ${toEmail} (${name})`);
    return;
  }

  const port = parseInt(SMTP_PORT || "465", 10);
  const secure = port === 465;

  const transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port,
    secure,
    auth: {
      user: SMTP_USER,
      pass: SMTP_PASS,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  const mailOptions = {
    from: `"${MAIL_FROM_NAME}" <${MAIL_FROM_EMAIL}>`,
    to: toEmail,
    subject: "Thanks for reaching out — Rohan will contact you soon",
    text: `Hi ${name},

Thanks for reaching out. I'll get back to you soon about your Salesforce project.

Best,
${MAIL_FROM_NAME}`,
    html: `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #6366F1;">Thanks for reaching out!</h2>
        <p>Hi ${name},</p>
        <p>✅ Thanks for reaching out. I'll get back to you soon to discuss your Salesforce needs.</p>
        <p>Best regards,<br/><strong>${MAIL_FROM_NAME}</strong></p>
      </div>
    `,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log(`[sendConfirmationEmail] Email sent to ${toEmail} | Message ID: ${info.messageId}`);
  } catch (err: any) {
    console.error(
      `[sendConfirmationEmail] Failed to send to ${toEmail}:`,
      err && err.message ? err.message : err
    );
    throw err;
  }
}
