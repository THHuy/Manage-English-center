const connection = require("../../config/connectdb");
class giaovien {
  //hiển thị blog theo mã gv
  blog(magv, callback) {
    const query = `SELECT * 
        FROM blog b
        WHERE (delete_at = 0 or delete_at IS NULL) AND b.magv = ?`;
    connection.query(query, magv, (err, result) => {
      if (err) {
        return callback(err);
      } else {
        return callback(null, result);
      }
    });
  }
  //hiển thị couser theo mã gv
  course(magv, callback) {
    const query = `SELECT * FROM course WHERE (delete_at = 0 or delete_at IS NULL) AND magv = ? `;
    connection.query(query, magv, (err, result) => {
      if (err) {
        return callback(err);
      } else {
        return callback(null, result);
      }
    });
  }
  //Hiển thị lớp học
  class(magv, callback) {
    const query = `SELECT c.*, MAX(t.fullname) AS fullname, COUNT(e.mahv) AS total_students
    FROM assign a
    INNER JOIN class c ON a.idclass = c.id
    INNER JOIN teacher t ON a.magv = t.magv
    LEFT JOIN Enrollments e ON c.id = e.idclass AND (e.mahv IN (SELECT s.mahv FROM student s WHERE (s.deleted_at IS NULL or s.deleted_at = 'no') and (reserve IS NULL or reserve = 0)))
    WHERE (done_at IS NULL OR done_at = '0') AND t.magv = ?
    GROUP BY c.id, c.nameclass
    ORDER BY a.idclass`;
    connection.query(query, magv, (err, results) => {
      if (err) {
        return callback(err);
      } else {
        return callback(null, results);
      }
    });
  }
}
module.exports = giaovien;
