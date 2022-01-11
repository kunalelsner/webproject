const mongoose=require('mongoose')
const jwt=require('jsonwebtoken')
const bcrypt=require('bcrypt')
const Joi=require('joi')

const booksSchema = new mongoose.Schema(
    {

        firstname: {
            type: String,
            // required: true,
            lowercase: true,
            trim: true,
            minlength: [2, "please maximumm 2 enter"],
        },
        lastname: {
            type: String,
            // required: true,
            lowercase: true,
            trim: true,
            minlength: [2, "please maximumm 2 enter"],
        },
        birthdate: {
            type: String,
            // required: true,
        },
        email:{
            type: String,
            // required: true,
            // unique:true,
            // validate(value){
            //     const re = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test(value)
            //     if (re==false) {
            //         throw new Error('please enter valid email address')
            //     }
            // }
            
        },
        password: {
            type: String
          },
          profile: {
            type: String
          },
          role: {
            type: Array,
            default:'2'
          },
        // tokens:[
        //     {
        //         token:{
        //             type:String,
                    
        //         }
        //     }
        // ]
    }
)


booksSchema.pre('save',async function(next){
    if(this.isModified('password')){
        console.log(`the current password is ${this.password}`);
        this.password=await bcrypt.hash(this.password,10);
        console.log(`after hashing password${this.password}`);
        next()
    }
})




// const Userregistrationshema = new mongoose.Schema(
//     {
//         bookname: {
//             type: String,
//             required: true,
//             lowercase: true,
//             trim: true,
//             minlength: [2, "please maximumm 2 enter"],
//         },
//         bookauthor: {
//             type: String,
//             required: true,
//             lowercase: true,
//             trim: true,
//             minlength: [2, "please maximumm 2 enter"],
//         },
//         bookpublisher: {
//             type: String,
//             required: true,
//             lowercase: true,
//             trim: true,
//             minlength: [2, "please maximumm 2 enter"],
//         },
//     }
// )

// booksSchema.pre('save',async function(next){
//     console.log(this.password);
    
//         // const passwordHash=await bcrypt.hash(password,10);

//         this.password=await bcrypt.hash(this.password,10);
      
  
//     next()
// })


// booksSchema.pre('save',async function(next){
//     console.log('dbjhdbjhbjdbdb',this.isModified('password'));
//     //     // const passwordHash=await bcrypt.hash(password,10);
//     //     console.log('before hashing password',this.password);
//     //     this.password=await bcrypt.hash(this.password,10);
//     //     // this.confirmpassword=await bcrypt.hash(this.password,10);
//     //     console.log('after hashing password',this.password);
//     //     // console.log('password confitm',this.confirmpassword);
//     // next()
//    if(this.isModified('password')){
//        bcrypt.hash(this.password, 10, (err, hash) => {
//            console.log('hash in scheama',hash);
//            this.password = hash;
//            console.log(this.password);
//            next();
//        });
//    }
// })

// booksSchema.methods.comparePassword = function(password) {
//     return bcrypt.compareSync(password, this.hash_password);
//   };


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


// booksSchema.methods.genrateAuthToken=async function(){
//     try {
//         const token= jwt.sign({_id:this._id.toHexString().toString()},"mynameiskunalpatiliamfromahemdabad")

//         this.tokens= this.tokens.concat({
//             token:token
//         })
//         await this.save();
//         // console.log(this.tokens);
//         return token;
//     } catch (error) {
//      res.send('error is'+error)   
//     }
// }






const books=new mongoose.model("book",booksSchema);


// const validate = (books) => {
//     const schema = Joi.object({
//         firstname: Joi.string().required(),
//         email: Joi.string().email().required(),
//         password: Joi.string().required(),
//         lastname:Joi.string().required(),
//     });
//     return schema.validate(books);
// };

module.exports=books;