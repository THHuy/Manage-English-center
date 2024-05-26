const { error } = require("console");
const Student = require("../models/server");
const { user } = require("./quanliController");
const student = new Student();
class studentController {
  //[GET] /Student
  async student(req, res, next) {
    const user = req.session.usersname;
    const limit = 10; // Số lượng học sinh trên mỗi trang
    const page = req.query.page || 1; // Trang hiện tại, mặc định là trang 1
    const offset = (page - 1) * limit;
    student.select(limit, offset, (err, student) => {
      if (err) {
        res.status(500).json({ error: "Error fetching users" });
        return;
      }
      res.render("./student/student", { student, user });
    });
  }
  //[GET /student/reserve
  reserve(req, res, next) {
    const user = req.session.usersname;
    const limit = 10; // Số lượng học sinh trên mỗi trang
    const page = req.query.page || 1; // Trang hiện tại, mặc định là trang 1
    const offset = (page - 1) * limit;
    student.select(limit, offset, (err, student) => {
      if (err) {
        res.status(500).json({ error: "Error fetching users" });
        return;
      }
      res.render("./student/reserve", { student, user });
    });
  }
  //[GET] /student/advise
  advise(req, res, next) {
    student.selectAdvise((err, student) => {
      const user = req.session.usersname;
      if (err) {
        res.status(500).json({ error: "Error fetching users" });
        return;
      }
      res.render("./student/advise", { student, user });
    });
  }
  //[GET] /student/addStudent
  formAddStudent(req, res, next) {
    const user = req.session.usersname;
    res.render("./student/addStudent", { user });
  }
  //[POST] /student/addstudent
  async addStudent(req, res, next) {
    const fullname = req.body.fullname;
    const gt = req.body.gt;
    const phone = req.body.phone;
    const dc = req.body.dc;
    const email = req.body.email;
    const school = req.body.school;
    const birthday = req.body.birthday;
    const user = req.session.usersname;
    try {
      await student.create(
        fullname,
        gt,
        phone,
        dc,
        email,
        school,
        birthday,
        (err, results) => {
          if (err) {
            res.render("./student/addStudent", {
              user,
              error: "Lỗi thêm không thành công",
            });
          } else {
            res.render("./student/addStudent", {
              user,
              success: "Thêm thành công",
            });
          }
        }
      );
    } catch {
      console.error(error);
    }
  }
  //[GET] /student/updateStudent/
  formUpdateStudent(req, res, next) {
    const successMessage = req.session.success;
    req.session.success = null;
    const mahv = req.query.mahv;
    const user = req.session.usersname;
    student.getSinhVienByMaHS(mahv, (err, student) => {
      if (err) {
        res.status(500).json({ error: "Error fetching users" });
        return;
      }
      res.render("./student/updateStudent", {
        student,
        user,
        success: successMessage,
      });
    });
  }
  //[PUT] /student/updateS
  async updateStudent(req, res, next) {
    const data = req.body;
    const mahv = req.query.mahv;
    try {
      await student.update(data, mahv, (err, results) => {
        if (err) {
          console.log(err);
        }
        req.session.success = "Thành công";
        res.redirect("back");
      });
    } catch {
      console.log(next);
    }
  }
  //[PUT] /student/deleled/
  async deteledStudent(req, res, next) {
    const mahv = req.query.mahv;
    try {
      await student.softDelete(mahv);
      res.redirect("back");
    } catch {
      console.log(next);
    }
  }
  //[GET] /student/deleteList
  deleteList(req, res, next) {
    const user = req.session.usersname;
    student.selectDeleted((err, student) => {
      if (err) {
        res.status(500).json({ error: "Error fetching users" });
        return;
      }
      res.render("./student/deletedList", { student, user });
    });
  }
  //[PUT] /student/restore
  async restoreStudent(req, res, next) {
    const mahv = req.query.mahv;
    try {
      await student.restore(mahv);
      res.redirect("back");
    } catch {
      console.log(next);
    }
  }
  //[PATCH]
  async reserveStudent(req, res, next) {
    const mahv = req.query.mahv;
    try {
      await student.reserve(mahv);
      res.redirect("back");
    } catch (error) {
      res.status(500).json({ error: "Error" });
    }
  }
  //[GET] /student/reserveList
  reserveList(req, res, next) {
    const user = req.session.usersname;
    student.selectStudent((err, data) => {
      if (err) {
        res.status(404);
      }
      res.render("./student/reserveList", { data, user });
    });
  }
  //[PATCH] /student/reserveRestore
  async restoreReverve(req, res, next) {
    const mahv = req.query.mahv;
    try {
      await student.reserveRestore(mahv);
      res.redirect("back");
    } catch (error) {
      res.status(500).json({ error: "Error" });
    }
  }
  //[PATCH] /student/advise
  async doneAdvise(req, res, next) {
    const idkh = req.query.idkh;
    try {
      await student.doneAdvise(idkh, (err, results) => {
        if (err) {
          res.status(404).send({ error: err.message });
        } else {
          res.redirect("back");
        }
      });
    } catch (error) {
      console.log(error);
    }
  }
  //[GET] /student/information
  information(req, res, next) {
    const { mahv } = req.query;
    const user = req.session.usersname;
    student.select_student_class(mahv, (err, results) => {
      if (err) {
        console.log(err);
      }
      res.render("./student/information", { user, results });
    });
  }
}

module.exports = new studentController();
