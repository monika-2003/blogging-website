const express = require('express');
const app = express();
const dotenv = require('dotenv');
const cors = require('cors');
const bodyParser = require('body-parser');
const Connection = require('./database/db')
const router = require('./routes/route')

dotenv.config();
const PORT = process.env.PORT;

app.use(cors());
app.use(bodyParser.json({extended: true}))
app.use(bodyParser.urlencoded({extended: true}))

app.use(router);

 
app.listen(PORT, ()=> {
    console.log('Listining on PORT 5000')
})

Connection();