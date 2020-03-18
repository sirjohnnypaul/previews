const nodemailer = require('nodemailer');
const config = require('../configuration/mail');

const transport = nodemailer.createTransport({
    service:'gmail',
    auth: {
        user: config.GMAIL_USER,
        pass: config.GMAIL_PASSWORD
    }
});

module.exports = {
    sendMail(from, to, subject, html) {
        return new Promise((resolve, reject) => {
            transport.sendMail({from,subject,to,html}, (error,info) => {
                if(error) reject(error);
                resolve(info);
            })
        })
    }
}