const mongoose=require('mongoose')

// mongoose.connect("mongodb://localhost:27017/boksapi").then(()=>{
//     console.log('database connected successfully');
// }).catch((er)=>{
//     console.log(er);
// })

mongoose.connect(process.env.DB).then(()=>{
    console.log('database connected successfully');
}).catch((er)=>{
    console.log(er);
})


