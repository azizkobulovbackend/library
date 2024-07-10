const { Schema, model} = require('mongoose')

const bookSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    authorId: {
        type: Schema.Types.ObjectId, 
        ref: 'Author'
    },
    isbn: {
        type: Number,
        required: true
    },
    isActive: {
        type: Boolean,
        required: true,
        default: true
    }
},{
    timestamps: true
  } )

const Book = model('Book', bookSchema)

module.exports = Book