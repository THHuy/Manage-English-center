const express = require("express");
const router = express.Router();
const feeController = require('../app/controllers/feeController')

router.get('/' , feeController.index)
router.get('/fee-class' , feeController.feeclass)
router.post('/done-fee' , feeController.doneFee)

module.exports = router