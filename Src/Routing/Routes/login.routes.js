const router = require("express").Router();
let user = require("../../Controllers/login.controller")

//Route of login
router.post("/login", user.loginUser);
router.get("/logout", user.logoutUser);

module.exports = router;