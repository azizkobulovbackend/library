const Joi = require('joi')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const config = require('../../config')
const Book = require('../models/book.model')

const findById = async(req, res) => {
    try{
        const {id} = req.params
        const data = await Book.findById(id).populate('authorId').select('-__v')
        if(!data) return res.json({message: "Book not found"})
        res.json({message: "Success", data: data})
    } catch(err) {
        console.log(err)
    }
}

const getBooks = async (req, res) => {
    try {
        const books = await Book.find({isActive: true}).populate('authorId')
        res.json({message:"Success", data: books})
    } catch(err) {
        console.log(err)
    }
}

const addBook = async (req, res) => {
    try {
        const {title, authorId, isbn} = req.body
        const check = Joi.object({
            title: Joi.required(),
            authorId: Joi.required(),
            isbn: Joi.required()
    })  
    
        const {error} = check.validate({title, authorId, isbn})
        if(error) return res.json({message: error.message})
        const books = await Book.find()
        const findBook = books.find((book) => book.isbn == isbn)
        if(findBook) return res.json({message: "Book with this isbn already exists"})
        const newBook = await Book.create({title,  authorId, isbn})
        await newBook.save()
        res.json({message: newBook})
    } catch(err) {
        console.log(err)
    }
}

const updateBook = async (req, res) => {
    const {id} = req.params
    const {title, author, isbn, isActive} = req.body
    const check = Joi.object({
        title: Joi.required(),
        authorId: Joi.required(),
        isbn: Joi.required(),
        isActive: Joi.required()
})  

    const {error} = check.validate({title, author, isbn, isActive})
    if(error) return res.json({message: error.message})
    const newBook = await Book.findByIdAndUpdate(id, {
        $set: {
            title, author, isbn, isActive
        }
    }, {
        new: true
    })
    res.json({message: "Updated", data: newBook})
}

const deleteBook = async (req, res) => {
    const {id} = req.params
    const data = await Book.findByIdAndDelete(id)
    if(!data) return res.json({message: "Book not found"})
    res.json({message: "Book deleted", data: data})
}

module.exports = {
    getBooks, addBook, updateBook, deleteBook, findById
}