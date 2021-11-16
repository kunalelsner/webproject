const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const adminauthSchema = new mongoose.Schema(
    {
        firstname: {
            type: String,
            required: true,
            trim: true,
            minlength: [2, "please maximumm 2 enter"],
        },
        lastname: {
            type: String,
            required: true,
            lowercase: true,
            trim: true,
            minlength: [2, "please maximumm 2 enter"],
        },
        email: {
            type: String,
            required: true,
            lowercase: true,
            trim: true,
            minlength: [2, "please maximumm 2 enter"],
            unique:true,
            validate(value){
                const re = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test(value)
                if (re==false) {
                    throw new Error('please enter valid email address')
                }
            }
        },
        password: {
            type: String
        },
        address: {
            type: String,
            trim: true,
            minlength: [2, "please maximumm 2 enter"],
        },
        role: {
            type: String,
            default:'1'
        }
    }
)




adminauthSchema.pre('save',async function(next){
    if(this.isModified('password')){
        console.log(`the current password is ${this.password}`);
        this.password=await bcrypt.hash(this.password,10);
        console.log(`after hashing password${this.password}`);
        next()
    }
})



const admindata = new mongoose.model("admindata", adminauthSchema);


module.exports = admindata;