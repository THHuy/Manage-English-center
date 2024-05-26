const connection = require("../../config/connectdb");
class Course {
  //Tạo khóa học
  createCourse(nameCourse, link, mota, author, magv, callback) {
    const query = `
    INSERT INTO course (title, link, mota, author, magv) 
    VALUES (?,?,?,?,?)`;
    connection.query(
      query,
      [nameCourse, link, mota, author, magv],
      (err, result) => {
        if (err) {
          return callback(err);
        } else {
          return callback(null, result);
        }
      }
    );
  }
  //Hiển thị khóa học
  selectCourse(callback) {
    const query = `SELECT * FROM course WHERE delete_at = 0 or delete_at IS NULL`;
    connection.query(query, (err, result) => {
      if (err) {
        return callback(err);
      } else {
        return callback(null, result);
      }
    });
  }
  //HIển thị khóa học theo mã khóa học
  selectCoursewithID(id, callback) {
    const query = `SELECT * FROM course WHERE idcourse = ?`;
    connection.query(query, id, (err, result) => {
      if (err) {
        return callback(err);
      } else {
        return callback(null, result);
      }
    });
  }
  //Sửa thông tin khóa học
  updatedCourse(id, title, link, mota) {
    const query = `UPDATE course SET title = ?, link = ?, mota = ? WHERE idcourse = ?`;
    connection.query(
      query,
      [`${title}`, `${link}`, `${mota}`, id],
      (err, result) => {
        if (err) {
          return err;
        } else {
          return result;
        }
      }
    );
  }
  //Xóa khóa học
  deletedCourse(id) {
    const query = `UPDATE course SET delete_at = 1 WHERE idcourse = ?`;
    connection.query(query, [id], (err, result) => {
      if (err) {
        return err;
      } else {
        return result;
      }
    });
  }
}
module.exports = Course;
