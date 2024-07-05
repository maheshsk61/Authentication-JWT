const mongoose = require('mongoose')
//creating schema
const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true,
        min: 2,
        max: 20
    },
    email: {
        type: String,
        required: true,
        max: 20,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
})
//creating model
const userModel = mongoose.model('User', userSchema)
module.exports = userModel   