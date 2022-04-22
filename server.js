// Configure dotenv
require("dotenv").config();

const express = require('express');
const bodyParser = require("body-parser");
const cors = require('cors');
const cookieParser = require('cookie-parser');
const routes = require('./routes'); 
const User = require('./models/User');
const passport = require('passport');


// Application 
const app = express();

// Connect to Mongodb
require('./utils/connectdb');

// Strategies
require('./strategies/LocalStrategy');
require('./strategies/JwtStrategy');

// Middleware
app.use(cors({
    origin: "http://localhost:3000",
    credentials: true,
    methods: ["GET", "POST"]
}));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()); 
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(passport.initialize());

// Routes 
routes(app, User); 

// Make server listen 
const port = process.env.PORT || 4000;
app.listen(port, () => `Server is listening on port ${port}`); 
