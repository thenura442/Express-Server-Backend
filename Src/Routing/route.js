const router = require('express').Router();
let registration = require('./Routes/user.routes')
let subject = require('./Routes/subject.routes')

//All the Routes that are available in the application are divided into related route files and are called below.
router.use('/user', registration);
router.use('/subject', subject);

module.exports = router;