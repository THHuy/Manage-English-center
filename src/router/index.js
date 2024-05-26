const quanliRouter = require("./quanli.route");
const homeRouter = require("./home.route");
const scheduleRouter = require("./schedule.route");
const studentRouter = require("./sudent.route");
const courseRouter = require("./course.route");
const classRouter = require("./class.route");
const feeRouter = require("./fee.route");
const teacherRouter = require("./teacher.route");
const blogRouter = require("./blog.route");
const loginRouter = require("./login.route.js");
const giaovienRouter = require("./giaovien.route.js");
const authMiddleware = require("../middleware/auth.js");
const searchRouter = require("./search.route.js");
function route(app) {
  app.use("/", homeRouter);
  app.use("/quanli", authMiddleware, quanliRouter);
  app.use("/schedule", authMiddleware, scheduleRouter);
  app.use("/student", authMiddleware, studentRouter);
  app.use("/course", authMiddleware, courseRouter);
  app.use("/class", authMiddleware, classRouter);
  app.use("/fee", authMiddleware, feeRouter);
  app.use("/teacher", authMiddleware, teacherRouter);
  app.use("/blog", authMiddleware, blogRouter);
  app.use("/login", loginRouter);
  app.use("/giaovien", authMiddleware, giaovienRouter);
  app.use("/search", authMiddleware, searchRouter);
}
module.exports = route;
