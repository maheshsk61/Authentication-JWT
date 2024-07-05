const bcrypt = require('bcryptjs');
const levelOfDifficulty = 10;
const hashPassword = async (plainpassword) => {
    try {
        const salt = await bcrypt.genSalt(levelOfDifficulty)
        const hashedPwd = await bcrypt.hash(plainpassword, salt)
        return hashedPwd
    }
    catch (e) {
        console.error('Error in hashPassword:', e);
        return false;
    }
}
const hashValidator = async (plainpassword, hashedPwd) => {
    try {
        const validate = await bcrypt.compare(plainpassword, hashedPwd)
        return validate
    }
    catch (e) {
        console.error('Error in hashValidator:', e);
        return false
    }
}
module.exports.hashPassword = hashPassword//export const hashpassword 
module.exports.hashValidator = hashValidator//export const hashValidator
