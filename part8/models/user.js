const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const schema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        minLength: 5,
        unique: true
    },
    favoriteGenre: {
        type: String,
        required: true
    },
    books: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Book'
    }

})

mongoose.plugin(uniqueValidator)

module.exports = mongoose.model('User', schema)