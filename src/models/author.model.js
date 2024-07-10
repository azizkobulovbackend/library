const { Schema, model} = require('mongoose')

const authorSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    biography: {
        type: String,
        required: true
    },
    isActive: {
        type: Boolean,
        required: true,
        default: true
    }
}, {
    timestamps: true
  })

const Author = model('Author', authorSchema)

module.exports = Author