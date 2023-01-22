const router = require("express").Router();
let user = require("../../Controllers/login.controller")

//Route of login
router.post("/login", user.loginUser);
router.post("/logout", user.loginUser);

module.exports = router;