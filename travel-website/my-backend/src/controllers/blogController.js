const Blog = require('../models/Blog');

exports.getBlogs = async (req, res) => {
  const blogs = await Blog.find().populate('author', 'name');
  res.json(blogs);
};

exports.createBlog = async (req, res) => {
  const { title, content, author } = req.body;
  const blog = new Blog({ title, content, author });
  await blog.save();
  res.status(201).json(blog);
};