const { Schema, model} = require('mongoose')

const usersSchema = new Schema({
    name: {
        type: String
    },
    username: {
        type: String,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    isActive: {
      type: Boolean,
      default: true
    },
    isAdmin: {
      type: Boolean,
      default: false
    },
    
  
  }, {
    timestamps: true
  })

const User = model('User', usersSchema)

module.exports = User