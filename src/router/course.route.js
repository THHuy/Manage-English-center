const express = require("express");
const router = express.Router();
const courseController = require('../app/controllers/courseController')

router.get('/' , courseController.index)
router.get('/addCourse' , courseController.addCourse)
router.post('/createCourse', courseController.createCourse)
router.get('/listCourse', courseController.listUpdatedCourse)
router.get('/formUpdateCourse' , courseController.formUpdateCourse)
router.put('/updatedCourse' , courseController.updatedCourse)
router.patch('/deletedCourse' , courseController.deletedCourse)
module.exports = router