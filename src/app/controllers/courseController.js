const Course = require("../models/modelCourse");
const course = new Course();
class courseController {
  //[GET] /course
  index(req, res, next) {
    const user = req.session.usersname;
    course.selectCourse((err, course) => {
      res.render("./course/course", { course, user });
    });
  }
  //[GET] /course/fromADD
  addCourse(req, res, next) {
    const successMessage = req.session.success;
    req.session.success = null;
    const user = req.session.usersname;
    res.render("./course/formAddCourse", { user, success: successMessage });
  }
  //[POST] /course/createCourse
  async createCourse(req, res, next) {
    const { nameCourse, link, mota } = req.body;
    const author = req.session.usersname;
    const magv = req.session.magv;
    try {
      await course.createCourse(
        nameCourse,
        link,
        mota,
        author,
        magv,
        (err, results) => {
          if (err) {
            console.log(err);
          }
          req.session.success = "Thành công";
          res.redirect("back");
        }
      );
    } catch (err) {
      console.log(err);
    }
  }
  //[GET] /course//updatedCourse
  listUpdatedCourse(req, res, next) {
    const user = req.session.usersname;
    course.selectCourse((err, course) => {
      res.render("./course/listUpdated", { course, user });
    });
  }
  //[GET] /course/formAddCourse
  formUpdateCourse(req, res, next) {
    const id = req.query.idcourse;
    const user = req.session.usersname;
    const successMessage = req.session.success;
    req.session.success = null;
    course.selectCoursewithID(id, (err, course) => {
      res.render("./course/updatedCourse", {
        course,
        user,
        success: successMessage,
      });
    });
  } //[PUT] /course/updatedCourse
  async updatedCourse(req, res, next) {
    const { title, link, mota } = req.body;
    const id = req.query.idcourse;
    try {
      await course.updatedCourse(id, title, link, mota);
      req.session.success = "Thành công";
      res.redirect("back");
    } catch {
      res.status(404).render("error", { error });
    }
  }
  //[PATCH] /course/deletedCourse
  async deletedCourse(req, res, next) {
    const id = req.query.idcourse;
    const admin = req.session.usersname;
    if (admin === "admin") {
      try {
        await course.deletedCourse(id);
        res.redirect("back");
      } catch (err) {
        console.log(err);
      }
    } else {
      try {
        await course.deletedCourse(id);
        res.redirect("/giaovien/course");
      } catch (err) {
        console.log(err);
      }
    }
  }
}

module.exports = new courseController();
