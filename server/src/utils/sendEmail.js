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



// import nodemailer from "nodemailer";

// Unified sendEmail that supports SendGrid (recommended) and Gmail fallback.
// Important env vars:
// - SENDGRID_API_KEY : your SendGrid API key (preferred)
// - SENDGRID_PASS    : legacy name some deployments may use (fallback)
// - GMAIL_USER / GMAIL_PASS : fallback for local development
// - EMAIL_FROM       : verified sender email (SendGrid recommended)

// const sendEmail = async (to, subject, html) => {
//   let transporterConfig = null;

//   // Prefer SENDGRID_API_KEY (common name). Some setups used SENDGRID_PASS previously.
//   const sendgridPass = process.env.SENDGRID_API_KEY || process.env.SENDGRID_PASS;

//   if (sendgridPass) {
//     transporterConfig = {
//       host: "smtp.sendgrid.net",
//       port: 587,
//       secure: false,
//       auth: {
//         user: "apikey",
//         pass: sendgridPass,
//       },
//     };
//   } else if (process.env.GMAIL_USER && process.env.GMAIL_PASS) {
//     transporterConfig = {
//       service: "Gmail",
//       auth: {
//         user: process.env.GMAIL_USER,
//         pass: process.env.GMAIL_PASS,
//       },
//     };
//   } else {
//     console.warn(
//       "No mail configuration found. Set SENDGRID_API_KEY or (GMAIL_USER & GMAIL_PASS)"
//     );
//     return false;
//   }

//   const transporter = nodemailer.createTransport(transporterConfig);

//   // Verify transporter early to get fast, clear errors for misconfig/auth failures
//   try {
//     await transporter.verify();
//   } catch (err) {
//     console.error("Mail transporter verification failed:", err && err.message ? err.message : err);
//     return false;
//   }

//   const fromAddress = process.env.EMAIL_FROM || process.env.GMAIL_USER || "no-reply@bhojan.app";

//   const mailOptions = {
//     from: fromAddress,
//     to,
//     subject,
//     html,
//   };

//   try {
//     const info = await transporter.sendMail(mailOptions);
//     console.log(`Email sent to ${to}. MessageId: ${info.messageId}`);
//     return true;
//   } catch (error) {
//     console.error("Error sending email:", error && error.message ? error.message : error);
//     return false;
//   }
// };

// export default sendEmail;
