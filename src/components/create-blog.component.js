import React, {Component} from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";


export default class CreateBlog extends Component {
    constructor(props){
        super(props);

        this.onChangeTitle = this.onChangeTitle.bind(this);
        this.onChangeSnippet = this.onChangeSnippet.bind(this);
        this.onChangeBody = this.onChangeBody.bind(this);
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangeDate = this.onChangeDate.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            title:'',
            snippet:'',
            body:'',
            username:'',
            date: new Date(),
            users:[]
        }
    }

    componentDidMount(){
        // this.setState({
        //     users:['test user1', 'test user2','test user3'],
        //     username:'test user'
        // })
        axios.get('http://localhost:5000/users/')
          .then(response => {
              if (response.data.length > 0) {
                this.setState({
                  users: response.data.map(user => user.username),
                  username: response.data[0].username
                })
              }
          })
        .catch((error) => {
            console.log(error);
          })
  }

    onChangeTitle(e){
        this.setState({
            title: e.target.value
        });
    };
    onChangeSnippet(e){
        this.setState({
            snippet: e.target.value
        });
    };
    onChangeBody(e){
        this.setState({
            body: e.target.value
        });
    };
    onChangeDate(date){
        this.setState({
            date: date
        });
    };
    onChangeUsername(e){
        this.setState({
            username: e.target.value
        });
    };

    onSubmit(e) {
        e.preventDefault();
    
        const blog = {
            title: this.state.title,
            snippet: this.state.snippet,
            body: this.state.body,
            username: this.state.username
        }

        console.log('Comp_Logs:-'+blog);

        axios.post('http://localhost:5000/blogs/add', blog)
        .then(res => {
          console.log(res);
          console.log(res.data);
        })
        .catch(
          (error) => {console.log(error);
        });

        //window.location = '/blogs';
    };

    render() {
        return (            
            <div>
            <h3>Create New Blog</h3>
            <form onSubmit={this.onSubmit}>
              <div className="form-group"> 
                <label>Username: </label>
                <select ref="userInput" required className="form-control" value={this.state.username} onChange={this.onChangeUsername}>
                    {
                      this.state.users.map(function(user) { return <option key={user} value={user}>{user} </option>; })
                    }
                </select>
              </div>
              <div className="form-group"> 
                <label>Title: </label>
                <input  type="text" required className="form-control" value={this.state.title} onChange={this.onChangeTitle} />
              </div>
              <div className="form-group">
                <label>Snippet: </label>
                <input type="text" className="form-control" value={this.state.snippet} onChange={this.onChangeSnippet}/>
              </div>
              <div className="form-group">
                <label>Body: </label>
                <input type="text" className="form-control" value={this.state.body} onChange={this.onChangeBody} />
              </div>
              <div className="form-group">
                <label>Date: </label>
                <div>
                  <DatePicker selected={this.state.date} onChange={this.onChangeDate}/>
                </div>
              </div>
      
              <div className="form-group">
                <input type="submit" value="Create Blogs" className="btn btn-primary" />
              </div>
            </form>
          </div>
        )
    }
}