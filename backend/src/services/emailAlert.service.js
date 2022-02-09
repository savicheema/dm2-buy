const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    auth: {
      user: `${process.env.EMAIL}`,
      pass: `${process.env.EMAIL_PASSWORD}`,
    },
});

async function sendEmailAlert(emailRecipents, emailSubject, emailBody) {
    let info = await transporter.sendMail({
        from: `${process.env.EMAIL}`, // sender address
        to: [...emailRecipents], // list of receivers
        subject: emailSubject, // Subject line
        html: emailBody
    });

    console.log('Email sent: %s', info.messageId);
}

module.exports = {
    sendEmailAlert,
};