const Joi = require('joi')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const config = require('../../config')
const Rent = require('../models/rent.model')
const Book = require('../models/book.model')


const findById = async(req,res) => {
    const {id} = req.params
    const data = await Rent.findById(id).select('-__v')
    if(!data) return res.json({message: "Rent id not found"})
        res.json({message: "Success", data: data})
}

const getAllRent = async (req, res) => {
    try {
        const data = await Rent.find()
        res.json({message:"Success", data: data})
    } catch(err) {
        console.log(err)
    }
}


const rentBook = async (req, res) => {
    try {
        const {bookId, authorId} = req.body
        const check = Joi.object({
            bookId: Joi.required(),
            authorId: Joi.required()
    })  
    
        const {error} = check.validate({bookId, authorId})
        if(error) return res.json({message: error.message})
        
        const userId = req.user.id
        const rents = await Rent.find()
        const findBookId = rents.find((rent) => rent.bookId == bookId)
        if(findBookId) return res.json({message: "This book is already rented"})
        const newRent = await Rent.create({userId, bookId, authorId})
        await newRent.save()
        const book = await Book.findByIdAndUpdate(bookId, {
            $set: {
                isActive: false
            }
        }, {
            new: true
        })
        res.json({message: "Rented1", data: newRent})
        
    }catch(err) {
        console.log(err)
    }
}

const finishRent = async(req, res) => {
    const {bookId} = req.body
    const check = Joi.object({
        bookId: Joi.required()
})  

    const {error} = check.validate({bookId})
    if(error) return res.json({message: error.message})
    const userId = req.user.id
    const rents = await Rent.find()
    const findBookId = rents.find((rent) => rent.bookId == bookId  && rent.userId == userId)
    if(!findBookId) return res.json({message: 'Wrong book or user'})
    const data = await Rent.findOneAndDelete({bookId: bookId, userId: userId} )
    await Book.findByIdAndUpdate(bookId, {
        $set: {
            isActive: true
        }
    })
    res.json({message: "Rent finished", data: data})
}

module.exports = {
    findById, getAllRent, rentBook, finishRent
}
