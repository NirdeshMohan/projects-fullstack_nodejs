import React, {Component} from 'react';
import {Link} from 'react-router-dom'
import axios from 'axios';

const Blog = props => (
    <tr>
      <td>{props.blog.username}</td>
      <td>{props.blog.title}</td>
      <td>{props.blog.snippet}</td>
      <td>{props.blog.body}</td>
      <td>
        <Link to={"/edit/"+props.blog._id}>edit</Link> | <a href="#" onClick={() => { props.deleteBlog(props.blog._id) }}>delete</a>
      </td>
    </tr>
  )

export default class BlogsList extends Component {
    constructor(props){
        super(props);

        this.deleteBlog = this.deleteBlog.bind(this);

        this.state = {blogs: []};

    }

    componentDidMount(){
        axios.get('http://localhost:5000/blogs/')
            .then(response => {
              if (response.data.length > 0) {
                this.setState({ blogs: response.data })
              }
            })
            .catch((error) => {
            console.log(error);
            });
    }

    deleteBlog(id){
        axios.get('http://localhost:5000/blogs/'+id)
        .then(res => console.log(res.data))
        .catch((error) => {console.log(error);
        });
        this.setState({ blogs: this.state.blogs.filter(el => el._id !== id)});
    }

    blogList() {
        return this.state.blogs.map(currentblog => {
          return <Blog blog={currentblog} deleteBlog={this.deleteBlog} key={currentblog._id}/>;
        })
      }

    render() {
        return (          
            <div>
        <h3>Logged Exercises</h3>
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>Username</th>
              <th>Title</th>
              <th>Snippet</th>
              <th>Body</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            { this.blogList() }
          </tbody>
        </table>
      </div>
        )
    }
}