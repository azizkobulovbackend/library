const Joi = require('joi')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const config = require('../../config')
const User = require('../models/user.model')

const findById = async(req, res) => {
    try{
        const {id} = req.params
        const data = await User.findById(id).select('-__v')
        if(!data) return res.json({message: "User not found"})
        res.json({message: "Success", data: data})
    } catch(err) {
        console.log(err)
    }
}

const getUsers = async (req, res) => {
    try {
        const users = await User.find({isActive: true})
        res.json({message:"Success", data: users})
    } catch(err) {
        console.log(err)
    }
}

const addUser = async (req, res) => {
    try {
        const {name, username, password, isActive, isAdmin} = req.body
        const check = Joi.object({
            name: Joi.string().required(),
            username: Joi.string().min(7).required(),
            password: Joi.required(),
            isActive: Joi.required(),
            isAdmin: Joi.required()
    })  
    
        const {error} = check.validate({name, username, password, isActive, isAdmin})
        if(error) return res.json({message: error.message})
        const users = await User.find()
        const findUser = users.find((user) => user.username == username)
        if(findUser) return res.json({message: "User with this username already exists"})
        const hashedPassword = await bcrypt.hash(password, 12)
        const newUser = await User.create({name,  username, password: hashedPassword, isActive, isAdmin})
        await newUser.save()
        res.json({message: newUser})
    } catch(err) {
        console.log(err)
    }
}

const updateUser = async (req, res) => {
    const {id} = req.params
    const {name, username, password, isActive, isAdmin} = req.body

    const check = Joi.object({
        name: Joi.string().required(),
        username: Joi.string().min(7).required(),
        password: Joi.required(),
        isActive: Joi.required(),
        isAdmin: Joi.required()
})  

    const {error} = check.validate({name, username, password, isActive, isAdmin})
    if(error) return res.json({message: error.message})

    const hashedPassword = await bcrypt.hash(password, 12) 
    const newUser = await User.findByIdAndUpdate(id, {
        $set: {
            name, username, password: hashedPassword, isActive, isAdmin
        }
    }, {
        new: true
    })
    res.json({message: "Updated", data: newUser})
}

const deleteUser = async (req, res) => {
    const {id} = req.params
    const data = await User.findByIdAndDelete(id)
    if(!data) return res.json({message: "User not found"})
    res.json({message: "user deleted", data: data})
}

module.exports = {
    findById, getUsers, addUser, updateUser, deleteUser
}