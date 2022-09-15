'use strict'
require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const app = express()

const bcrypt = require('bcrypt')
const mongoose = require('./db/mongoose');
const User = require('./models/user')


app.use(express.json())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

const session = require('express-session')
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: false,
    cookie: {
        expires: 1800000,
        httpOnly: true
    }
}));

const tweetsRouters = require('./routers/api/tweets')
const loginRouters = require('./routers/login')
const logoutRouters = require('./routers/logout')
const registerRouters = require('./routers/register')

app.use('/api/tweets', tweetsRouters)
app.use('/login', loginRouters)
app.use('/logout', logoutRouters)
app.use('/register', registerRouters)



const port = process.env.PORT || 3000
app.listen(port, () => {
    console.log(`Listening on port ${port}...`)
});

module.exports = app