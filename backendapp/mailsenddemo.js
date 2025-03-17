const nodemailer = require('nodemailer');


const gmailTransporter = nodemailer.createTransport({
     service: 'Gmail',
      auth: {
 user: 'kousalya90909@gmail.com', //gmail id
 pass: 'saqk oapz cpov eedz' // app password
 }
});


const mailOptions = {
 from: 'kousalya90909@gmail.com',
 to: '2200090011@kluniversity.in',
 subject: 'MSWD PROJECT TEST MAIL',
 html: '<font color=red>you got the test mail succesfully</font>'
};


gmailTransporter.sendMail(mailOptions, function(error, info) {
 if (error) {
 console.error('Error sending email through Gmail:', error.message);
 } else {
      console.log('Email Sent Successfully');
 }
});