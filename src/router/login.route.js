const express = require("express");
const router = express.Router();
const loginController = require('../app/controllers/loginController')

router.get('/' , loginController.index)
router.post('/check' , loginController.check)
router.get('/logout', loginController.logout)
module.exports = router