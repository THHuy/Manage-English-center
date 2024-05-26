const Teacher = require("../models/modelTeacher");
const teacher = new Teacher();
const connection = require("../../config/connectdb");
const inClass = require("../models/modelClass");
const infclass = new inClass();
class TeacherController {
  //[GET] /inforTeacher
  teacher(req, res, next) {
    const successMessage = req.session.success;
    req.session.success = null;
    const user = req.session.usersname;
    teacher.select((err, teacher) => {
      if (err) {
        res.status(500).json({ error: "Error fetching teacher" });
        return;
      }
      res.render("./teacher/inforTeacher", {
        teacher,
        user,
        success: successMessage,
      });
    });
  }
  //[GET] /teacher/division
  async division(req, res, next) {
    const user = req.session.usersname;
    const successMessage = req.session.success;
    req.session.success = null;
    const errorMessage = req.session.error;
    req.session.error = null;
    try {
      teacher.data((err, data) => {
        // infclass.select((err, infclass) => {
        if (err) console.log(err);
        res.render("./teacher/division", {
          data,
          user,
          success: successMessage,
          error: errorMessage,
        });
      });
      // });
    } catch (err) {
      console.log(err);
    }
  }
  //[GET] /teacher/formAddTeacher
  formAddTeacher(req, res, next) {
    const successMessage = req.session.success;
    req.session.success = null;
    const user = req.session.usersname;
    res.render("./teacher/formAddTeacher", { user, success: successMessage });
  }
  //[POST] /teacher/addTeacher
  async addTeacher(req, res, next) {
    const fullname = req.body.fullname;
    const gt = req.body.gt;
    const phone = req.body.phone;
    const dc = req.body.dc;
    const email = req.body.email;
    const skill = req.body.skill;
    const school = req.body.school;
    const birthday = req.body.birthday;
    try {
      await teacher.create(
        fullname,
        gt,
        phone,
        dc,
        email,
        skill,
        school,
        birthday,
        (err, results) => {
          if (err) {
            console.log(err);
          }
          req.session.success = "Thành công";
          res.redirect("back");
        }
      );
    } catch {
      console.log(next);
    }
    // const { fullname, gt, phone, skill, birthday } = req.body;

    // // Tạo câu lệnh SQL
    // const sql = `INSERT INTO teacher (fullname, gt, phone, skill , birthday) VALUES (?, ?, ?, ?, ?)`;

    // // Thực thi câu lệnh SQL
    // connection.query(sql, [fullname, gt, phone, , birthday], (err, result) => {
    //   if (err) {
    //     console.error(err);
    //     res.status(500).send("Lỗi thêm giáo viên");
    //   } else {
    //     res.status(200).send("Thêm giáo viên thành công");
    //   }
    // });
  }
  //[GET] /teacher/updateTeacher/
  formUpdateTeacher(req, res, next) {
    const magv = req.query.magv;
    const user = req.session.usersname;
    const successMessage = req.session.success;
    req.session.success = null;
    teacher.getGiaovienByMaHS(magv, (err, teacher) => {
      if (err) {
        res.status(500).json({ error: "Error fetching teacher" });
        return;
      }
      res.render("./teacher/updateTeacher", {
        teacher,
        user,
        success: successMessage,
      });
    });
  }
  //PUT /teacher/updateT/
  updateTeacher(req, res, next) {
    const skills = req.body.skilled;
    const skill = req.body.skill;
    const fullname = req.body.fullname;
    const gt = req.body.gt;
    const phone = req.body.phone;
    const dc = req.body.dc;
    const email = req.body.email;
    const school = req.body.school;
    const birthday = req.body.birthday;
    const magv = req.query.magv;
    req.session.success = "Thành công";
    if (skill === undefined) {
      teacher.update(
        fullname,
        gt,
        phone,
        dc,
        email,
        skills,
        school,
        birthday,
        magv,
        (err, data) => {
          if (err) {
            console.log(err);
          }

          res.redirect("/teacher");
        }
      );
    } else {
      teacher.update(
        fullname,
        gt,
        phone,
        dc,
        email,
        skill,
        school,
        birthday,
        magv,
        (err, data) => {
          if (err) {
            console.log(err);
          }
          res.redirect("/teacher");
        }
      );
    }

    // Tạo câu lệnh SQL
    // const sql = `UPDATE teacher SET fullname =?, gt = ?, phone = ?, skill = ?, birthday = ? WHERE magv = ?`;
    // // Thực thi câu lệnh SQL
    // connection.query(
    //   sql,
    //   [fullname, gt, phone, [`${skill}`], birthday, magv],
    //   (err, result) => {
    //     if (err) {
    //       console.error(err);
    //       res.status(500).send("Lỗi sửa giáo viên");
    //     } else {
    //       res.status(200).send("Sửa giáo viên thành công");
    //     }
    //   }
    // );
  }
  //[GET] /teacher/deleteList
  deleteList(req, res, next) {
    const user = req.session.usersname;
    teacher.selectDeleted((err, teacher) => {
      if (err) {
        res.status(500).json({ error: "Error fetching users" });
        return;
      }
      res.render("./teacher/deleteList", { teacher, user });
    });
  }
  //[PUT] /teacher/deleled/
  async deteledTeacher(req, res, next) {
    const magv = req.query.magv;
    try {
      await teacher.softDelete(magv);
      res.redirect("back");
    } catch {
      console.log(next);
    }
  }
  //[PUT] /teacher/restore
  async restoreTeacher(req, res, next) {
    const magv = req.query.magv;
    try {
      await teacher.restore(magv);
      res.redirect("back");
    } catch {
      console.log(next);
    }
  }
  //[GET] /teacher/divisionList
  async getAssign(req, res, next) {
    const user = req.session.usersname;
    const limit = 10; // Số lượng học sinh trên mỗi trang
    const page = req.query.page || 1; // Trang hiện tại, mặc định là trang 1
    const offset = (page - 1) * limit;
    const successMessage = req.session.success;
    req.session.success = null;
    const errorMessage = req.session.error;
    req.session.error = null;
    teacher.selectAssign(limit, offset, (err, teacher) => {
      if (err) {
        res.status(500).json({ error: "Error fetching teacher" });
        return;
      }
      res.render("teacher/assignList", {
        teacher,
        user,
        success: successMessage,
        error: errorMessage,
      });
    });
  }
  //[[GET]] /teacher/create_form
  create_users(req, res, next) {
    const user = req.session.usersname;
    res.render("teacher/form_create_users", { user });
  }
  //[POST /teacher/create_post
  created_post(req, res, next) {
    const { usersname, magv, pass, roles } = req.body;
    teacher.create_users(usersname, magv, pass, roles, (err, user) => {
      if (err) {
        res.render("./teacher/form_create_users", {
          user,
          error:
            "Tạo tài khoản thất bại do trùng tên đăng nhập hoặc mã giáo viên",
        });
      } else {
        res.render("./teacher/form_create_users", {
          user,
          success: "Tạo tài khoản thành công",
        });
      }
    });
  }
  //[GET] /teacher/users_list
  users_list(req, res, next) {
    const successMessage = req.session.success;
    req.session.success = null;
    const user = req.session.usersname;
    teacher.select_users((err, results) => {
      if (err) {
        console.log(err);
      }
      res.render("./teacher/user_list", {
        user,
        results,
        success: successMessage,
      });
    });
  }
  //[GET] /teacher/users_update/?magv
  users_update(req, res, next) {
    const magv = req.query.magv;
    const user = req.session.usersname;
    const successMessage = req.session.success;
    req.session.success = null;
    teacher.select_users_with_magv(magv, (err, results) => {
      if (err) {
        console.log(err);
      }
      res.render("./teacher/update_users", {
        user,
        results,
        success: successMessage,
      });
    });
  }
  //[PUT] /teacher/update_put
  update_put(req, res, next) {
    const data = req.body;
    const magv = req.body.magv;
    teacher.update_put(data, magv, (err, results) => {
      if (err) {
        console.log(err);
      } else {
        req.session.success = "Thành công";
        res.redirect("back");
      }
    });
  }
  //[DELETE] /teacher/deleted_users/
  deleted_users(req, res, next) {
    const magv = req.query.magv;
    teacher.deleted_users(magv, (err, results) => {
      if (err) {
        console.log(err);
      } else {
        req.session.success = "Thành công";
        res.redirect("back");
      }
    });
  }
  //[DELETED] /teacher/deleted_assign
  deleted_assign(req, res, next) {
    const id = req.query.id;
    teacher.deleted_assign(id, (err, results) => {
      if (err) {
        req.session.error = "Thất bại";
        res.redirect("back");
      } else {
        req.session.success = "Thành công";
        res.redirect("back");
      }
    });
  }
  //[GET] /teacher/information
  information(req, res, next) {
    const magv = req.query.magv;
    const user = req.session.usersname;
    teacher.getGiaovienByMaHS(magv, (err, results) => {
      if (err) {
        res.status(500).json({ error: "Error fetching teacher" });
        return;
      }
      teacher.class_for_teacher(magv, (err, data) => {
        res.render("./teacher/information", {
          results,
          user,
          data,
        });
      });
    });
  }
}

module.exports = new TeacherController();
