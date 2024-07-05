const express = require('express')
const router = express.Router()
const User = require('../models/user')
const { hashPassword, hashValidator } = require('../helper/hashing')
router.post('/signup', async (req, res) => {
    const hashedPwd = await hashPassword(req.body.password)
    try {
        const newUser = new User({
            userName: req.body.userName,
            email: req.body.email,
            password: hashedPwd
        })
        const savedUser = await newUser.save()
        console.log(savedUser);
        res.json(savedUser)
    }
    catch (e) {
        console.log(e);
        res.send(e);
    }
})
router.post('/login', async (req, res) => {
    const isExistingUser = await User.findOne({ email: req.body.email })
    try {
        if (isExistingUser) {
            const isPasswordValid = await hashValidator(req.body.password, isExistingUser.password)
            if (isPasswordValid) {
                res.send("Login Successful")
            }
            else {
                res.send("Invalid Password")
            }
        }
    }
    catch (e) {
        res.send(e);
    }
})
module.exports = router