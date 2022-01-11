const nodemailer = require("nodemailer");

const sendEmail = async (email, subject, text) => {
    console.log('email',email);
    console.log('subject',subject);
    try {
        const transporter = nodemailer.createTransport({
            host: process.env.HOST,
            service: process.env.SERVICE,
            auth: {
                user: "kunalp.elsner@gmail.com",
                pass: "elsner@12345",
            },
        });
    

        await transporter.sendMail({
            from: "kunalp.elsner@gmail.com",
            to: email,
            subject: subject,
            text: text,
        });

        console.log("email sent sucessfully");
    } catch (error) {
        console.log(error, "email not sent");
    }
};

module.exports = sendEmail;

