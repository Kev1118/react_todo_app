const jwt = require('jsonwebtoken')
require(dotenv).config()

const verifyToken = async (token) => {
    let decode = await jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
    return decode
}

module.exports = verifyToken