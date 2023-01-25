const router = require("express").Router();
let subject = require("../../Controllers/subject.controller")

//Routes related to user actions of types temp-admin, staff, lecturer and student
router.post("/register", subject.createSubject);
router.post("/get/id", subject.findSubject);
router.put("/update/id", subject.updateSubject);
router.post("/delete/id", subject.deleteSubject);
router.post("/student/subjects",subject.getStudentSubjects);
router.post("/lecturer/subjects",subject.getLecturerSubjects);

module.exports = router;