const express = require('express')
const app = express()
const router = express.Router()
const bodyParser = require('body-parser')
const User = require('../models/user')


app.use(bodyParser.urlencoded({ extended: false }))


router.get('/',  (req, res, next) => {
    if(req.session) {
        req.session.destroy()
    }
    res.status(200).send("logout successfully")
})


module.exports = router