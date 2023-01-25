const router = require("express").Router();

const multer = require('../../Middleware/multer');
let upload = require("../../Controllers/upload.controller")

//Routes related to user actions of types temp-admin, staff, lecturer and student
router.post("/create", multer.uploadMany, upload.createUpload);
router.post("/update", multer.uploadMany ,upload.updateUpload);
router.post("/delete", upload.deleteUpload);

module.exports = router;