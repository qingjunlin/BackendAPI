const express = require('express')
const app = express()
const router = express.Router()
const bodyParser = require('body-parser')
const User = require('../models/user')
const bcrypt = require('bcrypt')

app.use(bodyParser.urlencoded({ extended: false }))


router.post('/', async (req, res, next) => {
    const user = User({
        username: req.body.username,
        password: req.body.password,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        age: req.body.age,
        email: req.body.email
    })

    try {
        const userFound = await User.findOne({
            $or: [
                { username: req.body.username },
                { email: req.body.email }
            ]
        })
            .catch((error) => {
                res.send(error)
            })

        if (userFound == null) {
            bcrypt.hash(req.body.password, 10, (error, hash) => {
                user.password = hash
                User.create(user)
                    .then((newUser) => {
                        res.json({ message: 'registered successfully' })
                        req.session.user = newUser
                    })
                    .catch(error => console.log(error))
            })

        }
        else {
            if (req.body.email == userFound.email) {
                res.json({ message: 'email in used' })
            }
            else {
                res.json({ message: 'username in used' })
            }
        }


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