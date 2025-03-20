const nodemailer = require('nodemailer'); // Import the Nodemailer module

// Configure the Gmail transporter with authentication details
const gmailTransporter = nodemailer.createTransport({
    service: 'Gmail', // Using Gmail as the email service provider
    auth: {
        user: 'harshachowdary35@gmail.com', // Sender's Gmail ID
        pass: '22761A0503@v' // App password for authentication
    }
});

// Define mail options, including sender, receiver, subject, and content
const mailOptions = {
    from: 'harshachowdary35@gmail.com', // Sender's email address
    to: 'nexusharsha35@gmail.com', // Receiver's email address
    subject: 'MSWD PROJECT TEST MAIL', // Subject of the email
    html: '<font color=red>you got the test mail succesfully</font>' // HTML-formatted email content
};

// Send the email using the configured transporter
gmailTransporter.sendMail(mailOptions, function(error, info) {
    if (error) {
        console.error('Error sending email through Gmail:', error.message); // Log error message if sending fails
    } else {
        console.log('Email Sent Successfully'); // Log success message if email is sent
    }
});
