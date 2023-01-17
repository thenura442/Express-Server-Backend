const router = require("express").Router();
let registration = require('../../Controllers/register.controller')

router.post("/user", registration.createUser);
router.get("/users", registration.getAllUsers);
router.get("/user", registration.findOne);
router.update("/user/id", registration.updateOne);
router.update("/users/change", registration.updateMany);
router.delete("/user/delete", registration.deleteOne);
router.delete("/users/delete", registration.deleteMany);

module.exports = router;