const nodemailer = require("nodemailer");

let transport = nodemailer.createTransport({
    // ...
    host: 'smtp.mailtrap.io',
    port: 2525,
    auth: {
       user: '9fe3e9cad43757',
       pass: 'ec9af729bc6c1f'
    }
});

const message = {
    from: 'amansharma1829@gmail.com',
    to: 'amansharma070169@gmail.com',
    subject: 'CertoSol Certificate ID',
    html: '<h1>Your new Certificate has been succesfully generated using CertoSol</h1><p>Find your certificate pdf file attached below.</p>',
    attachments: [
        { // Use a URL as an attachment
          filename: 'Certificate.pdf',
          path: 'Certificate.pdf'
      }
    ]
};
transport.sendMail(message, function (err, info) {
    if (err) {
      console.log(err)
    } else {
      console.log(info);
    }
 });