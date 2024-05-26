class scheduleController {
    //[GET] /schedule
    index(req, res, next) {
        res.render('./schedule/schedule')
    }
  }
  
  module.exports = new scheduleController();
  