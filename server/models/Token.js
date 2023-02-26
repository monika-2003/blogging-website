const mongoose = require('mongoose');

const refreshToken = mongoose.Schema({
    token: {
        type: String,
        required: true
    }
})

const Token = mongoose.model('token', refreshToken)
module.exports = Token;