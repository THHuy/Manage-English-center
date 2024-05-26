const express = require("express");
const router = express.Router();
const giaoVienController = require("../app/controllers/giaovienController");
router.get("/", giaoVienController.index);
router.get("/information", giaoVienController.information);
router.get("/blog", giaoVienController.blog);
router.get("/course", giaoVienController.course);
router.get("/class", giaoVienController.class);
router.get("/score", giaoVienController.score);
router.get("/scoreID", giaoVienController.scoreID);
router.get("/attend", giaoVienController.attend);
router.get("/attend-class", giaoVienController.attendClass)
router.get("/formBlog", giaoVienController.formBlog)
router.get("/addCourse", giaoVienController.addCourse)
router.get("/formUpdatedBlog", giaoVienController.formUpdatedBlog)
router.get("/Update-Course", giaoVienController.UpdateCourse)
module.exports = router;
