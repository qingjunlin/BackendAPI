const express = require('express')
const app = express()
const router = express.Router()
const bodyParser = require('body-parser')
const User = require('../../models/user')
const Company = require('../../models/company')
const EndPoint = require('../../models/endpoint')
const middleware = require('../../middleware')

app.use(bodyParser.urlencoded({ extended: false }))

//Middleware ensure any operations on Tweet must have a user in req.session
//Which is there must be a user login already



router.get('/', async (req, res, next) => {


    try {
        const userFound = await User.findById(req.session.user._id)
            .catch((error) => {
                console.log(error)
                res.status(400).json({ message: 'User portfolio load failed' })
            })

        if (userFound != null) {
            res.status(200).send(userFound)
            return next()
        }
        res.json({ message: 'user not found' })

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


router.patch('/addbalance', middleware.LoginAuth, async (req, res, next) => {

    try {
        const userFound = await User.findOneAndUpdate({ _id: req.session.user._id }, { $inc: { wallet: req.body.balanceAdded } }, { new: true })
            .catch((error) => {
                console.log(error)
                res.status(400).json({ message: 'balance update failed' })
            })


        if (userFound != null) {
            res.status(200).send(userFound)
            return next()
        }
        else {
            res.json({ message: 'bad request' })
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