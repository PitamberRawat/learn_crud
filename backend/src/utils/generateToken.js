const jwt = require('jsonwebtoken');

const JWT_SECRET = "sdafnsdkfsndfsdfsdf[sdf[sdf[s]dfs]df"

const generateToken = (userId)=>{
    return jwt.sign({userId}, JWT_SECRET, {expiresIn:"1d"})
}

module.exports = generateToken;