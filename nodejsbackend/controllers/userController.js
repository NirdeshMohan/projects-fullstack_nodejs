const User = require('../models/user');

const user_index = (req,res) => {
    User.find()
    .then(users => res.json(users))
    .catch((err) => res.status(400).json('Error:-'+err));
        //     console.log(err);
    // User.find().sort({createdAt : -1 })
    // .then((result) => {
    //     res.render('index', {title :'All Blogs', blogs : result});
    // }).catch((err) => {
    //     console.log(err);
    // });
};

const user_add = (req,res) => {
    const username = new User(req.body);
    username.save()
    .then( () => res.json('User Added....'))
    .catch((err) => res.status(400).json('Error During Save:-'+err));
    // blog.save()
    // .then((result) => {
    //     res.redirect('/blogs');
    // }).catch((err) => {
    //     console.log(err);
    // });
};

module.exports = {
    user_index,
    user_add,
}