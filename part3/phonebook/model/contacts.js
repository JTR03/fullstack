const mongoose = require('mongoose')

mongoose.set('strictQuery', false)

const url = process.env.MONGO_URL

console.log('connecting to', url)

mongoose.connect(url).then(() => {
    console.log('connected to MONGODB')
}).catch(err => {
    console.log('error connecting to MONGODB:',err.message);
})

const contactSchema = new mongoose.Schema({
    name:{
        type: String,
        minLength: 3,
        require:true,
    
    },
    number:{
        type: String,
        validate: {
            validator: (v) => {
                return /^\d{3}-\d{6}/.test(v)
            },
            message: props => `${props.value} is not a valid number!`
        },
        require: [true, 'Phone number is required']
    },
})

contactSchema.set('toJSON',{
    transform:(document,returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model('Note', contactSchema)