const mongoose = require('mongoose')
//creating schema
const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: [true, 'User name is required.'],
        minlength:2,
        maxlength:20
    },
    email: {
        type: String,
        required: [true, 'Email is required.'],
    },
    password: {
        type: String,
        required: [true, 'Password is required.']
    },
})
//creating model
const userModel = mongoose.model('User', userSchema)
module.exports = userModel  