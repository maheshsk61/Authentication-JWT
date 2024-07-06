const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
dotenv.config()
const tokenGenerator = (email) => {
    try {
        const token = jwt.sign(
            { email },
            process.env.JWT_KEY,
            { expiresIn: "1h" }
        )
        return token
    }
    catch (e) {
        console.error('Error in tokenGenerator:', e);
        return false;
    }
}
const tokenValidator = (token) => {
    try {
        const data = jwt.verify(token, process.env.JWT_KEY)
        return data
    }
    catch (e) {
        console.error('Error in tokenValidator:', e);
        return false;
    }
}
module.exports.tokenGenerator = tokenGenerator
module.exports.tokenValidator = tokenValidator