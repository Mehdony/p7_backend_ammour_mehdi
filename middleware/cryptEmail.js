const cryptoJS = require('crypto-js')
require('dotenv').config()


module.exports = (req, res, next) => {
    const email = req.body.email
    const encryptedEmail = 
    cryptoJS.HmacSHA256
    (email, process.env.CJS).toString()
    req.email = encryptedEmail
    next()
}