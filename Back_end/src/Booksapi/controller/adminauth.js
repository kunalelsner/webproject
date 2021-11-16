const admindata=require('./../model/adminauth')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const Joi=require('joi')


exports.adminregister=async function(req,res){
    try {
        const admin = new admindata(req.body)
        // const tokenn=await user.genrateAuthToken();
        // return tokenn;
        const signupadmin = await admin.save();
        // const token = await user.genrateAuthtoken()
        console.log(signupadmin);
        res.status(201).send(signupadmin)
    }
    catch (err) {
        res.status(400).send(err)
    }
}


exports.adminlogin=async function(req,res){
    try {
        const email = req.body.email;
        const password = req.body.password;
        console.log(req.body);
        const usermail = await  admindata.findOne({ email: email })
        if (!usermail) {
            return res.json({
                status: 403,
                message: "Your email is invalid",
            });
        }
        console.log(usermail);
        // const ar = usermail.tokens; 
        // while (ar.length > 0) {
        //     ar.pop();
        // }
        const ismatch = await bcrypt.compare(password, usermail.password)
        // const token = await usermail.genrateAuthtoken()
        const accesstoken = jwt.sign({ usermail }, 'access', { expiresIn: '25s' })
        const refreshtoken = jwt.sign({ usermail }, 'refresh', { expiresIn: '7d' })
        if (ismatch) {
            res.json({
                status: 200,
                data: usermail,
                accesstoken,
                refreshtoken,
                message: "Login successfull"
            }
            )
        }
        else {
            res.json({
                message: "Invalid password or Email"
            })
        }
    }
    catch (err) {
        console.log(err);
        return res.json({
            status: 403,
            message: 'Something went wrong!',
            error: err ? err : "",
        });
    }
}




