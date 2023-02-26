const mongoose = require('mongoose');
mongoose.set('strictQuery', true);

const Connection = async() => {
    const url = 'mongodb://localhost:27017/newBlog';

    try{
        await mongoose.connect(url, {usenewUrlParser: true});
        console.log("Database is connectes")
    }
    catch(err) {
        console.log("Error--",err);
    }
}

module.exports = Connection;