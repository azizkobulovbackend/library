const { Schema, model} = require('mongoose')

const rentSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    bookId: {
        type: Schema.Types.ObjectId, 
        ref: 'Book'
    },
    authorId: {
        type: Schema.Types.ObjectId, 
        ref: 'Author'
    },
    status: {
        type: Boolean,
        required: true,
        default: true
    }
},{
    timestamps: true
  } )

const Rent = model('Rent', rentSchema)

module.exports = Rent