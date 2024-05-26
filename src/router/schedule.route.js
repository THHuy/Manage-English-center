const express = require("express");
const router = express.Router();
const scheduleController = require('../app/controllers/scheduleController')

router.get('/' , scheduleController.index)

module.exports = router