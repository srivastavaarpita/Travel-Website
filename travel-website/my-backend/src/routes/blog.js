const express = require('express');
const { getBlogs, createBlog } = require('../controllers/blogController');
const router = express.Router();

router.get('/', getBlogs);
router.post('/', createBlog);

module.exports = router;