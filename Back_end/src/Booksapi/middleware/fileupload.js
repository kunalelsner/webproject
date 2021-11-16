
const books = require('./../model/books')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const user = require('./../../restfullapi/models/users')
const path = require('path')
const multer = require('multer')
// require('./../Files/Images')

const storage = multer.diskStorage({
    destination: './src/Booksapi/Files/Images',
    // destination: function (req, file, cb) {
    //     console.log(file);
    //     console.log("Hello people in storage");
    //     return cb(null, './../Files/Images');
    //   },
    filename: (req, file, cb) => {
        return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    },  
})

const fileFilter = (req, file, cb) => {
    console.log(file);
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
    fileFilter: fileFilter,
    limits: {
        fileSize: 1000000
    }
}).array('profile',4)

exports.errHandler = async function (err, req, res, next) {
    if (err instanceof multer.MulterError) {
        res.json({
            message: err.message
        })
    }
}




