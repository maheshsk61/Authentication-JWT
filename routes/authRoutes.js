const express = require('express')
const router = express.Router()
const user = require('../models/user')
const { hashPassword, hashValidator } = require('../helper/hashing')
router.post('/signup', async (req, res) => {
    const hash = await hashPassword(req.body.password)
    try {
        const newUser = new user({
            userName: req.body.name,
            email: req.body.email,
            password: hash
        })
        const saveUser = await newUser.save()
        res.json(saveUser)
    }
    catch (e) {
        res.send(e);
    }
})
router.post('/login', async (req, res) => {
    const isExistingUser = await user.findOne({ email: req.body.email })
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