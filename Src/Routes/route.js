const router = require('express').Router();
let registration = require('./specific/registration.routes')

router.use('/register', registration)

module.exports = router;