const dotenv = require("dotenv");
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const app = express();

dotenv.config({path:'./config.env'});
require('./db/conn');

// Order is important! Add middleware in this specific order:
app.use(cookieParser());  // 1. Cookie parser first
app.use(express.json());  // 2. JSON parser
app.use(cors({           // 3. CORS configuration
  origin: 'http://localhost:5173',
  credentials: true
}));

// 4. Routes
app.use(require('./router/auth'));

const PORT = process.env.PORT || 5000;

//Middelware
const middleware = (req,res, next) =>{
    console.log('Hello my middlewate');
    next();
}

app.get('/', (req, res) => {
    res.send('Welcome to the Main Page');
});

app.get('/home', (req, res) => {
    res.send('Welcome to the Home Page');
});

app.get('/loginprofile', middleware, (req, res) => {
    res.send('Welcome to your Login Profile');
});

app.listen(PORT, () => {
    console.log('server is running on port ${PORT}');
});
