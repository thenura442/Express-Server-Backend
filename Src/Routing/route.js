const router = require('express').Router();

let verifyToken = require("../Middleware/auth")
let registration = require('./Routes/user.routes');
let login = require('./Routes/login.routes');
let subject = require('./Routes/subject.routes')
let assignment = require('./Routes/assignment.routes')
let upload = require('./Routes/upload.routes')

//All the Routes that are available in the application are divided into related route files and are called below.
router.use('/auth', login);
router.use('/upload', verifyToken.verifyToken, upload);
router.use('/user', verifyToken.verifyToken, registration);
router.use('/subject', verifyToken.verifyToken,  subject);
router.use('/assignment', verifyToken.verifyToken, assignment);

module.exports = router;