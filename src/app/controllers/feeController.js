const inClass = require("../models/modelClass");
const infclass = new inClass();
const Fee = require("../models/modelFee");
const fee = new Fee();
class feeController {
  //[GET] /fee
  index(req, res, next) {
    const user = req.session.usersname;
    const limit = 10; // Số lượng học sinh trên mỗi trang
    const page = req.query.page || 1; // Trang hiện tại, mặc định là trang 1
    const offset = (page - 1) * limit;
    fee.selectedFee(limit, offset,(err, results) => {
      if (err) {
        console.log(err);
      } else {
        res.render("./fee/fee", { results, user });
      }
    });
  }
  //[GET] /fee/fee-student
  feeclass(req, res, next) {
    const id = req.query.id;
    const user = req.session.usersname;
    infclass.getClassbyID(id, (err, results) => {
      if (err) {
        res.status(404).send("Lỗi");
      } else {
        const id = req.query.id;
        fee.selectedStudentFee(id, (err, student) => {
          if (err) {
            res.status(404).send("Lỗi");
            return;
          }
          res.render("./fee/feeStudent", { results, student, user });
        });
      }
    });
  }
  //[POST] /fee/done-fee
  doneFee(req, res, next) {
    const { mahv, id_fee } = req.query;
    fee.doneFee(mahv, id_fee, (err, results) => {
      if (err) {
        console.log(err);
      } else {
        res.redirect("back");
      }
    });
  }
}

module.exports = new feeController();
