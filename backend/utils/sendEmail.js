const nodeMailer = require("nodemailer");
const nodeMailerUsername = process.env.NODEMAILER_USERNAME;
const nodeMailerPassword = process.env.NODEMAILER_PASSWORD;

const sendEmail = async ({ recipient, name, subject,text }) => {
  const transporter = nodeMailer.createTransport({
    service: "gmail",
    auth: {
      user: `${nodeMailerUsername}`,
      pass: `${nodeMailerPassword}`,
    },
  });
  const notificationMailOptions = {
    from: "nadavbrz@gmail.com",
    to: "nadavbrz@gmail.com",
    replyTo: recipient,
    subject: `New Message: ${name}`,
    text: `You have received a new message from ${name}:\n\n${text}`,
    html: `<p><strong>From:</strong> ${name} (${recipient})</p><p>${text}</p>`,
  };
  const thankYouMailOptions = {
    from: "nadavbrz@gmail.com",
    to: recipient,
    subject: "Thank you for your message!",
    text: `Dear ${name},\n\nThank you for reaching out. We have received your message and will get back to you shortly.\n\nBest regards,\nBaller Shop`,
  };
  try {
    await transporter.sendMail(notificationMailOptions);
    await transporter.sendMail(thankYouMailOptions);

    return { response: true, error: "", message: "email successfully sent" }
  } catch (err) {
    console.error("Failed sending email", err)
        return { response: false, error: err, message: "failed sending email" }
  }
};
exports.sendEmail = sendEmail
