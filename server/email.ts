import nodemailer from "nodemailer";

export async function sendConfirmationEmail(
  toEmail: string,
  name: string
): Promise<void> {
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT || "587"),
    secure: process.env.SMTP_PORT === "465",
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  const mailOptions = {
    from: process.env.FROM_EMAIL,
    to: toEmail,
    subject: "Thanks — Rohan will reach out soon",
    html: `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #6366F1;">Thanks for reaching out!</h2>
        <p>Hi ${name},</p>
        <p>✅ Thanks for reaching out. Rohan will get back to you soon to discuss your Salesforce needs.</p>
        <p>In the meantime, feel free to check out our services and pricing on the website.</p>
        <br>
        <p>Best regards,<br><strong>Rohan Bhosale</strong><br>Salesforce Developer</p>
      </div>
    `,
  };

  await transporter.sendMail(mailOptions);
}
