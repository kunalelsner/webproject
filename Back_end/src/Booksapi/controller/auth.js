
const books = require('./../model/books')

const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const user = require('./../../restfullapi/models/users')
// const userh = require('./../src/upload/images')
const path = require('path')
const multer = require('multer')
const Joi = require('joi')







const storage = multer.diskStorage({
    destination: './../src/upload/images',
    filename: (req, file, cb) => {
        return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    },
    
})
const fileFilter = (req, file, cb) => {

    if (
      file.mimetype === "image/png" ||
      file.mimetype === "image/jpg" ||
      file.mimetype === "image/jpeg"
    ) {
      cb(null, true);
    } else { 
       cb(null, false, new Error('Only .png, .jpg and .jpeg format allowed'))// if validation failed then generate error
    }
  };
exports.upload = multer({
    storage: storage,
    // fileFilter: (req, file, cb) => {
    //     if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
    //         cb(null, true);
    //     } else {
    //         cb(null, false);
    //         return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
    //     }
    // },
    fileFilter: fileFilter,
    // limits: {
    //     fileSize: 10000
    // }
}).single('profile')




exports.errHandler = async function (err, req, res, next) {
    if (err instanceof multer.MulterError) {
        res.json({
            message: err.message
        })
        next()
    }
}

// exports.multipleimages=async function (req,res){
    
// }

exports.register = async function (req, res) {
    console.log('jddhbhdbd', req.file);
    try {
        const user = new books({
            profile: req.file.filename,
            ...req.body
        })
        // const tokenn=await user.genrateAuthToken();
        // return tokenn;
        const signupuser = await user.save();
        //    const userdata= signupuser.profile_url=`http://localhost:7000/profile/${req.file.filename}`
        // const token = await user.genrateAuthtoken()
        // const returnedTarget = Object.assign(signupuser, userdata)
        // console.log(returnedTarget);
        res.status(201).json({
            status: 201,
            data: signupuser,
            message: "Registration successfull"
        }
        )
    }
    catch (err) {
        console.log(err);
        res.status(400).send(err)
    }
}

exports.ruserdata = async function (req, res) {
    try {
        const getusers = await books.find();
        res.send(getusers)
    }
    catch (err) {
        res.send(err)
        console.log(err);
    }
}
exports.auth = async function (req, res, next) {
    let token = req.headers['autherization'];
    jwt.verify(token, 'access', (err, user) => {
        if (!err) {
            req.user = user;
            next();
        }
        else {
            return res.status(403).json({ message: 'user not authenticated' })
        }
    })
}

exports.renewaccesstoken = async function (req, res) {
    console.log(req.body);
    refreshtoken = req.body.token;
    if (!refreshtoken) {
        return res.status(403).json({ message: 'user not authenticated' })
    }
    jwt.verify(refreshtoken, 'refresh', (err, user) => {
        if (!err) {
            const accesstoken = jwt.sign({ user }, 'access', { expiresIn: '25s' })
            return res.status(201).json({ user, accesstoken })
        }
        else {
            return res.status(403).json({ message: 'user not authenticated' })
        }
    })
}

exports.protected = async function (req, res) {
    res.send('inside protected route')
}

exports.login = async function (req, res) {
    try {
        const email = req.body.email;
        const password = req.body.password;
        const usermail = await books.findOne({ email: email })
        // const ar = usermail.tokens; 
        // while (ar.length > 0) {
        //     ar.pop();
        // }
        const ismatch = await bcrypt.compare(password, usermail.password)
        // const token = await usermail.genrateAuthtoken()
        const accesstoken = jwt.sign({ usermail }, 'access', { expiresIn: '25s' })
        const refreshtoken = jwt.sign({ usermail }, 'refresh', { expiresIn: '7d' })
        // res.cookie('jwt',refreshtoken,{
        //     expires:new Date(Date.now()+60000)
        // })

        // console.log(cookie);
        if (ismatch) {
            res.json({
                usermail,
                accesstoken,
                refreshtoken
            }
            )
        }
        else {
            res.json('invalid password or email')
        }
    }
    catch (err) {
        console.log(err);
        res.status(400).send(err)
    }
}



