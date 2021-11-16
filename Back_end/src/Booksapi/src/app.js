const express = require('express')
const multer = require('multer')
const path = require('path')
const books = require('../model/books')
require('./../db/conn')
const booksrouter = require('./routes/routes')
const port = process.env.PORT || 7000
const app = express()
const cors = require('cors')
const Joi = require('joi')
const hbs = require('nodemailer-express-handlebars')
const nodemailer = require('nodemailer')
app.use(cors())

// require('./../Files/Images')
app.use(express.json())

app.use(middleware)
// require('./../Files/Images')


app.use('/profile', express.static('src/Booksapi/Files/Images'));
// app.post("/uploads", upload, (req, res) => {
//     res.json({
//         success: 1,
//         profile_url: `http://localhost:7000/profile/${req.file.filename}`
//     })
// })



app.use(booksrouter)


//for practice demo
//for testinf joi validation
app.post('/test', async (req, res, next) => {


    // schema.validateAsync(data, (err, value) => {
    //     const id = Math.ceil(Math.random() * 9999999);
    //     if (err) {
    //       res.status(422).json({
    //         status: 'error',
    //         message: 'Invalid request data',
    //         data: data
    //       });
    //     } else {
    //       res.json({
    //         status: 'success',
    //         message: 'User created successfully',
    //         data: Object.assign({id}, value)
    //       });
    //     }
    // });
    const id = Math.ceil(Math.random() * 9999999);
    try {
        const data = req.body;

        const schema = Joi.object({
            email: Joi.string().email().required(),
            phone: Joi.string().regex(/^\d{3}-\d{3}-\d{4}$/).required(),
            text: Joi.string().error(new Error('string dal mere bahi number nahi chalega')),
            //in(ref, [options])
            a: Joi.array().items(Joi.number()),
            b: Joi.number().valid(Joi.in('a')),

            //valid and ref
            pwd: Joi.string().min(6).required(),
            cpwd: Joi.string().valid(Joi.ref('pwd')).required(),
            // cpwd:Joi.ref('pwd'),

            //I want to validate object using Joi which inovle use of Joi.ref() with multiplication operation.
            k: Joi.number().integer(),
            p: Joi.number().integer().min(1).max(Joi.ref('k', {
                adjust: (value) => value * 2
            })).error(new Error('positive number dal mere bhai')),
            c: Joi.any().allow('a'),
            d: Joi.any().allow('b', 'B'),

            //alter any 
            key: Joi.string()
                .alter({
                    get: (schema) => schema.required(),
                    post: (schema) => schema.forbidden()
                }),

            //for concat
            f: Joi.string().valid('a'),
            g: Joi.string().valid('b'),

            //for default
            username: Joi.string().default("kunalpatil"),
            h: Joi.any().description('this key will match anything you give it'),

            //for describe
            kunal: Joi.any().valid('foo', 'bar'),

            //forbidden
            //  u: Joi.any().forbidden()

            //any.label
            first_name: Joi.string().label('First Name'),

            //anyexapmle required
            kk: Joi.any().required(),

            //strip for removing password 
            password: Joi.string().strip(),

            //array items
            i: Joi.array().items(Joi.string().required(), Joi.number()),

            //array length

            // j:Joi.array().length(5)
            j: Joi.array().min(2),

            //unique 

            l: Joi.array().unique(),

            //date
            m: Joi.date().greater('1-1-1974'),

            //for number
            n: Joi.number().negative(),

            //object asserts
            o: {
                b: Joi.string(),
                c: Joi.number()
            },
            q: {
                e: Joi.any()
            }

        }).and('a', 'b').append({
            ab: Joi.string()
        }).assert('.q.e', Joi.ref('o.c'), 'equal to q.c').nand('hshs', 'sbsb').with('a', 'b')






        const getSchema = schema.tailor('get');
        const postSchema = schema.tailor('post');

        console.log(schema.describe());

        // console.log(getSchema);
        // console.log(postSchema);

        const any = Joi.any();
        await any.validateAsync('a');


        //any.concat(schema)






        //attempt
        // throws error
        // console.log(Joi.attempt('x', Joi.number()));
        // const result = Joi.attempt('4', Joi.number());
        // console.log(result);

        //assert 
        // console.log(Joi.assert('1', Joi.number()));
        //compile
        // const definition = ['key', 5, { a: true, b: [/^a/, 'boom'] }];
        // const compileschema = Joi.compile(definition);
        // console.log('dschema',compileschema);

        //default(modifier)
        // const custom = Joi.defaults((dschema) => {

        //     switch (dschema.type) {
        //         case 'string':
        //             return dschema.allow('');
        //         case 'object':
        //             return dschema.min(1);
        //         default:
        //             return dschema;
        //     }
        // });
        // const dschema = custom.object();

        //for checking error
        // const { error, value } = schema.validate(data);
        // !error ? console.log("success!", Joi.isError(error)): console.log(Joi.isError(error))

        //check giving argument is expression or not
        //Joi.x is genrate a dynamic expression 
        const expression = Joi.x('{a}');
        // console.log('expression or not', Joi.isExpression(expression));


        //isref
        const ref = Joi.ref('a');
        // console.log(Joi.isRef(ref));

        //isschema or not

        // console.log(Joi.isSchema(schema));

        //overriding
        // console.log(Joi.valid(1).valid(Joi.override, 2));

        //

        const validationResult = await schema.validateAsync(data);
        console.log(validationResult);
        console.log('kunal', validationResult.username);
        console.log('myname', validationResult.h);
        if (!validationResult) {
            console.log(Joi.isError(error));
            return res.status(422).json({
                status: 'error',
                message: 'Invalid request data',
                data: data
            });
        }
        else {
            return res.status(201).json({
                status: 'success',
                message: 'User created successfully',
                data: Object.assign({ id }, data)
            });
        }

    } catch (error) {
        // console.log('errrororororororor',Joi.isError(error));
        console.log(error);
    }
});




function middleware(req, res, next) {

    next()
}


//for email sending dynamic 



// initialize nodemailer
var transporter = nodemailer.createTransport(
    {
        service: 'gmail',
        host: 'smtp.gmail.com',
        // port: 25,
        // secure: false,
        auth: {
            user: 'kunalp.elsner@gmail.com',
            pass: 'elsner@12345'
        }
        // , tls: {
        //     rejectUnauthorized: false
        // }
    }
);
// transporter.sendEMail = function (mailRequest) {
//     return new Promise(function (resolve, reject) {
//       transporter.sendMail(mailRequest, (error, info) => {
//         if (error) {
//           reject(error);
//         } else {
//           resolve("The message was sent!");
//         }
//       });
//     });
//   }


// let htmlContent = `
//                 <h1><strong>Contact Form</strong></h1>
//                 <p>Hi,</p>
//                 <p> contacted with the following Details</p>
//                 <br/>
//                 <p>Email: </p>
//                 <p>Phone: </p>
//                 <p>Company Name: </p>
//                 <p>Message: </p>
//                 `
//     let mailOptions = {
//         from: "kunalp.elsner@gmail.com",
//         to: "kunalp.elsner@gmail.com",
//         subject: "Mail Test",
//         text: "",
//         html: htmlContent
//     }

// transporter.sendMail(mailOptions)
//     .then(function (email) {
//         // res.status(200).json({ success: true, msg: 'Mail sent' });
//         console.log('mail sent');
//     }).catch(function (exception) {
//         // res.status(200).json({ success: false, msg: exception });
//         console.log(exception);
//     });

// point to the template folder
const handlebarOptions = {
    viewEngine: {
        partialsDir: path.resolve('./src/Booksapi/src/views/'),
        defaultLayout: false,
    },
    viewPath: path.resolve('./src/Booksapi/src/views/'),
};

// // use a template file with nodemailer
transporter.use('compile', hbs(handlebarOptions))


var mailOptions = {
    from: '"Kunal" <kunalp.elsner@gmail.com>', // sender address
    to: 'kunalp.elsner@gmail.com', // list of receivers
    // cc:['kishank.elsner@gmail.com',"sorav.elsner@gmail.com"],
    subject: 'Welcome!',
    template: 'email', // the name of the template file i.e email.handlebars
    context: {
        name: "kishan", // replace {{name}} with Adebola
        company: 'Elsner Teachnologies' // replace {{company}} with My Company
    },
    attachments: [{ filename: "profile_1636550541135.png", path: "./src/Booksapi/Files/Images/profile_1636605382775.png" }],
};

// trigger the sending of the E-mail
transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
        return console.log('error', error);
    }
    console.log('Message sent: ' + info.response);
});




app.listen(port, () => {
    console.log(`connectet successfully on ${port}`);
})

