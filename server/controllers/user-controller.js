const User = require('../models/Createuser');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const dotenv = require('dotenv');
const Token = require('../models/Token')

dotenv.config();

const createuser = async(req, res) => {
    try {
        const securePassword = await bcrypt.hash(req.body.password, 10);
        const user = {...req.body, password: securePassword};
        const newUser = new User(user);
        newUser.save();

        return res.status(200).json({"msg": "New user is saved successfully"})
    }
    catch(err) {
        return res.status(500).json(err)
    }
}

const userLogin = async(req, res) => {
    let user = await User.findOne({email: req.body.email})

    if(!user) {
        return res.status(404).json({msg: "User not found"})
    }
    
    try {

        let match = await bcrypt.compare(req.body.password, user.password);
        if(match) {
            const accessToken = jwt.sign(user.toJSON(), process.env.ACCESS_SECRET_KEY, {expiresIn: '15m'});
            const refreshToken = jwt.sign(user.toJSON(), process.env.REFRESH_SECRET_KEY);

            const newToken = new Token({token: refreshToken})
            await newToken.save()


            return res.status(200).json({
                accessToken: accessToken,
                refreshToken: refreshToken,
                name: user.name,
                email: user.email
            })
        }
        else {
            return res.status(400).json({msg: "password is incorrect"})
        }
    }

    catch(err) {
        return res.status(500).json(err);
    }
}

module.exports = { createuser, userLogin }