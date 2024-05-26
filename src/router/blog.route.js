const express = require("express");
const router = express.Router();
const blogController = require('../app/controllers/blogController')

router.get('/' , blogController.index)
router.get('/formBlog' , blogController.formBlog)
router.post('/postBlog' , blogController.postBlog)
router.get('/formUpdatedBlog', blogController.formUpdatedBlog)
router.put('/updatedBlog', blogController.updatedBlog)
router.patch('/deletedBlog', blogController.deletedBlog)
module.exports = router