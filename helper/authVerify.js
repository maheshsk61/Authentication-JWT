const { tokenValidator } = require('../helper/token')
const authVerify = async (req, res, next) => {
    try {
        const jwtToken = req.cookies.jwt;
        const isValid = await tokenValidator(jwtToken)
        if (isValid) {
            next()
        }
        else {
            res.send("Access Denied")
        }
    }
    catch (e) {
        console.log("Error in authVerify ", e);
    }
}
module.exports = authVerify