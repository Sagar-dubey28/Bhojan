import nodemailer from "nodemailer";

//  If SENDGRID_API_KEY is provided, use SendGrid SMTP (user: 'apikey', pass: API key).
//  Otherwise, fall back to Gmail using GMAIL_USER/GMAIL_PASS.
// Returns true on success, false on failure.
const sendEmail = async (to, subject, html) => {
  let transporterConfig;

  if (process.env.SENDGRID_API_KEY) {
    // Use SendGrid SMTP
    transporterConfig = {
      host: "smtp.sendgrid.net",
      port: 587,
      secure: false,
      auth: {
        user: "apikey",
        pass: process.env.SENDGRID_PASS,
      },
    };
  } else if (process.env.GMAIL_USER && process.env.GMAIL_PASS) {
    transporterConfig = {
      service: "Gmail",
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS,
      },
    };
  } else {
    console.warn("No mail configuration found (SENDGRID_API_KEY or GMAIL_USER/GMAIL_PASS)");
    return false;
  }

  const transporter = nodemailer.createTransport(transporterConfig);

  const fromAddress = process.env.EMAIL_FROM || process.env.GMAIL_USER || "no-reply@bhojan.app";

  const mailOptions = {
    from: fromAddress,
    to,
    subject,
    html,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Email sent successfully to", to);
    return true;
  } catch (error) {
    console.error("Error sending email:", error && error.message ? error.message : error);
    return false;
  }
};

export default sendEmail;
