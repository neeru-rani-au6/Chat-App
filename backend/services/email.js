"use strict";
const nodemailer = require("nodemailer");

// this is for send mail in user email by useing nodemailer.
async function sendMail(data) {
    let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: 'abc@gmail.com',   // your email and password.
            pass: 'abc',
        },
    });

    let info = await transporter.sendMail({
        from: '"Chat App" <neeruolha@gmail.com>', // sender address
        to: data.to, // list of receivers
        subject: data.subject, // Subject line
        html: data.body, // html body
    });
    //console.log(info)
    return info;
}

module.exports = sendMail;
