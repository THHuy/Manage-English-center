const Database = require("../models/server");
const database = new Database();
class loginController {
  //[GET] /login
  index(req, res, next) {
    res.render("./login/login");
  }
  //[POST] /login/check
  async check(req, res, next) {
    const { usersname, password } = req.body;
    try {
      await database.checkLogin(usersname, password, (err, users) => {
        if (users.length == 0 || err) {
          res.render("./login/login", {
            error: "Tên đăng nhập hoặc mật khẩu không chính xác.",
          });
        } else {
          users.forEach((element) => {
            req.session.usersname = usersname;
            if (element.roles === "admin") {
              res.redirect("/quanli");
            } else {
              const magv = element.magv;
              req.session.magv = magv;
              res.redirect("/giaovien");
            }
          });
        }
      });
    } catch {}
  }
  logout(req, res, next) {
    if (req.session) {
      req.session.destroy((err) => {
        if (err) {
          console.error("Error destroying session:", err);
        } else {
          console.log("Session destroyed successfully.");
          res.redirect("/login"); // Chuyển hướng sau khi destroy session
        }
      });
    } else {
      console.log("No session to destroy.");
      res.redirect("/login"); // Chuyển hướng nếu không có session
    }
  }
}

module.exports = new loginController();
