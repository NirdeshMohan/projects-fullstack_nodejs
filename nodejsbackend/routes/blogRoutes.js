const express = require('express');
const controller = require('../controllers/blogsController');

const router = express.Router();

//BLOGS Route
//router.get('/blogs', controller.blog_index);
router.get('/', controller.blog_index);

//add
router.get('/create', controller.blog_create_get);

//Create Route
router.post('/create', controller.blog_create_post);

//Get Single Blog
router.get('/:id', controller.blog_details);

//Update Blog

//Delete Blog
router.delete('/:id', controller.blog_delete);

module.exports = router;