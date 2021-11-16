const express = require('express')
const router = new express.Router()
const books = require('./../../model/books')
const booksdata = require('./../../model/booksdata')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const user = require('../../../restfullapi/models/users')
const  userhandlers=require('./../../controller/auth')
const booksdatahandlers=require('./../../controller/books')
const adminhandlers=require('./../../controller/adminauth')
const middlewarehandlers=require('./../../middleware/fileupload')
const practicedemo=require('../../controller/forpracticedemo')

 //demo to check working or not
// router.get("/", (req, res) => {
//     res.send("hello from the server side")
// })


//For authentication user

router.route('/register/auth').post(userhandlers.upload,userhandlers.register,userhandlers.errHandler);
router.get('/ruserdata',userhandlers.ruserdata)
router.post('/renewaccesstoken',userhandlers.renewaccesstoken)
router.post('/protected', userhandlers.auth, userhandlers.protected)
router.post("/auth/login", userhandlers.login)

//for book infromation
router.post("/addbooks", middlewarehandlers.upload, middlewarehandlers.errHandler,booksdatahandlers.addbooks)


router.get("/books",booksdatahandlers.books)
router.get("/books/book/:id", booksdatahandlers.bookbyid)
router.delete("/books/delete/:id",booksdatahandlers.deletebook )
router.patch("/books/:id", booksdatahandlers.editbook)

//FOR ADMIN LOGIN
router.post("/register/auth/admin", adminhandlers.adminregister)
router.post('/renewaccesstoken',userhandlers.renewaccesstoken)
router.post('/protected', userhandlers.auth, userhandlers.protected)
router.post("/auth/login/admin",adminhandlers.adminlogin)


//for practice demo
// create a new teacher or student
router.post('/people',practicedemo.genericHandler)
router.post('/auth/edit',practicedemo.genericHandler)
router.post('/fees/pay',practicedemo.genericHandler)

module.exports = router
