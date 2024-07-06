const express = require('express')
const router = express.Router()
const User = require('../models/user')
const { hashPasswordGenerator, hashValidator } = require('../helper/hashing')
const { tokenGenerator } = require('../helper/token')
const authVerify = require("../helper/authVerify")
router.post('/signup', async (req, res) => {
    const hashedPwd = await hashPasswordGenerator(req.body.password)
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
        if (!isExistingUser) {
            res.send('Incorrect email')
        }
        else {
            const isPasswordValid = await hashValidator(req.body.password, isExistingUser.password)
            if (isPasswordValid) {
                const tokenGenerated = await tokenGenerator(isExistingUser.email)
                res.cookie("jwt", tokenGenerated)
                res.send(tokenGenerated)
                console.log("Login Successful");
            }
            else {
                res.send("Invalid Password")
            }
        }
    }
    catch (e) {
        console.log(e);
        res.send(e);
    }
})

router.get("/protected", authVerify, (req, res) => {
    res.send("Access good")
})
module.exports = router