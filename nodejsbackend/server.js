const express = require('express');
const cors = require('cors');
const mongDBCon = require('mongoose');

require('dotenv').config();

//express app
const app = express();

//register view engine
app.set('view engine', 'ejs');

const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

//Mongo
// const dbURI = 'mongodb+srv://testnodejs:india786@nodejs.dh2q3.mongodb.net/blogs?retryWrites=true&w=majority';
// mongDBCon.connect(dbURI, {useNewUrlParser :true, useUnifiedTopology : true})
//             .then((result) => app.listen(3000))
//             .catch((err) => console.log(err));
const uri = process.env.ATLAS_URI;
mongDBCon.connect(uri, {useNewUrlParser : true, useCreateIndex : true});
const connection = mongDBCon.connection;
connection.once('open', () => {
    console.log("Connected to Mongo Successfully");
})

//Define Routes variables
const blogRouter = require('./routes/blogRoutes');
const userRouter = require('./routes/userRoutes');

//Use Routes
app.use('/blogs',blogRouter);
app.use('/users',userRouter);

app.listen(port, () => {
    console.log('Server is running on port:',port);
});