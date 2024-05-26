const User = require("../models/server");
const users = new User();
class quanliController {
  //[GET] /quanli
  index(req, res, next) {
    users.countAdvise((err, data) => {
      const count = data.map((user) => {
        return user.sl;
      });
      const newcount = count.join(", ");
      const user = req.session.usersname;

      // Sử dụng Promise để xử lý hàm bất đồng bộ
      const countTuitionPromise = new Promise((resolve, reject) => {
        users.countTuition((err, results) => {
          if (err) {
            reject(err);
          } else {
            resolve(results);
          }
        });
      });
      // Promise cho hàm countTeacher
      const countTeacherPromise = new Promise((resolve, reject) => {
        users.countTeacher((err, countTeacher) => {
          if (err) {
            reject(err);
          } else {
            resolve(countTeacher);
          }
        });
      });
      const countStudentPromise = new Promise((resolve, reject) => {
        users.countStudent((err, countStudent) => {
          if (err) {
            reject(err);
          } else {
            resolve(countStudent);
          }
        });
      });
      const countClassesPromise = new Promise((resolve, reject) => {
        users.countClass((err, countClasses) => {
          if (err) {
            reject(err);
          } else {
            resolve(countClasses);
          }
        });
      });
      // Đợi cả hai Promise hoàn thành
      Promise.all([
        countTuitionPromise,
        countTeacherPromise,
        countStudentPromise,
        countClassesPromise,
      ])
        .then((values) => {
          var countT;
          var countTC;
          var countS;
          var countC;
          const countTuition = values[0];
          const countTeacher = values[1];
          const countStudent = values[2];
          const countClass = values[3];
          countTuition.map((value, key) => {
            return (countT = value.ct);
          });
          countTeacher.map((value, key) => {
            return (countTC = value.cgv);
          });
          countStudent.map((values, key) => {
            return (countS = values.cs);
          });
          countClass.map((values, key) => {
            return (countC = values.cs);
          });
          res.render("./quanli/dashboard", {
            user,
            newcount,
            countS,
            countT,
            countTC,
            countC,
          });
        })
        .catch((err) => {
          console.error("Error:", err);
        });
    });
  }
  user(req, res, next) {}
}

module.exports = new quanliController();
