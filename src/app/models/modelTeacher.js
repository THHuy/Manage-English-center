const connection = require("../../config/connectdb");

class Teacher {
  //Hiển thị giáo viên
  async select(callback) {
    connection.query(
      "SELECT * FROM teacher WHERE deleted_at IS NULL or deleted_at = '0'",
      (err, results) => {
        if (err) {
          return callback(err);
        }
        return callback(null, results);
      }
    );
  }
  //Thêm giáo viên
  async create(
    fullname,
    gt,
    phone,
    dc,
    email,
    skill,
    school,
    birthday,
    callback
  ) {
    const query = `INSERT INTO teacher(fullname, gt, phone, dc, email, skill, school,  birthday) VALUES (?,?,?,?,?,?,?,?)`;
    connection.query(
      query,
      [fullname, gt, phone, dc, email, [`${skill}`], school, birthday],
      (err, results) => {
        if (err) {
          return callback(err);
        } else {
          return callback(null, results);
        }
      }
    );
  }
  //Hiển thị Giáo viên theo mahv
  async getGiaovienByMaHS(magv, callback) {
    const sql = `SELECT * FROM teacher WHERE magv = ?`;
    await connection.query(sql, [magv], (err, results) => {
      if (err) {
        return callback(err);
      }
      return callback(null, results);
    });
  }
  //Cập nhật thông tin Giáo viên
  async update(
    fullname,
    gt,
    phone,
    dc,
    email,
    skill,
    school,
    birthday,
    magv,
    callback
  ) {
    const query = `UPDATE teacher 
    SET fullname =?, 
        gt = ?, 
        phone = ?, 
        dc = ?, 
        email = ?, 
        skill = ?, 
        school = ?, 
        birthday = ? 
        WHERE magv = ?`;
    connection.query(
      query,
      [fullname, gt, phone, dc, email, [`${skill}`], school, birthday, magv],
      (err, results) => {
        if (err) {
          return callback(err);
        } else {
          return callback(null, results);
        }
      }
    );
  }
  //HIển thị giáo viên đã bị xóa
  async selectDeleted(callback) {
    connection.query(
      "SELECT * FROM teacher WHERE deleted_at = '1'",
      (err, results) => {
        if (err) {
          return callback(err);
        }
        return callback(null, results);
      }
    );
  }
  //Xóa mềm giáo viên
  async softDelete(magv) {
    const query = `UPDATE teacher SET deleted_at = '1' WHERE magv = ?`;
    connection.query(query, [magv], (err, results) => {
      if (err) {
        return err;
      } else {
        return results;
      }
    });
  }
  //Khôi phục giáo viên đã xóa
  async restore(magv) {
    const query = `UPDATE teacher SET deleted_at = '0' WHERE magv = ?`;
    connection.query(query, [magv], (err, results) => {
      if (err) {
        return err;
      } else {
        return results;
      }
    });
  }
  //Hiển thị danh sách lớp chưa được phân công
  async data(callback) {
    const query = `SELECT c.*, GROUP_CONCAT(t.fullname SEPARATOR ', ') AS fullname, Group_concat(t.magv Separator ', ') as magv
    FROM class c
    JOIN teacher t ON find_in_set(c.skill, t.skill)
    where (t.deleted_at = 0 or t.deleted_at is null) and c.id not in (select idclass from assign)
    GROUP BY c.id;`;
    connection.query(query, (err, results) => {
      if (err) {
        return callback(err);
      }
      return callback(null, results);
    });
  }
  //HIển thị danh sách giáo viên đã được phân công vào lớp
  async selectAssign(limit, offset, callback) {
    const query = `
    select c.*, t.fullname, a.idclass, a.id as ida
  from assign a
  inner join class c on a.idclass = c.id
  inner join teacher t on a.magv = t.magv
  order by a.idclass
  LIMIT ? OFFSET ?`;
    connection.query(query, [limit, offset], (err, results) => {
      if (err) {
        return callback(err);
      }
      return callback(null, results);
    });
  }
  //Tạo tài khoản giáo viên
  async create_users(users, magv, pass, roles, callback) {
    const query = `
    INSERT INTO users (usersname,magv, pass, roles)
    VALUE (?,?,?,?)`;
    connection.query(query, [users, magv, pass, roles], (err, results) => {
      if (err) {
        return callback(err);
      } else {
        return callback(null, results);
      }
    });
  }
  //Hiển thị danh sách tai khoản
  select_users(callback) {
    const query = `SELECT * FROM users WHERE usersname != "admin"`;
    connection.query(query, (err, results) => {
      if (err) {
        return callback(err);
      } else {
        return callback(null, results);
      }
    });
  }
  //HIển thị tài khoản với magv
  select_users_with_magv(magv, callback) {
    const query = `SELECT * FROM users WHERE magv = ?`;
    connection.query(query, magv, (err, results) => {
      if (err) {
        return callback(err);
      } else {
        return callback(null, results);
      }
    });
  }
  //Sửa tài khoản
  update_put(data, magv, callback) {
    const query = `UPDATE users SET ? WHERE magv = ?`;
    connection.query(query, [data, magv], (err, results) => {
      if (err) {
        return callback(err);
      } else {
        return callback(null, results);
      }
    });
  }
  //Xóa tài khoản
  deleted_users(magv, callback) {
    const query = `DELETE FROM users WHERE magv = ?`;
    connection.query(query, magv, (err, results) => {
      if (err) {
        return callback(err);
      } else {
        return callback(null, results);
      }
    });
  }
  //Xóa phân công
  deleted_assign(id, callback) {
    const query = `DELETE FROM assign WHERE id = ?`;
    connection.query(query, id, (err, results) => {
      if (err) {
        return callback(err);
      } else {
        return callback(null, results);
      }
    });
  }
  //Hiển thị các lớp của giáo viên
  class_for_teacher(magv, callback) {
    const query = `select c.*
    from assign a
    inner join class c on a.idclass = c.id
    inner join teacher t on a.magv = t.magv
    WHERE t.magv = ?`;
    connection.query(query, magv, (err, results) => {
      if (err) {
        return callback(err);
      } else {
        return callback(null, results);
      }
    });
  }
}

module.exports = Teacher;
