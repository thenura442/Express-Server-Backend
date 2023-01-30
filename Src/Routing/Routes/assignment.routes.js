const router = require("express").Router();

let multer = require("../../Middleware/multer");
let assignment = require("../../Controllers/assignment.controller")

//Routes related to user actions of types temp-admin, staff, lecturer and student
router.post("/register", assignment.createAssignment);
router.post("/get/id", assignment.findAssignment);
router.put("/update/id", assignment.updateAssignment);
router.post("/delete/id" ,assignment.deleteAssignment);
router.post("/get/assignments",assignment.getAssignments);

module.exports = router;