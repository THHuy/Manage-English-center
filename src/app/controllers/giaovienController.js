const User = require("../models/server");
const users = new User();
const Giaovien = require("../models/modelGiaovien");
const giaovien = new Giaovien();
const inClass = require("../models/modelClass");
const infclass = new inClass();
const Blog = require("../models/modelBlog");
const blog = new Blog();
const Course = require("../models/modelCourse");
const course = new Course();
const Student = require("../models/server");
const student = new Student();
class giaovienController {
  //[GET] /giaovien
  index(req, res, next) {
    const user = req.session.usersname;
    const magv = req.session.magv;
    console.log(magv);
    infclass.getClassbyIDGV(magv, (err, results) => {
      if (err) console.log(err);
      res.render("./giaovien/dashboard", { user, magv, results });
    });
  }
  user(req, res, next) {}
  //[[GET] /giaovien/blog
  blog(req, res, next) {
    const magv = req.session.magv;
    const user = req.session.usersname;
    giaovien.blog(magv, (err, blog) => {
      if (err) {
        console.log(err);
      }
      res.render("./giaovien/blogforgiaovien", { blog, user });
    });
  }
  //[GET] /giaovien/course
  course(req, res, next) {
    const magv = req.session.magv;
    const user = req.session.usersname;
    giaovien.course(magv, (err, course) => {
      if (err) {
        console.log(err);
      }
      res.render("./giaovien/courseforgiaovien", { course, user });
    });
  }
  //[GET] /giaovien/class
  class(req, res, next) {
    const user = req.session.usersname;
    const magv = req.session.magv;
    giaovien.class(magv, (err, inClass) => {
      res.render("./giaovien/classforgiaovien", { inClass, user });
    });
  }
  //[GET] /giaovien/score
  score(req, res, next) {
    const user = req.session.usersname;
    const magv = req.session.magv;
    giaovien.class(magv, (err, results) => {
      res.render("./giaovien/scoreforgiaovien", { results, user });
    });
  }
  //[GET] /giavien/scoreID
  scoreID(req, res, next) {
    const successMessage = req.session.success;
    req.session.success = null;
    const errorMessage = req.session.error;
    req.session.error = null;
    const id = req.query.id;
    const user = req.session.usersname;
    infclass.getClassbyID(id, (err, results) => {
      if (err) {
        res.status(404).send("Lỗi");
      } else {
        const id = req.query.id;
        infclass.selectScore(id, (err, student) => {
          if (err) {
            res.status(404).send("Lỗi");
            return;
          }
          res.render("./giaovien/scoreIDforgiaovien", {
            results,
            student,
            user,
            success: successMessage,
            error: errorMessage,
          });
        });
      }
    });
  }
  //[GET]/giavien/attend
  attend(req, res, next) {
    const magv = req.session.magv;
    const user = req.session.usersname;
    giaovien.class(magv, (err, results) => {
      res.render("./giaovien/attendforgiaovien", { results, user });
    });
  }
  //[GET] /giaovien/attend-class
  attendClass(req, res, next) {
    const id = req.query.id;
    const user = req.session.usersname;
    infclass.getClassbyID(id, (err, results) => {
      if (err) {
        res.status(404).send("Lỗi");
      } else {
        const id = req.query.id;
        infclass.selectAttend(id, (err, student) => {
          if (err) {
            res.status(404).send("Lỗi");
            return;
          }
          res.render("./giaovien/attend-class", { results, student, user });
        });
      }
    });
  }
  //[GET] /giaovien/formBlog
  formBlog(req, res, next) {
    const user = req.session.usersname;
    res.render("./giaovien/form_addBlog", { user });
  }
  //[GET] /giaovien/addCourse
  addCourse(req, res, next) {
    const successMessage = req.session.success;
    req.session.success = null;
    const user = req.session.usersname;
    res.render("./giaovien/addCourse", { user, success: successMessage });
  }
  //[GET] /giaovien/formUpdatedBlog
  async formUpdatedBlog(req, res, next) {
    const successMessage = req.session.success;
    req.session.success = null;
    const user = req.session.usersname;
    const id = req.query.idblog;
    try {
      await blog.selectedBlogwithId(id, (err, blog) => {
        if (err) {
          console.log(err);
        }
        res.render("./giaovien/updated_blog", {
          blog,
          user,
          success: successMessage,
        });
      });
    } catch {
      console.log(err);
    }
  }
  //[GET] /giaovien/UpdateCourse
  UpdateCourse(req, res, next) {
    const successMessage = req.session.success;
    req.session.success = null;
    const id = req.query.idcourse;
    const user = req.session.usersname;
    course.selectCoursewithID(id, (err, course) => {
      res.render("./giaovien/update_course", {
        course,
        user,
        success: successMessage,
      });
    });
  }
  //[GET] /giaovien/information
  information(req, res, next) {
    const id = req.query.id;
    const user = req.session.usersname;
    infclass.getClassbyID(id, (err, results) => {
      if (err) {
        res.status(404).send(err);
      } else {
        student.student_in_class(id, (err, student) => {
          if (err) {
            console.log(err);
          }
          res.render("./giaovien/information_class", {
            results,
            user,
            student,
          });
        });
      }
    });
  }
}

module.exports = new giaovienController();
