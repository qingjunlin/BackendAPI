'use strict'
require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const app = express()

const bcrypt = require('bcrypt')
const mongoose = require('./db/mongoose');



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

const endpointsRouters = require('./routers/api/endpoints')
const companiesRouters = require('./routers/api/companies')
const usersRouters = require('./routers/api/users')
const loginRouters = require('./routers/login')
const logoutRouters = require('./routers/logout')
const registerRouters = require('./routers/register')

app.use('/api/endpoints', endpointsRouters)
app.use('/api/companies', companiesRouters)
app.use('/api/users', usersRouters)
app.use('/login', loginRouters)
app.use('/logout', logoutRouters)
app.use('/register', registerRouters)



const port = process.env.PORT || 3000
app.listen(port, () => {
    console.log(`Listening on port ${port}...`)
});

module.exports = app