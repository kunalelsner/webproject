const books = require('./../model/books')
const booksdata = require('./../model/booksdata')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')


//add book 
exports.addbooks=async function(req,res){
    // console.log(req.files);
    const files=req.files.map((item)=>{
        return(
                item.filename
        )
    })
    // const files = req.files.map(x => x);
    // console.log('jdbdbdbd',files);
    // bookimages
    try {
        const addbooks = new booksdata({bookimages:files,...req.body});
        const createbook = await addbooks.save();
        res.json({
            status: 201,
            data: createbook,
            message: "Record added Successfully"
        })
    }
    catch (err) {
        res.json(err)
        console.log(err);
    }
}

//get books
exports.books=async function(req,res){
    try {
        const getbooks = await booksdata.find();
        res.send(getbooks)
    }
    catch (err) {
        res.send(err)
        console.log(err);
    }
}

//GET BOOK BY ID
exports.bookbyid=async function(req,res){
        try {
            const _id = req.params.id;
            const getbook = await booksdata.findById({ _id });
            res.send(getbook)
        }
        catch (err) {
            res.send(err)
        }
}

//DELETE BOOK BY ID
exports.deletebook=async function(req,res){
        try {
            const _id = req.params.id;
            const deletestudentsdata = await booksdata.findByIdAndDelete({ _id });
            if (!_id) {
                return res.status(400).send();
            }
            res.send(deletestudentsdata)
        }
        catch (err) {
            res.send(err)
        }
    
}
//EDIT BOOK BY ID
exports.editbook=async function(req,res){
        try {
            const _id = req.params.id;
            const updatebookdata = await booksdata.findByIdAndUpdate(_id, req.body);
            res.send(updatebookdata)
        }
        catch (err) {
            return res.status(400).send({
                message: (err.code === 11000) ? `${err.keyValue.name}  is already exists !` : errorHandler.getErrorMessage(err)
            })
        } 
}


