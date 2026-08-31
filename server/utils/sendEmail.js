const nodemailer = require("nodemailer");

module.exports = async (email, subject, text) => {
  try {
    console.log("EMAIL_HOST =", process.env.EMAIL_HOST);
    console.log("EMAIL_PORT =", process.env.EMAIL_PORT);
    console.log("EMAIL_USER =", process.env.EMAIL_USER);

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: subject,
      text: text,
    });

    console.log(`Email sent to ${email}`);
  } catch (error) {
    console.error(error);
    console.error(`Error sending mail to ${email}`);
    throw error;
  }
};