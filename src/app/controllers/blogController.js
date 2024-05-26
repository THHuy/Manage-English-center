const Blog = require("../models/modelBlog");
const blog = new Blog();
class blogController {
  //[GET] /blog
  index(req, res, next) {
    const user = req.session.usersname;
    blog.selectedBlog((err, blog) => {
      if (err) {
        console.log(err);
      }
      res.render("./blog/blog", { blog, user });
    });
  }
  //[GET] /blog/formBlog
  formBlog(req, res, next) {
    const user = req.session.usersname;
    res.render("./blog/formAddBlog", { user });
  }
  //[POST] /blog/postBlog
  postBlog(req, res, next) {
    const { title, content } = req.body;
    const author = req.session.usersname;
    const magv = req.session.magv;
    try {
      blog.createBlog(title, content, author, magv, (err, result) => {
        if (err) {
          console.log(err);
        } else if (magv) {
          res.render("./giaovien/form_addBlog", {
            user: author,
            success: "Thêm thành công",
          });
        } else {
          res.render("./blog/formAddBlog", {
            user: author,
            success: "Thêm thành công",
          });
        }
      });
    } catch (err) {
      console.log(err);
    }
  }
  //[GET /blog/formUpdatedBlog
  async formUpdatedBlog(req, res, next) {
    const user = req.session.usersname;
    const id = req.query.idblog;
    try {
      await blog.selectedBlogwithId(id, (err, blog) => {
        if (err) {
          console.log(err);
        }
        res.render("./blog/formUpdatedBlog", { blog, user });
      });
    } catch {
      console.log(err);
    }
  }
  //PUT /blog/formUpdatedBlog/{id}
  async updatedBlog(req, res, next) {
    const idblog = req.query.idblog;
    const user = req.session.usersname;
    const { title, content } = req.body;
    try {
      await blog.UpdatedBlog(idblog, title, content, (err, result) => {
        if (err) {
          console.log(err);
        } else if (user == "admin") {
          res.redirect("/blog");
        } else {
          res.redirect("/giaovien/blog");
        }
      });
    } catch {
      console.log(err);
    }
  }
  //PATCH /blog/deletedBlog/
  async deletedBlog(req, res, next) {
    const admin = req.session.usersname;
    const id = req.query.idblog;
    if (admin == "admin") {
      try {
        await blog.deletedBlog(id, (err, result) => {
          if (err) {
            console.log(err);
          }
          res.redirect("back");
        });
      } catch {
        console.log(err);
      }
    } else {
      try {
        await blog.deletedBlog(id, (err, result) => {
          if (err) {
            console.log(err);
            res.redirect("/giaovien/blog");
          }
        });
      } catch {
        console.log(err);
      }
    }
  }
}

module.exports = new blogController();
