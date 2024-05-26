const connection = require("../../config/connectdb");
class Student {
  //Truy vấn thêm học viên
  async create(fullname, gt, phone, dc, email, school, birthday, callback) {
    const query = `INSERT INTO student(fullname, gt, phone, dc, email, school,  birthday) VALUES ( ?,?,?,?,?,?,?)`;
    connection.query(
      query,
      [fullname, gt, phone, dc, email, school, birthday],
      (err, results) => {
        if (err) {
          return callback(err);
        } else {
          return callback(null, results);
        }
      }
    );
  }
  //Hiển thị học viên
  async select(limit, offset, callback) {
    const query = `SELECT s.*, c.nameclass
    FROM student s
    LEFT JOIN Enrollments e ON e.mahv = s.mahv
    LEFT JOIN class c ON c.id = e.idclass
    WHERE (s.deleted_at IS NULL or s.deleted_at = 'no') 
    and (reserve IS NULL or reserve = 0) 
    LIMIT ? OFFSET ?`;
    connection.query(query, [limit, offset], (err, results) => {
      if (err) {
        return callback(err);
      }
      return callback(null, results);
    });
  }
  //Hiển thị học viên theo mahv
  async getSinhVienByMaHS(mahv, callback) {
    const sql = `SELECT * FROM student WHERE mahv = ?`;
    await connection.query(sql, [mahv], (err, results) => {
      if (err) {
        return callback(err);
      }
      return callback(null, results);
    });
  }
  //Cập nhật thông tin học viên
  async update(data, mahv, callback) {
    const query = `UPDATE student SET ? WHERE mahv = ?`;
    connection.query(query, [data, mahv], (err, results) => {
      if (err) {
        return callback(err);
      } else {
        return callback(null, results);
      }
    });
  }
  //Xóa mềm học viên
  async softDelete(mahv) {
    const query = `UPDATE student SET deleted_at = 'yes' WHERE mahv = ?`;
    connection.query(query, [mahv], (err, results) => {
      if (err) {
        return err;
      } else {
        return results;
      }
    });
  }
  //HIển thị học viên đã bị xóa
  async selectDeleted(callback) {
    connection.query(
      "SELECT * FROM student WHERE deleted_at = 'yes'",
      (err, results) => {
        if (err) {
          return callback(err);
        }
        return callback(null, results);
      }
    );
  }
  //Khôi phục học viên đã xóa
  async restore(mahv) {
    const query = `UPDATE student SET deleted_at = 'no' WHERE mahv = ?`;
    connection.query(query, [mahv], (err, results) => {
      if (err) {
        return err;
      } else {
        return results;
      }
    });
  }
  //Bảo lưu sinh viên
  async reserve(mahv) {
    const query = `UPDATE student SET reserve = 1  WHERE mahv = ?`;
    connection.query(query, [mahv], (err, results) => {
      if (err) {
        return err;
      } else {
        return results;
      }
    });
  }
  //Hiển thị học viên đã được bảo lưu
  selectStudent(callBack) {
    const query = `SELECT * FROM student WHERE (deleted_at IS NULL or deleted_at = 'no') and (reserve = 1)`;
    connection.query(query, (err, results) => {
      if (err) {
        return callBack(err, null);
      } else {
        return callBack(null, results);
      }
    });
  }
  //Khôi phục học viên
  async reserveRestore(mahv) {
    const query = `UPDATE student SET reserve = 0  WHERE mahv = ?`;
    connection.query(query, [mahv], (err, results) => {
      if (err) {
        return err;
      } else {
        return results;
      }
    });
  }
  //hiển thị danh sách học viên bảo lưu
  async selectReserve(callback) {
    connection.query(
      "SELECT * FROM student WHERE deleted_at IS NULL or deleted_at = 'no' and reserve = 1 ",
      (err, results) => {
        if (err) {
          return callback(err);
        }
        return callback(null, results);
      }
    );
  }
  //Kiểm tra đăng nhập
  async checkLogin(username, password, callback) {
    const query = `select * from users where usersname = ?and pass= ? `;
    connection.query(query, [username, password], (err, results) => {
      if (err) {
        return callback(err);
      } else {
        return callback(null, results);
      }
    });
  }
  //Hiển thị danh sách tư vấn
  async selectAdvise(callback) {
    const query = `SELECT * FROM consultative WHERE done_at  = 0 or done_at  IS NULL`;
    connection.query(query, (err, results) => {
      if (err) {
        return callback(err);
      }
      return callback(null, results);
    });
  }
  //Đếm số lượng đơn tư vấn
  async countAdvise(callback) {
    const query = `select count(*) as sl from consultative WHERE done_at  = 0 or done_at  IS NULL`;
    connection.query(query, (err, results) => {
      if (err) {
        return callback(err);
      }
      return callback(null, results);
    });
  }
  //Hoàn thành tư vấn
  async doneAdvise(id, callback) {
    const query = `UPDATE consultative SET done_at = 1  WHERE idkh = ?`;
    connection.query(query, [id], (err, results) => {
      if (err) {
        return callback(err);
      } else {
        return callback(null, results);
      }
    });
  }
  //Đếm học viên
  countStudent(callback) {
    const query = `SELECT COUNT(s.mahv) as cs
    FROM student s
    WHERE (s.deleted_at IS NULL or s.deleted_at = 'no') 
    and (reserve IS NULL or reserve = 0) `;
    connection.query(query, (err, results) => {
      if (err) {
        return callback(err);
      } else {
        return callback(null, results);
      }
    });
  }
  //Đếm Số lượng học viên đã đóng tiền
  countTuition(callback) {
    const query = `SELECT COUNT(*) as ct FROM tuition t  
    LEFT JOIN student s ON s.mahv = t.mahv  
    `;
    connection.query(query, (err, results) => {
      if (err) {
        return callback(err);
      } else {
        return callback(null, results);
      }
    });
  }
  //Đếm số lượng giáo viên
  countTeacher(callback) {
    const query = `select count(t.magv) as cgv from teacher t WHERE (t.deleted_at = 0 or t.deleted_at is null) `;
    connection.query(query, (err, results) => {
      if (err) {
        return callback(err);
      } else {
        return callback(null, results);
      }
    });
  }
  //Đếm số lượng lớp học
  countClass(callback) {
    const query = `
    SELECT COUNT(*) as cs
    FROM class c
    WHERE (done_at IS NULL OR done_at = '0') `;
    connection.query(query, (err, results) => {
      if (err) {
        return callback(err);
      } else {
        return callback(null, results);
      }
    });
  }
  //HIển thị học sinh trong lớp
  student_in_class(id, callback) {
    const query = `SELECT s.*
    FROM student s
    LEFT JOIN Enrollments e ON e.mahv = s.mahv
    LEFT JOIN class c ON c.id = e.idclass
    WHERE (s.deleted_at IS NULL or s.deleted_at = 'no') and (reserve IS NULL or reserve = 0) AND (s.mahv in (select mahv from Enrollments))
    AND (e.idclass = ?) 
    GROUP BY s.mahv`;
    connection.query(query, id, (err, results) => {
      if (err) {
        return callback(err);
      } else {
        return callback(null, results);
      }
    });
  }
  //Hiển thị tất cả thong tin học viên điểm, fee học
  async select_student_class(mahv, callback) {
    const query = `
    SELECT s.*, c.nameclass, ss1.score as score1, ss2.score as score2, ss3.score as score3, ss4.score as score4,  ss5.score as score5,
	  CASE WHEN t.payment_date IS NOT NULL THEN 'Đã đóng' ELSE 'Chưa đóng' END AS Payment_Status,
	  CASE WHEN t.payment_date IS NOT NULL THEN t.payment_date ELSE 'Chưa đóng' END AS Payment_date
    FROM student s
    LEFT JOIN Enrollments e ON e.mahv = s.mahv
    LEFT JOIN class c ON c.id = e.idclass
    LEFT JOIN StudentScores ss1 ON ss1.student_id = s.mahv AND ss1.score_id = 1
    LEFT JOIN StudentScores ss2 ON ss1.student_id = ss2.student_id AND ss2.score_id = 2
    LEFT JOIN StudentScores ss3 ON ss1.student_id = ss3.student_id AND ss3.score_id = 3
    LEFT JOIN StudentScores ss4 ON ss1.student_id = ss4.student_id AND ss4.score_id = 4
    LEFT JOIN StudentScores ss5 ON ss1.student_id = ss5.student_id AND ss5.score_id = 5
    LEFT JOIN Scores s1 ON ss1.score_id = s1.score_id
    LEFT JOIN Scores s2 ON ss2.score_id = s2.score_id
    LEFT JOIN Scores s3 ON ss3.score_id = s3.score_id
    LEFT JOIN Scores s4 ON ss4.score_id = s4.score_id
    LEFT JOIN Scores s5 ON ss5.score_id = s5.score_id
    LEFT JOIN tuition t ON t.mahv = s.mahv
	  LEFT JOIN fee f ON c.skill = f.name_fee
	  LEFT JOIN fee ON t.fee_id = fee.id_fee
    WHERE (s.deleted_at IS NULL or s.deleted_at = 'no') and (reserve IS NULL or reserve = 0) AND (s.mahv in (select mahv from Enrollments))
    AND s.mahv = ?`;
    await connection.query(query, mahv, (err, results) => {
      if (err) {
        return callback(err);
      } else {
        return callback(null, results);
      }
    });
  }
}
module.exports = Student;
