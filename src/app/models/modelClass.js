const connection = require("../../config/connectdb");
class inClass {
  //Hiển thị lớp học
  async select(limit, offset, callback) {
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
    connection.query(query, [limit, offset], (err, results) => {
      if (err) {
        return callback(err);
      }
      return callback(null, results);
    });
  }
  //Thêm lớp học
  async create(nameclass, skill, phong, ngayhoc, giohoc, buoihoc, callback) {
    const query = `INSERT INTO class(nameclass, skill, phong, ngayhoc, giohoc, buoihoc) VALUES ( ?,?,?,?,?,?)`;
    connection.query(
      query,
      [nameclass, skill, phong, ngayhoc, giohoc, [`${buoihoc}`]],
      (err, results) => {
        if (err) {
          return callback(err);
        } else {
          return callback(null, results);
        }
      }
    );
  }
  //Hiển thị lớp theo id
  async getClassbyID(id, callback) {
    const sql = `SELECT c.*, MAX(t.fullname) AS fullname, COUNT(e.mahv) AS total_students
    FROM assign a
    INNER JOIN class c ON a.idclass = c.id
    INNER JOIN teacher t ON a.magv = t.magv
    LEFT JOIN Enrollments e ON c.id = e.idclass
    WHERE (done_at IS NULL OR done_at = '0') AND c.id = ?
    GROUP BY c.id, c.nameclass
    ORDER BY a.idclass`;
    await connection.query(sql, [id], (err, results) => {
      if (err) {
        return callback(err);
      }
      return callback(null, results);
    });
  }
  //Cập nhật thông tin lớp
  async update(data, id, callback) {
    const query = `UPDATE class SET ? WHERE id = ?`;
    connection.query(query, [data, id], (err, results) => {
      if (err) {
        return callback(err);
      } else {
        return callback(null, results);
      }
    });
  }
  //Hoàn thành lớp học
  async done(id) {
    const query = `UPDATE class SET done_at = '1' WHERE id = ?`;
    connection.query(query, [id], (err, results) => {
      if (err) {
        return err;
      } else {
        return results;
      }
    });
  }
  //Hiển thị các lớp ddaxx hoàn thành
  async doneSelect(callback) {
    connection.query(
      "SELECT * FROM class WHERE done_at = '1'",
      (err, results) => {
        if (err) {
          return callback(err);
        }
        return callback(null, results);
      }
    );
  }
  //Khôi phục lại lớp học
  restore(id) {
    const query = `UPDATE class SET done_at = '0' WHERE id = ?`;
    connection.query(query, [id], (err, results) => {
      if (err) {
        return err;
      } else {
        return results;
      }
    });
  }
  //Thêm giáo viên vào lớp học
  async addTeacher(data, callback) {
    const query = `INSERT INTO assign SET ?`;
    connection.query(query, data, (err, results) => {
      if (err) {
        return callback(err);
      } else {
        return callback(null, results);
      }
    });
  }
  //Thêm học viên vào lớp
  async addStudent(idclass, idstudent, callback) {
    const query = `INSERT INTO Enrollments SET idclass = ?, mahv = ?`;
    connection.query(query, [idclass, idstudent], (err, results) => {
      if (err) {
        return callback(err);
      } else {
        return callback(null, results);
      }
    });
  }
  //Hiển thị học viên chưa đăng kí lớp học
  async studentNoClass(callback) {
    const query = `SELECT s.* 
    FROM student s
    LEFT JOIN Enrollments e ON s.mahv = e.mahv
    WHERE (e.mahv IS NULL) and (s.deleted_at IS NULL or s.deleted_at = 'no') 
    and (s.reserve IS NULL or s.reserve = 0) `;
    connection.query(query, (err, results) => {
      if (err) {
        return callback(err);
      } else {
        return callback(null, results);
      }
    });
  }
  //Đếm số lượng học viên đang trong lớp
  async countStudentInClass(callback) {
    const query = `SELECT c.id, c.nameclass, COUNT(e.mahv) AS total_students
    FROM class c
    LEFT JOIN Enrollments e ON c.id = e.idclass
    GROUP BY c.id, c.nameclass;`;
    connection.query(query, (err, results) => {
      if (err) {
        return callback(err);
      } else {
        return callback(null, results);
      }
    });
  }
  //Hiển thị các sinh viễn đã được thêm vào lớp
  async selectStudentInClass(limit, offset, callback) {
    const query = `SELECT s.*, c.nameclass
    FROM student s
    LEFT JOIN Enrollments e ON e.mahv = s.mahv
    LEFT JOIN class c ON c.id = e.idclass
    WHERE (s.deleted_at IS NULL or s.deleted_at = 'no') 
    and (reserve IS NULL or reserve = 0) 
    AND (s.mahv in (select mahv from Enrollments))
    LIMIT ? OFFSET ?`;
    connection.query(query, [limit, offset], (err, results) => {
      if (err) {
        return callback(err);
      } else {
        return callback(null, results);
      }
    });
  }
  //Hiển thị học viên theo mã id
  async selectStudentInClassWithID(mahv, callback) {
    const query = `SELECT s.*, c.nameclass
    FROM student s
    LEFT JOIN Enrollments e ON e.mahv = s.mahv
    LEFT JOIN class c ON c.id = e.idclass
    WHERE (s.deleted_at IS NULL or s.deleted_at = 'no') 
    and (reserve IS NULL or reserve = 0) 
    AND (s.mahv in (select mahv from Enrollments))
    AND (s.mahv = ?)
    `;
    connection.query(query, mahv, (err, results) => {
      if (err) {
        return callback(err);
      } else {
        return callback(null, results);
      }
    });
  }
  //Thay đổi lớp
  async putChangeClass(idstudent, idclass, callback) {
    const query = `UPDATE Enrollments SET idclass = ? WHERE mahv = ?`;
    connection.query(query, [idclass, idstudent], (err, results) => {
      if (err) {
        return callback(err);
      } else {
        return callback(null, results);
      }
    });
  }
  //Hiển thị học viên theo class
  studentWitchClassID(idclass, callback) {
    const query = `SELECT s.*, c.nameclass
    FROM student s
    LEFT JOIN Enrollments e ON e.mahv = s.mahv
    LEFT JOIN class c ON c.id = e.idclass
    WHERE (s.deleted_at IS NULL or s.deleted_at = 'no') and (reserve IS NULL or reserve = 0) AND (s.mahv in (select mahv from Enrollments))
    AND e.idclass = ?`;
    connection.query(query, idclass, (err, results) => {
      if (err) {
        return callback(err);
      } else {
        return callback(null, results);
      }
    });
  }
  //thêm điểm học viên
  addScoreStudent(values, callback) {
    const query = `INSERT INTO StudentScores (student_id, score_id, score)
    VALUES ?`;
    connection.query(query, values, (err, results) => {
      if (err) {
        return callback(err);
      } else {
        return callback(null, results);
      }
    });
  }

  async selectScore(id, callback) {
    const query = `
    SELECT s.mahv, s.fullname, ss1.score as score1, ss2.score as score2, ss3.score as score3, ss4.score as score4,  ss5.score as score5
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
    WHERE (s.deleted_at IS NULL or s.deleted_at = 'no') and (reserve IS NULL or reserve = 0) AND (s.mahv in (select mahv from Enrollments))
    AND e.idclass = ?
    `;
    connection.query(query, id, (err, results) => {
      if (err) {
        return callback(err);
      } else {
        return callback(null, results);
      }
    });
  }
  //Sử điểm học viên
  updatedScore(mahv, score, score_id, callback) {
    const query = `UPDATE StudentScores SET score = ? WHERE student_id = ? AND score_id = ?`;
    connection.query(query, [score, mahv, score_id], (err, results) => {
      if (err) {
        return callback(err);
      } else {
        return callback(null, results);
      }
    });
  }
  //Điểm danh
  attend(values, callback) {
    const query = `
    INSERT INTO attendances 
    (student_id, attendance_date, type, class_id )
    VALUES ? `;
    connection.query(query, [values], (err, results) => {
      if (err) {
        return callback(err);
      } else {
        return callback(null, results);
      }
    });
  }
  //Hiển thị thông tin điểm danh
  selectAttend(id, callback) {
    const query = `
    SELECT s.mahv, s.fullname, 
    SUM(CASE WHEN a1.type = 0 THEN 1 ELSE 0 END) AS present, 
    SUM(CASE WHEN a1.type = 1 THEN 1 ELSE 0 END) AS absent,
    SUM(CASE WHEN a1.type = 2 THEN 1 ELSE 0 END) AS permission
    FROM student s
    LEFT JOIN Enrollments e ON e.mahv = s.mahv
    LEFT JOIN class c ON c.id = e.idclass
    LEFT JOIN attendances a1 ON s.mahv = a1.student_id
    WHERE (s.deleted_at IS NULL or s.deleted_at = 'no') and (reserve IS NULL or reserve = 0) AND (s.mahv in (select mahv from Enrollments))
    AND (e.idclass = ?)
    GROUP BY s.mahv`;
    connection.query(query, id, (err, results) => {
      if (err) return callback(err);
      else {
        return callback(null, results);
      }
    });
  }
  //Hiển thị class của giáo viên
  getClassbyIDGV(magv, callback) {
    const query = `
    SELECT c.*, MAX(t.fullname) AS fullname, COUNT(e.mahv) AS total_students
    FROM assign a
    INNER JOIN class c ON a.idclass = c.id
    INNER JOIN teacher t ON a.magv = t.magv
    LEFT JOIN Enrollments e ON c.id = e.idclass AND (e.mahv IN (SELECT s.mahv FROM student s WHERE (s.deleted_at IS NULL or s.deleted_at = 'no') and (reserve IS NULL or reserve = 0)))
    WHERE (done_at IS NULL OR done_at = '0') AND (t.magv = ?)
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

module.exports = inClass;
