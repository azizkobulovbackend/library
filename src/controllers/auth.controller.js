const Joi = require('joi')
const User = require('../models/user.model')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const config = require('../../config')


const register = async(req, res) => {
    try {
        const { name, username, password } = req.body
        const check = Joi.object({
        name: Joi.string().required(),
        username: Joi.string().min(7).required(),
        password: Joi.required()
})  

    const {error} = check.validate({name, username, password})
    if(error) return res.json({message: error.message})
    const findUser = await User.findOne({username})
    if(findUser) return res.json({message: 'User already exists'})
    const hashedPassword = await bcrypt.hash(password, 12)
    const newUser = {name, username, password: hashedPassword}
    const token = jwt.sign({id:newUser.id},config.jwtSecretKey , {expiresIn: config.expiresIn})
    res.json({message: 'User created', data: token})
    await User.create(newUser)
    await newUser.save()
    } catch(error) {
        console.log(error)
    }
} 

const login = async(req, res) => {
    const {username, password} = req.body
    const check = Joi.object({
        username: Joi.string().min(4).required(),
        password: Joi.string().required()
})  
    const {error} = check.validate({username, password})
    if(error) return res.json({message: error.message})
    const findUser = await User.findOne({username})
    if(!findUser) return res.json({message:'Incorrect phone or password'})
    const verify = await bcrypt.compare(password, findUser.password)
    if(!verify) return res.json({message:"Incorrect login or password"})
    const token = jwt.sign({id:findUser.id}, config.jwtSecretKey , {expiresIn: config.expiresIn})
    res.json({message:"Success", data: token})
}


module.exports = {
    register, login
}