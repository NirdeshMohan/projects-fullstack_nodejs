const express = require('express');
const router = express.Router();

const controller = require('../controllers/userController');



//User Route
router.get('/', controller.user_index);

//add
router.post('/add', controller.user_add);

// //Create Route
// router.post('/', controller.blog_create_post);

// //Get Single Blog
// router.get('/:id', controller.blog_details);

// //Update Blog

// //Delete Blog
// router.delete('/:id', controller.blog_delete);

module.exports = router;