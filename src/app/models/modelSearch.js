const connection = require("../../config/connectdb");
class search {
  //Hiển thị tìm kiếm
  search(type, query, callback) {
    let sql = ``;
    switch (type) {
      case "student":
        sql = `
        SELECT * 
        FROM student 
        WHERE (deleted_at IS NULL or deleted_at = 'no') 
        AND (reserve IS NULL or reserve = 0)
        AND (fullname LIKE ?)`;
        break;
      case "teacher":
        sql = `
        SELECT * 
        FROM teacher 
        WHERE ( deleted_at IS NULL or deleted_at = '0' ) 
        AND (fullname LIKE ?)`;
        break;
      case "class":
        sql = `SELECT *
        FROM class c
        WHERE (done_at IS NULL OR done_at = '0') 
        AND (nameclass LIKE ?)`;
        break;
      default:
        return callback("Lỗi không tìm thấy dữ liệu");
    }
    connection.query(sql, `%${query}%`, (err, results) => {
      if (err) {
        return callback(err);
      } else {
        return callback(null, results);
      }
    });
  }
}
module.exports = search;
