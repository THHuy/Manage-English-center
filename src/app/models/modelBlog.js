const connection = require("../../config/connectdb");
class Course {
  //Tạo Blog
  createBlog(nameCourse, content, author, magv, callback) {
    const query = `INSERT INTO blog (title, content, author, magv) VALUES (?,?,?,?)`;
    connection.query(
      query,
      [nameCourse, content, author, magv],
      (err, result) => {
        if (err) {
          return callback(err);
        } else {
          return callback(null, result);
        }
      }
    );
  }
  //HIển thị blog
  selectedBlog(callBack) {
    const query = `SELECT * FROM blog WHERE delete_at = 0 or delete_at IS NULL`;
    connection.query(query, (err, result) => {
      if (err) {
        return callBack(err);
      } else {
        return callBack(null, result);
      }
    });
  }
  //Hiển thị blog theo mã mablog
  selectedBlogwithId(idblog, callBack) {
    const query = `SELECT * FROM blog WHERE (delete_at = 0 or delete_at IS NULL) and idblog=?`;
    connection.query(query, idblog, (err, result) => {
      if (err) {
        return callBack(err);
      } else {
        return callBack(null, result);
      }
    });
  }
  //Sửa blog theo mã mablog
  UpdatedBlog(idblog, title, content, callBack) {
    const query = `UPDATE blog SET title = ?, content = ? WHERE idblog = ?`;
    connection.query(query, [title, content, idblog], (err, result) => {
      if (err) {
        return callBack(err);
      } else {
        return callBack(null, result);
      }
    });
  }
  //Xóa bài đăng
  deletedBlog(idblog, callback) {
    const query = `UPDATE blog SET delete_at = 1  WHERE idblog = ?`;
    connection.query(query, idblog, (err, result) => {
      if (err) {
        return callback(err);
      } else {
        return callback(null, result);
      }
    });
  }
  //HIển thị bài đọc theo mã
  selectedBlogWithID(id, callBack) {
    const query = `SELECT * FROM blog WHERE idblog = ?`;
    connection.query(query, id, (err, result) => {
      if (err) {
        return callBack(err);
      } else {
        return callBack(null, result);
      }
    });
  }
}
module.exports = Course;
