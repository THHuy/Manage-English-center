const e = require("express");
const connection = require("../../config/connectdb");
class fee {
  //Hiển thị danh sách lớp
  selectedFee(limit, offset, callback) {
    const query = `
    SELECT c.*, MAX(t.fullname) AS fullname, COUNT(e.mahv) AS total_students
    FROM assign a
    INNER JOIN class c ON a.idclass = c.id
    INNER JOIN teacher t ON a.magv = t.magv
    LEFT JOIN Enrollments e ON c.id = e.idclass AND (e.mahv IN (SELECT s.mahv FROM student s WHERE (s.deleted_at IS NULL or s.deleted_at = 'no') and (reserve IS NULL or reserve = 0)))
    WHERE (done_at IS NULL OR done_at = '0')
    GROUP BY c.id, c.nameclass
    ORDER BY a.idclass
    LIMIT ? OFFSET ?`;
    connection.query(query, [limit, offset], (err, result) => {
      if (err) {
        return callback(err);
      } else {
        return callback(null, result);
      }
    });
  }
  //HIỂN THỊ DANH SÁCH LỚP VÀ HỌC VIÊN
  selectedStudentFee(id, callback) {
    const query = `
    SELECT s.mahv, s.fullname, f.*, CASE WHEN t.payment_date IS NOT NULL THEN 'Đã đóng' ELSE 'Chưa đóng' END AS Payment_Status,
    CASE WHEN t.payment_date IS NOT NULL THEN t.payment_date ELSE 'Chưa đóng' END AS Payment_date
    FROM student s
    LEFT JOIN Enrollments e ON e.mahv = s.mahv
    LEFT JOIN class c ON c.id = e.idclass
    LEFT JOIN tuition t ON t.mahv = s.mahv
    LEFT JOIN fee f ON c.skill = f.name_fee
    LEFT JOIN fee ON t.fee_id = fee.id_fee
    WHERE (s.deleted_at IS NULL or s.deleted_at = 'no') and (reserve IS NULL or reserve = 0) AND (s.mahv in (select mahv from Enrollments))
    AND (e.idclass = ?) 
    GROUP BY s.mahv, f.id_fee, t.id
    `;
    connection.query(query, id, (err, results) => {
      if (err) {
        return callback(err);
      } else {
        return callback(null, results);
      }
    });
  }
  //Hoàn thành học phí
  doneFee(mahv, idfee, callback) {
    const query = `INSERT INTO tuition (mahv, fee_id)
    VALUES (?, ?)
    
    `;
    connection.query(query, [mahv, idfee], (err, results) => {
      if (err) {
        return callback(err);
      } else {
        return callback(null, results);
      }
    });
  }
  //Hiển thị thông tin học phí
  fee(callback) {
    const query = `
    SELECT * FROM fee`;
    connection.query(query, (err, results) => {
      if (err) {
        return callback(err);
      } else {
        return callback(null, results);
      }
    });
  }
}
module.exports = fee;
