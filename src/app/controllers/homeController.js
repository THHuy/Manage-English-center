const Course = require("../models/modelCourse");
const course = new Course();
const Blog = require("../models/modelBlog");
const blog = new Blog();
const TuVan = require("../models/modelTuVan");
const tuvan = new TuVan();
const Fee = require("../models/modelFee");
const fee = new Fee();
const inClass = require("../models/modelClass");
const infclass = new inClass();
class homeController {
  //[GET] /home
  index(req, res, next) {
    course.selectCourse((err, course) => {
      if (err) {
        console.log(err);
      }
      blog.selectedBlog((err, blog) => {
        if (err) {
          console.log(err);
        }
        res.render("./home/home", { course, blog });
      });
    });
  }
  //[GET] /home/read
  read(req, res, next) {
    const id = req.query.id;
    blog.selectedBlogWithID(id, (err, blogID) => {
      course.selectCourse((err, course) => {
        if (err) {
          console.log(err);
        }
        blog.selectedBlog((err, blog) => {
          if (err) {
            console.log(err);
          }
          if (err) {
            console.log(err);
          }
          res.render("./home/readBlog", { course, blog, blogID });
        });
      });
    });
  }
  //[GET] /home/tuvan
  tuvan(req, res, next) {
    course.selectCourse((err, course) => {
      if (err) {
        console.log(err);
      }
      res.render("./home/tuvan", { course });
    });
  }
  //[POST] /posttuvan
  async createTuVan(req, res, next) {
    const { yourname, email, phonenumber, address, yearold, information } =
      req.body;
    try {
      await tuvan.createTuVan(
        yourname,
        email,
        phonenumber,
        address,
        yearold,
        information,
        (err, result) => {
          if (err) {
            console.log(err);
          }
        }
      );
      res.redirect("back");
    } catch (error) {
      console.log(error);
    }
  }
  // hoc-phi
  hocphi(req, res, next) {
    course.selectCourse((err, course) => {
      if (err) {
        console.log(err);
      }
      blog.selectedBlog((err, blog) => {
        if (err) {
          console.log(err);
        }
        fee.fee((err, result) => {
          res.render("./home/hocphi", { result, course, blog });
        });
      });
    });
  }
  // /lophoc
  lophoc(req, res, next) {
    const limit = 10; // Số lượng học sinh trên mỗi trang
    const page = req.query.page || 1; // Trang hiện tại, mặc định là trang 1
    const offset = (page - 1) * limit;
    course.selectCourse((err, course) => {
      if (err) {
        console.log(err);
      }
      blog.selectedBlog((err, blog) => {
        if (err) {
          console.log(err);
        }
        infclass.select(limit, offset,(err, result) => {
          res.render("./home/lophoc", { result, course, blog });
        });
      });
    });
  }
}

module.exports = new homeController();
