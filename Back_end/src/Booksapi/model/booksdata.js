const mongoose=require('mongoose')
const jwt=require('jsonwebtoken')
const bcrypt=require('bcrypt')

const booksdataSchema = new mongoose.Schema(
    {
        bookname: {
            type: String,
            required: true,
            lowercase: true,
            trim: true,
            minlength: [2, "please maximumm 2 enter"],
        },
        bookauthor: {
            type: String,
            required: true,
            lowercase: true,
            trim: true,
            minlength: [2, "please maximumm 2 enter"],
        },
        bookpublisher: {
            type: String,
            required: true,
            lowercase: true,
            trim: true,
            minlength: [2, "please maximumm 2 enter"],
        },
        bookimages: {
            type: [String],
        },
    }
)


// booksSchema.pre('save',async function(next){
//     if(this.isModified('password')){
//         console.log(`the current password is ${this.password}`);
//         this.password=await bcrypt.hash(this.password,10);
//         console.log(`after hashing password${this.password}`);
//         next()
//     }
// })


// booksSchema.methods.genrateAuthtoken=async function(){
//     try{
        
//         const token=jwt.sign({_id:this._id.toHexString()},'mynameiskunalpatiliamfromahemdabad')
//         this.tokens=this.tokens.concat({
//             token
//         })
//         await this.save();
//         return token;
//     }
//     catch(er){
//         console.log(er);
//         res.send(er)
//     }
// }


const booksdata=new mongoose.model("booksdata",booksdataSchema);


module.exports=booksdata;