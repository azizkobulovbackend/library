const Joi = require('joi')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const config = require('../../config')
const Author = require('../models/author.model')
const Book = require('../models/book.model')
const Rent = require('../models/rent.model')

const findById = async(req, res) => {
    try{
        const {id} = req.params
        const data = await Author.findById(id).select('-__v')
        if(!data) return res.json({message: "Author not found"})
        res.json({message: "Success", data: data})
    } catch(err) {
        console.log(err)
    }
}

const getAuthors = async (req, res) => {
    try {
        const authors = await Author.find({isActive:true})
        res.json({message:"Success", data: authors})
    } catch(err) {
        console.log(err)
    }
}

const addAuthor = async (req, res) => {
    try {
        const {name, biography} = req.body
        const check = Joi.object({
            name: Joi.required(),
            biography: Joi.required()
    })  
    
        const {error} = check.validate({name, biography})
        if(error) return res.json({message: error.message})
        const newAuthor = await Author.create({name, biography})
        await newAuthor.save()
        res.json({data: newAuthor})
    } catch(err) {
        console.log(err)
    }
}

const updateAuthor = async (req, res) => {
    try {
        const id = req.params.id
        const {name, biography} = req.body
        const check = Joi.object({
            name: Joi.required(),
            biography: Joi.required()
    })  
    
        const {error} = check.validate({name, biography})
        if(error) return res.json({message: error.message})
        const data = await Author.findByIdAndUpdate(id, {
            $set: {
                name,
                biography
            }
        },
        {
            new:true
        })

        res.json({message: "Updated", data: data})

    }catch(err) {
        console.log(err)
    }
}

const deleteAuthor = async (req, res) => {
    try {
        const id = req.params.id
        const data = await Author.findByIdAndDelete(id)
        const authorId = id 
        if(!data) return res.json({message: "Author not found"})
        const deletedBooks = await Book.deleteMany({authorId: authorId})
        const deletedRent = await Rent.deleteMany({authorId: authorId})
        res.json({message: "Author deleted", data: data})
    }catch(err) {
        console.log(err)
    }
}

module.exports = {
    getAuthors, addAuthor, updateAuthor, findById, deleteAuthor
}