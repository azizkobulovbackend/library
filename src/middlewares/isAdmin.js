const { checkToken } = require('../utils/jwt');
const User = require('../models/user.model')

const isAdmin = (req, res, next) => {
    if(!req.headers.token) return res.status(401).json({message:'Permission Denied'})
    
    checkToken(req.headers.token, async(err, data) => {
        console.log(data)
        if(err) return res.status(401).json({message: "Wrong token"})
        req.user = data
        const id = req.user.id
        const users = await User.find()
        const findAdmin = users.find(u => u.isAdmin && u.id == id)
        if(!findAdmin) return res.status(401).json({message: "You are not admin"})
        next()
    })
}

module.exports = isAdmin