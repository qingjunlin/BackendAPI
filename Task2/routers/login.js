const express = require('express')
const app = express()
const router = express.Router()
const bodyParser = require('body-parser')
const User = require('../models/user')
const bcrypt = require('bcrypt')

app.use(bodyParser.urlencoded({ extended: false }))



router.post('/', async (req, res, next) => {
    try {
        const userFound = await User.findOne({
            $or: [
                { username: req.body.username }
            ]
        })
            .catch((error) => {
                res.send(error)
            })

        if (userFound != null) {
            let result = await bcrypt.compare(req.body.password, userFound.password)
                .catch((error) => {
                    res.send(error)
                })
            if (result === true) {
                req.session.user = userFound
                res.json({ message: 'Login successfully' })
                return next()
            }

        }
        res.json({ message: 'Either username or password is incorrect' })


    } catch (error) {
        console.log(error)
        if (typeof error === 'object' && error !== null && error.name === "MongoNetworkError") {
            res.status(500).send("internal server error")
        }
        else {
            res.status(400).send("bad request")
        }
    }
})

module.exports = router