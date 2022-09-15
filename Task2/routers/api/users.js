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


router.patch('/deposit', middleware.LoginAuth, async (req, res, next) => {

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


router.patch('/sharesChange/:id', middleware.LoginAuth, async (req, res, next) => {

    const company = req.params.id
    const share = req.body.share
    const shareNeg = share * -1
    const isBought = req.session.user.sharesOwnCompany && req.session.user.sharesOwnCompany.includes(company)
    let userFound
    let companyFound
    try {
        if (isBought){

            const shareBefore = req.session.user.shares[(req.session.user.sharesOwnCompany.indexOf(company))]
            userFound = await User.findOneAndUpdate({ _id: req.session.user._id, shares: shareBefore}, { $inc: { "shares.$" : share }}, { new: true })
            .catch((error) => {
                console.log(error)
                res.status(400).json({ message: 'balance updated failed' })
            })
            companyFound = await Company.findOneAndUpdate({ _id: company, sharesDistribtion: shareBefore}, { $inc: { "sharesDistribtion.$" : share, totalShare : shareNeg }}, { new: true })
            .catch((error) => {
                console.log(error)
                res.status(400).json({ message: 'balance update failed' })
            })
        }
        else {
             userFound = await User.findOneAndUpdate(req.session.user._id, { $addToSet: { shares: share, sharesOwnCompany: company}}, { new: true })
            .catch((error) => {
                console.log(error)
                res.status(400).json({ message: 'balance update failed' })
            })
            companyFound = await Company.findOneAndUpdate(company, { $addToSet: { sharesDistribtion: share, sharesOwners: req.session.user._id}, $inc: { totalShare : shareNeg }}, { new: true })
            .catch((error) => {
                console.log(error)
                res.status(400).json({ message: 'balance update failed' })
            })
        }
        


        if (userFound != null && companyFound !=null) {
            res.status(200).send(userFound + companyFound)
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


router.patch('/subChange/:id', middleware.LoginAuth, async (req, res, next) => {

    const endpoint = req.params.id
    const user = req.session.user._id

    const isSub = req.session.user.subscriptions && req.session.user.subscriptions.includes(endpoint)
    
    const option = isSub ? "$pull" : "$addToSet"

    try {
        userFound = await User.findOneAndUpdate(user, { [option]: {subscriptions : endpoint } }, { new: true })
            .catch((error) => {
                console.log(error)
                res.status(400).json({ message: 'balance updated failed' })
            })
        endpointFound = await EndPoint.findOneAndUpdate(endpoint, { [option]: {subscribers : user } }, { new: true })
            .catch((error) => {
                console.log(error)
                res.status(400).json({ message: 'balance updated failed' })
            })


        if (userFound != null && endpointFound !=null) {
            res.status(200).send(userFound + endpointFound)
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