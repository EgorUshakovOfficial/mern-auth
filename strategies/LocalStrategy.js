const passport = require('passport');
const LocalStrategy = require('passport-local');
const bcrypt = require('bcrypt'); 
const User = require("../models/User");

// Local strategy 
passport.use(new LocalStrategy({
    usernameField: "email",
    passwordField: "password"
},
    (username, password, done) => {
        User.findOne({ "email": username }, (err, user) => {
            if (err) { return done(err); }
            if (!user) { return done(null, false); }
            bcrypt.compare(password, user.password, (err, result) => {
                if (err) { return done(err); }
                if (result === false) { return done(null, false); }
                console.log(user);
                return done(null, user); 
            })
        })
}))

// Serialize user 
passport.serializeUser((user, done) => {
    done(null, user._id)
})


