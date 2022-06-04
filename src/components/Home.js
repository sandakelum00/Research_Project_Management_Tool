import React,{Component} from "react";
import axios from 'axios';

export default class Home extends Component{

constructor(props){
  super(props);

  this.state = {
    posts:[]
  };
}

componentDidMount(){
  this.retrievePosts();
}

retrievePosts(){
  axios.get("http://Localhost:8000/posts").then(res =>{
    if(res.data.success){
      this.setState({
        posts:res.data.existingPosts
      });

      console.log(this.state.posts);
    }
  });
}

  render(){
    return(
      <div  className="container">
        <p>All Evaluations</p>

        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Group ID</th>
              <th scope="col">Topic Mark</th>
              <th scope="col">Topic Feedback</th>
              <th scope="col">Presentation Mark</th>
              <th scope="col">Presentation Feedback</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>

          <tbody>
            {this.state.posts.map((posts,index) => (
              
              <tr key={index}>
                  <th scope="row">{index+1}</th>
                  <td>
                      <a href={"/post/${posts._id}"} style={{textDecoration:'none'}}>
                      {posts.groupId} </a> </td>

                  <td>{posts.topicMarks}</td>
                  <td>{posts.topicFeedBack}</td>
                  <td>{posts.presentationMark}</td>
                  <td>{posts.presentationFeedBack}</td>
                  <td>
                    <a className="btn btn-warning" href="#">
                      <i className="fas fa-edit"></i>&nbsp;Edit
                    </a>
                      &nbsp;
                    <a className="btn btn-danger" href="#">
                      <i className="far fa-trash-alt"></i>&nbsp;Delete
                    </a>
                  </td>


              </tr>


            ))}
          </tbody>

        </table>

        <button className="btn btn-success"><a href = "/add" style={{textDecoration:'none',color:"white"}}>Create New Evaluation</a></button>
            
      

      </div>
    )
  }
} 