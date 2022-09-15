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
    const company = Company({
        name: req.body.name,
        totalShare: req.body.totalShare,
        liverates: req.body.liverates,

    })


    try {
        const companyFound = await Company.findOne({
            $or: [
                { name: req.body.name },
            ]
        })
            .catch((error) => {
                res.send(error)
            })

        if (companyFound == null) {
            Company.create(company)
                .then((newCompany) => {
                    req.session.company = newCompany
                    res.status(201).send(newCompany)
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