const express = require('express')
const app = express()
const router = express.Router()
const bodyParser = require('body-parser')
const User = require('../../models/user')
const Company = require('../../models/company')
const EndPoint = require('../../models/endpoint')
const middleware = require('../../middleware')

app.use(bodyParser.urlencoded({ extended: false }))


router.post('/', async (req, res, next) => {
    const endpoint = EndPoint({
        name: req.body.name,
    })


    try {
        const endpointFound = await EndPoint.findOne({
            $or: [
                { name: req.body.name },
            ]
        })
            .catch((error) => {
                res.send(error)
            })

        if (endpointFound == null) {
            EndPoint.create(endpoint)
                .then((newEndpoint) => {
                    req.session.endpoint = newEndpoint
                    res.status(201).send(newEndpoint)
                })
                .catch(error => console.log(error))

        }
        else {
            res.json({ message: 'Company Name has been taken' })
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