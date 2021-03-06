const books = require("../model/books");
const Token = require("../model/token");
const sendEmail = require("../utils/sendemail");
const crypto = require('crypto')
const Joi = require("joi");
const express = require("express");
const router = express.Router();



//for vslidate user 
// exports.validateuser=async function(req,res){
//     try {
//         const { error } = validate(req.body);
//         if (error) return res.status(400).send(error.details[0].message);

//         const user = await new books(req.body).save();

//         res.send(user);
//     } catch (error) {
//         res.send("An error occured");
//         console.log(error);
//     }
// }

//for password reset

exports.sendemdresetpasswordlink=async function(req,res){
    try {
        const schema = Joi.object({ email: Joi.string().email().required() });
        const { error } = schema.validate(req.body);
        if (error) return res.status(400).send(error.details[0].message);

        const user = await books.findOne({ email: req.body.email });
        if (!user)
            return res.status(400).send("user with given email doesn't exist");

        // let token = await Token.findOne({ userId: user._id });
        // console.log(token);
        // if (!token) {
        //     token = await new Token({
        //         userId: user._id,
        //         token: crypto.randomBytes(32).toString("hex"),
        //     }).save();
        // }

        // const link = `${process.env.BASE_URL}/password-reset/${user._id}/${token.token}`;
        const link = `${process.env.BASE_URL}/password-reset/${user._id}`;
        await sendEmail(user.email, "Password reset", link);

        res.send("password reset link sent to your email account");
    } catch (error) {
        res.send("An error occured");
        console.log(error);
    }
}

exports.resetpassword=async function(req,res){
    try {
        const schema = Joi.object({ password: Joi.string().required() });
        const { error } = schema.validate(req.body);
        if (error) return res.status(400).send(error.details[0].message);

        const user = await books.findById(req.params.userId);
        if (!user) return res.status(400).send("invalid link or expired");

        // const token = await Token.findOne({
        //     userId: user._id,
        //     token: req.params.token,
        // });
        // if (!token) return res.status(400).send("Invalid link or expired");

        user.password = req.body.password;
        await user.save();
        // await token.delete();

        res.send("password reset sucessfully.");
    } catch (error) {
        res.send("An error occured");
        console.log(error);
    }
}






