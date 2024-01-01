const express = require("express")
const router = express.Router()
const controller =require("../Controllers/controller")

router.post('/students/create', controller.createStudent)
router.get('/students/all', controller.getAllStudents)
router.post('/mentors/create', controller.createMentor)
router.get('/mentors/all', controller.getAllMentor)
router.put('/mentor/assign-mentor/:studentId/:mentorId', controller.assignMentor)
router.put('/mentor/change-mentor/:studentId/:newMentorId', controller.changeMentor)
router.get('/mentors/:mentorId', controller.getAllStudent)
router.get('/students/:studentId', controller.getAllPreMentor)

module.exports = router;    