const express = require("express");
const router = express.Router();
const studentController = require("../app/controllers/studentController");

router.get("/", studentController.student);
router.get("/information", studentController.information);
router.get("/advise", studentController.advise);
router.get("/reserve", studentController.reserve);
router.get("/formStudent", studentController.formAddStudent);
router.post("/addstudent", studentController.addStudent);
router.get("/updateStudent", studentController.formUpdateStudent);
router.put("/updateS", studentController.updateStudent);
router.put("/deleled", studentController.deteledStudent);
router.get("/deleteList", studentController.deleteList);
router.patch("/restore", studentController.restoreStudent);
router.patch("/reserveStudent", studentController.reserveStudent);
router.get("/reserveList", studentController.reserveList);
router.patch("/restoreReverve", studentController.restoreReverve);
router.patch("/doneAdvise", studentController.doneAdvise);
module.exports = router;
