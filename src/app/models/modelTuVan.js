const connection = require("../../config/connectdb");
class TuVan {
  //Tạo khóa học
  createTuVan(yourname, email, phonenumber, address, yearold, information, callback) {
    const query = `INSERT INTO consultative (yourname, email, phonenumber, address, yearold, information) VALUES (?,?,?,?,?,?)`;
    connection.query(query, [yourname, email, phonenumber, address, yearold, information], (err, result) => {
      if (err) {
        return callback(err);
      } else {
        return callback(null, result);
      }
    });
  }
  
}
module.exports = TuVan;
