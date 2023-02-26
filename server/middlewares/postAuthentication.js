const jwt = require('jsonwebtoken')
const dotenv = require('dotenv');

dotenv.config();

async function postAuthentication(req, res, next) {
    const auth = req.headers['authorization'];

    if(auth == null) {
        return res.status(404).json({msg: "access token not found"})
    }

    jwt.verify(auth, process.env.ACCESS_SECRET_KEY, (error, user)=> {
        if(error) {
            return res.status(404).json({msg: "access token not found"});
        }

        req.user = user;
    })
    
    next();
}

module.exports = postAuthentication