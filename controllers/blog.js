const Blog = require('../models/blog');

module.exports.blogs = (req, res, next) => {
    Blog.find((err, blogs) => {
        if (err) {
            return console.error(err);
        } else {
            res.render('blogs/list', { "title": 'Blog', "blogs": blogs });
        }
    });
}