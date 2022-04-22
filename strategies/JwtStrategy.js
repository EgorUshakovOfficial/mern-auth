const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('../models/User');

// Options for extracting authentication token 
const opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken()
opts.secretOrKey = process.env.JWT_SECRET

// Jwt login strategy 
passport.use(
    new JwtStrategy(opts, (payload, done) => {

        User.findOne({ _id: payload._id }, (err, user) => {
            console.log(user)
            if (err) { return done(err, false) }
            if (user) {return done(null, user)}
            return done(null, false)   
        })
    })
)