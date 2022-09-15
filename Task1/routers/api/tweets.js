const express = require('express')
const app = express()
const router = express.Router()
const bodyParser = require('body-parser')
const User = require('../../models/user')
const Tweet = require('../../models/tweet')
const middleware = require('../../middleware')

app.use(bodyParser.urlencoded({ extended: false }))

//Middleware ensure any operations on Tweet must have a user in req.session
//Which is there must be a user login already
router.post('/create', middleware.LoginAuth, async (req, res, next) => {
    const tweet = Tweet({
        content: req.body.content,
        user: req.session.user
    })

    try {
        Tweet.create(tweet)
            .then(() => {
                res.status(201).send(tweet)
            })
            .catch((error) => {
                console.log(error)
                res.status(400).json({ message: 'tweet create failed' })
            })


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

router.get('/', async (req, res, next) => {


    try {
        Tweet.find()
            .then((result) => {
                res.status(200).send(result)
            })
            .catch((error) => {
                console.log(error)
                res.status(400).json({ message: 'tweet read failed' })
            })


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

router.get('/:id', async (req, res, next) => {


    try {
        const tweetFound = await Tweet.findById(req.params.id)
            .catch((error) => {
                console.log(error)
                res.status(400).json({ message: 'tweet read failed' })
            })

        if (tweetFound != null) {
            req.session.tweet = tweetFound
            res.status(200).send(tweetFound)
            return next()
        }
        res.json({ message: 'tweet not found' })

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


router.get('/user/:id', async (req, res, next) => {

    try {
        const tweetFound = await Tweet.find({ user: req.params.id })
            .catch((error) => {
                console.log(error)
                res.status(400).json({ message: 'tweet read failed' })
            })

        if (tweetFound != null) {
            req.session.tweet = tweetFound
            res.status(200).send(tweetFound)
            return next()
        }
        res.json({ message: 'tweet not found' })


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

router.patch('/:id', middleware.LoginAuth, async (req, res, next) => {

    try {
        const tweetFound = await Tweet.findOneAndUpdate({ _id: req.params.id }, { content: req.body.content }, { new: true })
            .catch((error) => {
                console.log(error)
                res.status(400).json({ message: 'tweet content update failed' })
            })

        if (tweetFound.user == req.session.user._id) {
            if (tweetFound != null) {
                req.session.tweet = tweetFound
                res.status(200).send(tweetFound)
                return next()
            }
            else {
                res.json({ message: 'tweet not found' })
            }
        }
        else {
            res.status(401).send("Unauthorized Access")
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


router.delete('/:id', middleware.LoginAuth, async (req, res, next) => {

    try {
        const tweetFound = await Tweet.findByIdAndDelete(req.params.id)
            .catch((error) => {
                console.log(error)
                res.status(400).json({ message: 'tweet delete failed' })
            })

        if (tweetFound.user == req.session.user._id) {
            if (tweetFound != null) {
                req.session.tweet = tweetFound
                res.status(200).send(tweetFound)
                return next()
            }
            else {
                res.json({ message: 'tweet not found' })
            }
        }
        else {
            res.status(401).send("Unauthorized Access")
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