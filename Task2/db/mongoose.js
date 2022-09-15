'use strict';
const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://admin:adminpassword@twittercluster.pwecayf.mongodb.net/TwitterDB?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true})
.then(() => {
    console.log('Database connected')
})
.catch((error) => {
    console.log('Database connection error' + error)
})

module.exports = mongoose