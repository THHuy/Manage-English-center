const express = require("express");
const router = express.Router();
const homeController = require('../app/controllers/homeController')

router.get('/' , homeController.index)
router.get('/read' , homeController.read)
router.get('/tuvan' , homeController.tuvan) 
router.post('/postTuvan' , homeController.createTuVan) 
router.get('/hoc-phi' , homeController.hocphi) 
router.get('/lophoc' , homeController.lophoc) 

module.exports = router