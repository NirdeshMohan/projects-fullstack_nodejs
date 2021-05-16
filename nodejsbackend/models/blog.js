const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const blogsSchema = new mongoose.Schema(
{
    title : { type: String, required : true },
    snippet: { type: String, required : true },
    body :{ type: String, required : true },
    username :{ type: String, required : true }
}, 
{ 
    timestamps: { currentTime: () => Math.floor(Date.now() / 1000) }
});


const Blog = mongoose.model('Blog', blogsSchema);

module.exports = Blog;