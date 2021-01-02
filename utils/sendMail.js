const nodeMailer = require('nodemailer');

require('dotenv').config();

const sendMailpromise = async (mailOptions) => new Promise((res) => {
  const transporter = nodeMailer.createTransport({
    host: process.env.NODEMAILER_HOST,
    port: process.env.NODEMAILER_PORT,
    secure: false,
    requireTLS: true,
    auth: {
      user: process.env.NODEMAILER_AUTH_USER,
      pass: process.env.NODEMAILER_AUTH_PASS
    }
  });

  transporter.sendMail(mailOptions, (error, data) => {
    if (error) {
      console.log(error);
      res(false);
    } else {
      console.log(`mail sent ${data}`);
      res(true);
    }
  });
});

const sendMail = async (req, res) => {
  const { username, email } = req.body;

  const mailOptions = {
    from: process.env.NODEMAILER_AUTH_USER,
    to: email,
    subject: 'Login Details for Teamy',
    text: `Your account has been successfilly created
            Login details:
            Email: ${email}
            Password: ${username}
            Secure your login details and report to
            team lead when compromised`
  };
  const result = await sendMailpromise(mailOptions);

  return res.status(200).json({
    status: 'success',
    message: result
  });
};

module.exports = sendMail;