const mongoose = require('mongoose');
const { MONGO_URI } = process.env;

// Connect application to Mongodb 
const connect = mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(db => console.log("Application successfully connected to Mongodb"))
    .catch(err => console.log(err))
