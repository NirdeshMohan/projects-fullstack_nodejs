const express = require('express');
const { bindAll } = require('lodash');
const mongDBCoon = require('mongoose');
const morgan = require('morgan');
const { urlencoded } = require('express');
const blogRoutes = require('./routes/blogRoutes');

//mongoDB Connect
const dbURI = 'mongodb+srv://testnodejs:india786@nodejs.dh2q3.mongodb.net/blogs?retryWrites=true&w=majority';
mongDBCoon.connect(dbURI, {useNewUrlParser :true, useUnifiedTopology : true})
            .then((result) => app.listen(3000))
            .catch((err) => console.log(err));

//express app
const app = express();

//register view engine
app.set('view engine', 'ejs');

//Log eveytime
app.use((req, res, next) => {
    console.log('-----New request Made----');
    console.log('Host:', req.hostname);
    console.log('Path:', req.path);
    console.log('Method:',req.method);
    next();
});

app.use((req, res, next) => {
    console.log('-----In the next middleware----');
    next();
});

//middleware and ststic files
app.use(express.static('public'));
app.use(express.urlencoded({extended:true}));
app.use(morgan('dev'));

app.get('/', (req,res) => {
    res.redirect('/blogs');
});

app.get('/about', (req,res) => {
    //res.send('<p> About Page </P>');
    res.render('about', {title :'About'});
});
//Blog Routes
app.use('/blogs',blogRoutes);

//404 Page
app.use((req,res) => {
    res.status(404).render('404', {title :'404'});
});
