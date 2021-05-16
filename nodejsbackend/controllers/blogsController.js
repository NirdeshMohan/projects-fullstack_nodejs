const Blog = require('../models/blog');

const blog_index = (req,res) => {
    Blog.find().sort({createdAt : -1 })
    .then(blogs => res.json(blogs))
    .catch((err) => res.status(400).json('Error:-'+err));
};

const blog_index_HTML = (req,res) => {
    Blog.find().sort({createdAt : -1 })
    .then((result) => {
        res.render('index', {title :'All Blogs', blogs : result});
    }).catch((err) => {
        console.log(err);
    });
    // Blog.find()
    // .then(blogs => res.json(blogs))
    // .catch((err) => res.status(400).json('Error:-'+err));
};

const blog_details = (req,res) => {
    const id = req.params.id;
    Blog.findById(id)
    .then((result) =>  res.json(result))
    .catch((err) => {
        console.log(err);
    });
};

const blog_details_HTML = (req,res) => {
    const id = req.params.id;
    Blog.findById(id)
    .then((result) => {
        res.render('details', {blog : result, title :'Blog Details'});
    })
    .catch((err) => {
        console.log(err);
    });
};

const blog_create_post = (req,res) => {
    const blog = new Blog(req.body);
    blog.save()
    .then( () => res.json('Blog Added....'))
    .catch((err) => res.status(400).json('Error During Save:-'+err));
};

const blog_create_post_HTML = (req,res) => {
    const blog = new Blog(req.body);
    blog.save()
    .then((result) => {
        res.redirect('/');
    }).catch((err) => {
        console.log(err);
    });
};

const blog_create_get = (req,res) => {
    res.render('create', {title :'Create'});
};

const blog_delete = (req,res) => {
    const id = req.params.id;
    console.log('Deleteing:'+id);
    
    Blog.findOneAndDelete(id)
    .then((result) => {
        console.log('deleted');
        res.redirect('/blogs');
    })
    .catch((err) => {
        console.log(err);
    });
};

module.exports = {
    blog_index,
    blog_details,
    blog_create_post,
    blog_delete,
    blog_create_get,
}