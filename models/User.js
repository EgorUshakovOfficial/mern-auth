const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Session schema 
const Session = new Schema({
    refreshToken: {
        type: String,
        default: ""
    }
})

// User schema 
const User = new Schema({
    firstName: { type: String, isRequired: true },
    lastName: { type: String, isRequired: true },
    email: { type: String, isRequired: true },
    password: {type: String, isRequired: true},
    refreshToken: { type: [Session] }
});

// Remove refreshToken from response 
User.set("toJSON", (doc, ret, opts) => {
    delete ret.refreshToken
    return ret
})

module.exports = mongoose.model("User", User); 
