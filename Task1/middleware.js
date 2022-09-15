exports.LoginAuth = (req, res, next) => {
    if (req.session && req.session.user) {
        return next()
    }
    else {
        res.status(401).send("Unauthorized Access")
    }
}
