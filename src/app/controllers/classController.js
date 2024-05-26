const { error } = require("console");
const inClass = require("../models/modelClass");
const infclass = new inClass();
const Student = require("../models/server");
const student = new Student();
class classController {
  //[GET] /class
  async index(req, res, next) {
    const limit = 10; // Số lượng học sinh trên mỗi trang
    const page = req.query.page || 1; // Trang hiện tại, mặc định là trang 1
    const offset = (page - 1) * limit;
    const user = req.session.usersname;
    infclass.select(limit, offset, (err, inClass) => {
      if (err) {
        res.status(500).json({ error: "Error fetching users" });
        return;
      }
      res.render("./class/inforClass", { inClass, user });
    });
  }
  //[GET] /class/information
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
          res.render("./class/information", { results, user, student });
        });
      }
    });
  }
  //[GET] /class/creatClass
  creatClass(req, res, next) {
    const successMessage = req.session.success;
    req.session.success = null;
    const errorMessage = req.session.error;
    req.session.error = null;
    const user = req.session.usersname;
    res.render("./class/creatClass", {
      user,
      success: successMessage,
      error: errorMessage,
    });
  }
  //[POST] /class//addClass
  async addClass(req, res, next) {
    const { nameclass, skill, phong, ngayhoc, giohoc, buoihoc } = req.body;
    try {
      infclass.create(
        nameclass,
        skill,
        phong,
        ngayhoc,
        giohoc,
        buoihoc,
        (err, resus) => {
          if (err) {
            req.session.error = "Thất bại";
            res.redirect("back");
          } else {
            req.session.success = "Thành công";
            res.redirect("back");
          }
        }
      );
    } catch (err) {
      console.log(err);
    }
  }
  //[GET]  /class/updateClass/
  async formUpdateClass(req, res, next) {
    const user = req.session.usersname;
    const id = req.query.id;
    infclass.getClassbyID(id, (err, inclass) => {
      if (err) {
        res.status(500).json({ error: "Error fetching users" });
        return;
      }
      res.render("./class/formupdate", { inclass, user });
    });
  }
  //[PUT] /class/updateClass
  async updateClass(req, res, next) {
    const data = req.body;
    const id = req.query.id;
    try {
      await infclass.update(data, id, (err, callback) => {
        res.redirect("/class");
      });
    } catch {
      console.log(error);
    }
  }
  //[PUT] /class/done
  async doneClass(req, res, next) {
    const id = req.query.id;
    try {
      infclass.done(id);
      res.redirect("back");
    } catch (err) {
      console.log(err);
    }
  }
  //[GET] /class/doneClassList
  doneClassList(req, res, next) {
    const user = req.session.usersname;
    infclass.doneSelect((err, list) => {
      if (err) {
        console.log(err);
      } else {
        res.render("./class/doneClassList", { list, user });
      }
    });
  }
  //[PATCH] /class/restore
  async restoreClass(req, res, next) {
    const id = req.query.id;
    try {
      infclass.restore(id);
      res.redirect("back");
    } catch (err) {
      console.log(err);
    }
  }
  //[GET] /class/arrangenClass
  arrangenClass(req, res, next) {
    const user = req.session.usersname;
    const limit = 14; // Số lượng học sinh trên mỗi trang
    const page = req.query.page || 1; // Trang hiện tại, mặc định là trang 1
    const offset = (page - 1) * limit;
    infclass.select(limit, offset, (err, inClass) => {
      if (err) {
        res.status(500).json({ error: "Error fetching users" });
        return;
      }
      res.render("./class/arrangenClass", { inClass, user });
    });
  }
  //[GET] /class/addStudentToClass
  addStudentToClass(req, res, next) {
    const user = req.session.usersname;
    const id = req.query.id;
    infclass.getClassbyID(id, (err, results) => {
      if (err) {
        res.status(404).send("Lỗi");
      } else {
        infclass.studentNoClass((err, student) => {
          if (err) {
            res.status(404).send("Lỗi");
            return;
          }
          res.render("./class/studentToClass", { results, student, user });
        });
      }
    });
  }
  //[POST] /class/addStudentToClass
  async addStudent(req, res, next) {
    const { idStudent, idclass } = req.query;
    try {
      await infclass.addStudent(idclass, idStudent, (err, results) => {
        if (err) {
          console.log(err);
        } else {
          res.redirect("back");
        }
      });
    } catch (err) {
      console.log(err);
    }
  }

  //[GET] /class/score
  score(req, res, next) {
    const user = req.session.usersname;
    const limit = 10; // Số lượng học sinh trên mỗi trang
    const page = req.query.page || 1; // Trang hiện tại, mặc định là trang 1
    const offset = (page - 1) * limit;
    infclass.select(limit, offset, (err, results) => {
      res.render("./class/score", { results, user });
    });
  }
  //[GET] /class/scoreID
  scoreWithIdClass(req, res, next) {
    const user = req.session.usersname;
    const id = req.query.id;
    const successMessage = req.session.success;
    req.session.success = null;
    const errorMessage = req.session.error;
    req.session.error = null;
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
          res.render("./class/scoreID", {
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
  //[GET] /class/scoreUpdate
  scoreUpdate(req, res, next) {
    const user = req.session.usersname;
    const id = req.query.id;
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
          res.render("./class/scoreUpdate", { results, student, user });
        });
      }
    });
  }
  //[PUT] /class/updatedScore
  async updatedScore(req, res, next) {
    const { mahv, score, score_id } = req.query;
    await infclass.updatedScore(mahv, score, score_id, (err, results) => {
      if (err) {
        console.log(err);
      } else {
        res.redirect("back");
      }
    });
  }
  //[POST] /class/addScore
  addScore(req, res, next) {
    const data = req.body;
    const idscore = data.idscore;
    const studentIds = data.mahv;
    const scores = data.score;
    const values = [];
    if (Array.isArray(studentIds)) {
      for (let i = 0; i < studentIds.length; i++) {
        values.push([studentIds[i], idscore, scores[i]]);
      }
      infclass.addScoreStudent([values], (err, results) => {
        if (err) {
          req.session.error = "Thất bại";
          res.redirect("back");
        } else {
          req.session.success = "Thành công";
          res.redirect("back");
        }
      });
    } else {
      values.push([studentIds, idscore, scores]);
      infclass.addScoreStudent([values], (err, results) => {
        if (err) {
          req.session.error = "Thất bại";
          res.redirect("back");
        } else {
          req.session.success = "Thành công";
          res.redirect("back");
        }
      });
    }

    // Tạo mảng các giá trị để chèn vào cơ sở dữ liệu
  }
  //[GET] /class/changeClass
  changeClass(req, res, next) {
    const user = req.session.usersname;
    const limit = 10; // Số lượng học sinh trên mỗi trang
    const page = req.query.page || 1; // Trang hiện tại, mặc định là trang 1
    const offset = (page - 1) * limit;
    infclass.selectStudentInClass(limit, offset, (err, student) => {
      if (err) {
        console.log(err);
        res.status(500).json({ error: "Error fetching users" });
        return;
      }
      res.render("./class/changeClass", { student, user });
    });
  }
  //[GET] /class/change
  getClassToChange(req, res, next) {
    const user = req.session.usersname;
    const id = req.query.mahv;
    const limit = 10; // Số lượng học sinh trên mỗi trang
    const page = req.query.page || 1; // Trang hiện tại, mặc định là trang 1
    const offset = (page - 1) * limit;
    infclass.selectStudentInClassWithID(id, (err, student) => {
      if (err) {
        // console.log(err);
        // return;
      }
      infclass.select(limit, offset, (err, results) => {
        if (err) {
          res.status(500).json({ error: "Error fetching users" });
          return;
        }
        res.render("./class/change", { student, results, user });
      });
    });
  }
  //[PUT] /class/changeClass
  async putChangeClass(req, res, next) {
    const { idStudent, idclass } = req.query;
    try {
      await infclass.putChangeClass(idStudent, idclass, (err, result) => {
        if (err) {
          res.status(404).send("error");
        }
        res.redirect("/class/changeClass");
      });
    } catch {
      console.log(err);
    }
  }
  //[GET] /class/attend
  attend(req, res, next) {
    const user = req.session.usersname;
    const limit = 10; // Số lượng học sinh trên mỗi trang
    const page = req.query.page || 1; // Trang hiện tại, mặc định là trang 1
    const offset = (page - 1) * limit;
    infclass.select(limit, offset, (err, results) => {
      res.render("./class/attend", { results, user });
    });
  }
  //[GET] /class/attend-class
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
          res.render("./class/attendclass", { results, student, user });
        });
      }
    });
  }
  //[POST] /class/attend-student
  attendStudent(req, res, next) {
    const idclass = req.query.idclass;
    const { dateAttend, mahv, attendance_status } = req.body;
    const values = [];
    if (Array.isArray(mahv)) {
      for (let i = 0; i < mahv.length; i++) {
        values.push([mahv[i], dateAttend, attendance_status[i], idclass]);
      }
      infclass.attend(values, (err, results) => {
        if (err) {
          console.log(err);
        }
        res.redirect("back");
      });
    } else {
      values.push([mahv, dateAttend, attendance_status, idclass]);
      infclass.attend(values, (err, results) => {
        if (err) {
          console.log(err);
        }
        res.redirect("back");
      });
    }
  }
  //[POST] /class/assign/
  addTeacher(req, res, next) {
    const data = req.query;
    try {
      infclass.addTeacher(data, (err, results) => {
        if (err) {
          req.session.error = "Thất bại";
          res.redirect("back");
        } else {
          req.session.success = "Thành công";
          res.redirect("back");
        }
      });
    } catch (err) {
      console.log(err.status(404));
    }
  }
}

module.exports = new classController();
