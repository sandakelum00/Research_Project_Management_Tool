import React, {Component} from "react";
import axios from "axios";


export default class PostDetails extends Component{
    constructor(props){
        super(props);

        this.state={
            post:{}
        };
    }

    componentDidMount(){
        const id = this.props.match.params.id;

        axios.get('/post/${id}').then((res) => {
            if(res.data.success){
                this.setState({
                    post:res.data.post
                });

                console.log(this.state.post);
            }
        } );
    }

    render(){

        const{groupId,topicMarks,topicFeedBack,presentationMark,presentationFeedBack} =this.state.post;

        return(
            <div style ={{margingTop:'20px'}}>
                <h4>{groupId}</h4>
                <hr/>

                <dl className="row">
                    <dt className="col-sm-3">Topic Marks</dt>
                    <dd className="col-sm-9">{topicMarks}</dd>

                    <dt className="col-sm-3">Topic Feedback</dt>
                    <dd className="col-sm-9">{topicFeedBack}</dd>

                    <dt className="col-sm-3">presentation Mark</dt>
                    <dd className="col-sm-9">{presentationMark}</dd>

                    <dt className="col-sm-3">presentation Feedback</dt>
                    <dd className="col-sm-9">{presentationFeedBack}</dd>


                </dl>



            </div>
        )
    }
}