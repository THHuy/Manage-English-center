const Search = require("../models/modelSearch");
const search = new Search();
class searchController {
  //[GET] /search
  index(req, res, next) {
    const { type, query } = req.query;
    search.search(type, query, (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.json(result);
      }
    });
  }
}
module.exports = new searchController();
