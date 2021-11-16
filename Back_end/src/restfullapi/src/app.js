const express=require('express')
require('./../db/conn')
// const student=require('./../models/users')
const studentRouter=require('./routes/users')
const app=express()
const port =process.env.PORT || 8000
var cors = require('cors')


app.use(cors())


app.use(express.json())


app.use(studentRouter)




app.listen(port,()=>{
    console.log(`conncetion sucessfull at ${port}`);
})




