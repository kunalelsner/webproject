const cron = require('node-cron');
const nodemailer = require('nodemailer')
const mailer = require('nodemailer');
const books = require('../model/books')


const sendEmail = async (email, subject, text) => {
    console.log('email', email);
    console.log('subject', subject);
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
            html:text
        });

        console.log("email sent sucessfully");
    } catch (error) {
        console.log(error, "email not sent");
    }
};
const userdata=[];
books.find().then((elem)=>{
    userdata.push(elem)
}).catch((err)=>{
    console.log(err);
})

//Cron Job to run around 7am Server Time 
cron.schedule('00 25 10 * * * ', async () => {
   const actualuserdata= userdata.flat()
    //T0 Get the Current Year, Month And Day
    var dateYear = new Date().getFullYear();
    var dateMonth = new Date().getMonth(); // start counting from 0
    var dateDay = new Date().getDate();// start counting from 1
    ///The Main Function 
    const sendWishes =
        // looping through the users
        actualuserdata.forEach(element => {
            // Spliting the Date of Birth (DOB) 
            // to get the Month And Day
            let d = element.birthdate.split('-')
            let dM = +d[1]  // For the month
            let dD = +d[0] // for the day 
        
            if (dateDay === dD && dateMonth === dM) {
                const htmldata = `Wishing You a <b>Happy birthday ${element.firstname} ${element.lastname}</b> On Your 21, Enjoy your day \n <small>this is auto generated</small>`
                sendEmail("kunalp.elsner@gmail.com", `Happy Birthday ${element.firstname}` , htmldata);
            }
        });
});


