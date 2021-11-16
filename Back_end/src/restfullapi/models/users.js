const mongoose=require('mongoose')
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
            minlength: [2, "please maximumm 2 enter"],
           
            
        },
        password: {
            type: String,
            required: true,
            trim: true,
            minlength: [2, "please maximumm 2 enter"],
            
        },
        confirmpassword: {
            type: String,
            required: true,
            trim: true,
            minlength: [2, "please maximumm 2 enter"],
            
        },
        // type: {
        //     type: String,
        //     required: true,
        //     lowercase: true,
        //     // enum: ["Back end", "front end", 'database']
        // },

        // active: Boolean,
        // videos: {
        //     type:Number,
        //     validate(value){
        //         if(value<0){
        //             throw new Error('videos should not be negative')
        //         }
        //     }
        // },
        email:{
            type: String,
            required: true,
            unique:true,
            validate(value){
                const re = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test(value)
                if (re==false) {
                    throw new Error('please enter valid email address')
                }
            }
            
        },
        phoneNumber: {
            type: Number,
            required: true,
            unique:true,
        },
        address: {
            type: String,
            required: true,
        },
        tokens:[
            {
                token:{
                    type:String,
                    required:true
                }
            }
        ]
       
    }
)


userSchema.pre('save',async function(next){
    console.log('dbjhdbjhbjdbdb',this.isModified('password'));
  
        // const passwordHash=await bcrypt.hash(password,10);
        console.log(this.password);
        this.password=await bcrypt.hash(this.password,10);
        // this.confirmpassword=await bcrypt.hash(this.password,10);
        console.log(this.password);
        // console.log('password confitm',this.confirmpassword);

    next()
})




userSchema.methods.genrateAuthToken=async function(){

    try {
        const token= jwt.sign({_id:this._id.toHexString().toString()},"mynameiskunalpatiliamfromahemdabad")
        console.log(token);

        this.tokens= this.tokens.concat({
            token:token
        })
        await this.save();
        // console.log(this.tokens);
        return token;
    } catch (error) {
     res.send('error is'+error)   
    }
}




const user=new mongoose.model("student",userSchema);


module.exports=user;
 
