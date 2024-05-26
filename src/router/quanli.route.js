const express = require("express");
const router = express.Router();
const quanliController = require('../app/controllers/quanliController')
router.get('/' , quanliController.index)
module.exports = router