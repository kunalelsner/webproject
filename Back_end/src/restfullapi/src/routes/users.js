const express = require('express')
const router = new express.Router();
const student = require('./../../models/users')
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')

router.get("/kunal", (req, res) => {
    // const studentsdata=await student.find();
    // console.log(studentsdata);
    res.send("hello kunal")
})


router.get("/", (req, res) => {
    res.send("hello from the server side")
})

router.post("/students", async (req, res) => {

    try {
        const user = new student(req.body)
        const createuser = await user.save();
        res.status(201).send(createuser)
    }
    catch (err) {
        res.status(400).send(err)
    }
    // user.save().then((req,res)=>{
    //     res.status(201).send(user)
    // }).catch((err)=>{
    //     res.status(400).send(err)
    // })
})

router.get("/students", async (req, res) => {

    try {
        const studentsdata = await student.find();
        res.send(studentsdata)
    }
    catch (err) {
        res.send(err)
    }
})

router.get("/students/:id", async (req, res) => {

    try {
        const _id = req.params.id;
        const studentsdata = await student.findById({ _id });
        res.send(studentsdata)
    }
    catch (err) {
        res.send(err)
    }
})


router.delete("/students/:id", async (req, res) => {

    try {
        const _id = req.params.id;
        const deletestudentsdata = await student.findByIdAndDelete({ _id });
        if (!_id) {
            return res.status(400).send();
        }
        res.send(deletestudentsdata)
    }
    catch (err) {
        res.status(500).send(err)
    }
})


router.patch("/students/:id", async (req, res) => {

    try {
        const _id = req.params.id;
        const updatestudentsdata = await student.findByIdAndUpdate(_id, req.body);
        res.send(updatestudentsdata)
        // const updatestudentsdata=await user.findByIdAndUpdate( function (err) {
        //     if (err) {
        //       return res.status(400).send({
        //           message: (err.name === 'MongoError' && err.code === 11000) ? 'Email already exists !' : errorHandler.getErrorMessage(err)
        //       });
        //     }
        //     else {
        //       return console.log('No Error');
        //     }
        // });
        // res.status(201).send(updatestudentsdata)
    }
    catch (err) {

        return res.status(400).send({
            message: (err.code === 11000) ? `${err.keyValue.name}  is already exists !` : errorHandler.getErrorMessage(err)
        })


    }

})

// router.post("/login", async (req, res) => {

//     try {
//         const email = req.body.email;
//         const password = req.body.password;
//         console.log(email);
//         const usermail = await student.findOne({ email })
//         console.log(usermail.password);
//         const isMatch=await bcrypt.compare(password,usermail.password)
//         console.log(isMatch);
//         if (isMatch) {
//             res.send(usermail)
//         }
//         else {
//             res.status(400).send('please enter correct password')
//         }
//     }
//     catch (err) {
//         res.status(400).send('invalid data')
//     }
//     // user.save().then((req,res)=>{
//     //     res.status(201).send(user)
//     // }).catch((err)=>{
//     //     res.status(400).send(err)
//     // })
// })

router.post("/login", async (req, res) => {

    try {
        const email = req.body.email;
        const password = req.body.password;

        const usermail = await student.findOne({ email })
      
        const isMatch=await bcrypt.compare(password,usermail.password)
        console.log(password);
        console.log(usermail.password);
        console.log('ismatch',isMatch);
        const tokenn=await usermail.genrateAuthToken();
        console.log('sign in ',tokenn);
        if (isMatch) {
            res.send(usermail)
        }
        else {
            res.status(400).send('please enter correct password')
        }
    }
    catch (err) {
        res.status(400).send('invalid data')
    }
    // user.save().then((req,res)=>{
    //     res.status(201).send(user)
    // }).catch((err)=>{
    //     res.status(400).send(err)
    // })
})




// router.post("/signup",async(req,res)=>{

//     try{
//         console.log(req);
//         console.log(req.body.password);

//         // const password=req.body.password;
//         // const cpassword=req.body.confirmpassword;
//         // console.log(password);
//         // console.log(email);
//         // const usermail=await student.findOne({email})
//         // console.log(usermail.password);
//         // if (password === cpassword) {
//         //     const signupuser=await user.save();
//         // res.status(201).send(signupuser)
//         // }
//         // else{
//         //     res.status(400).send('please enter correct password')
//         // }
//     }
//     catch(err){
//         res.status(400).send('invalid data')
//     }
//     // user.save().then((req,res)=>{
//     //     res.status(201).send(user)
//     // }).catch((err)=>{
//     //     res.status(400).send(err)
//     // })
// })


// router.post("/signup", async (req, res) => {
//     try {
//         const password = req.body.password;
//         const cpassword = req.body.confirmpassword;

//         if (password === cpassword) {
//             const user = new student(req.body)
//             const signupuser = await user.save();
//             res.status(201).send(signupuser)
//         }
//     }
//     catch (err) {
//         res.status(400).send(err)
//     }
 
// })




router.post("/signup", async (req, res) => {
    try {
        const user = new student(req.body)
        const tokenn=await user.genrateAuthToken();
        // return tokenn;
        const signupuser = await user.save();
        res.status(201).send(signupuser)
    }
    catch (err) {
        res.status(400).send(err)
    }
 
})



module.exports = router




