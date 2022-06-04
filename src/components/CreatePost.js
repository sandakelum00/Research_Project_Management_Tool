import React, {Component} from "react";

export default class CreatePost extends Component{
   
   constructor(props){
       super(props);
       this.state={
        groupId:"",
        topicMarks:"",
        topicFeedBack:"",
        presentationMark:"",
        presentationFeedBack:""



       }
   }
   
    render(){
        return(
            <div className="col-md-8 mt-4 mx-auto">
                <h1 className="h3 mb-3 font-weight-normal">Create new Evaluation</h1>
                    <form className="needs-validation" noValidate>

                        <div className="form-group" style={{marginBottom:'15px'}}>
                            <label style={{marginBottom:'5px'}}>Group ID</label>
                            <input type="text"
                            className="form-control"
                            name="groupId"
                            placeholder="Enter Group ID"
                            value={this.state.groupId}
                            onChange={this.handleInputChange}
                            />
                        </div>

                        <div className="form-group" style={{marginBottom:'15px'}}>
                            <label style={{marginBottom:'5px'}}>Topic Mark</label>
                            <input type="number"
                            className="form-control"
                            name="topicMarks"
                            placeholder="Enter Topic Marks"
                            value={this.state.topicMarks}
                            onChange={this.handleInputChange}/>
                        </div>

                        <div className="form-group" style={{marginBottom:'15px'}}>
                            <label style={{marginBottom:'5px'}}>Topic Feedback</label>
                            <input type="text"
                            className="form-control"
                            name="topicFeedBack"
                            placeholder="Enter Topic Feedback"
                            value={this.state.topicFeedBack}
                            onChange={this.handleInputChange}/>
                        </div>

                        <div className="form-group" style={{marginBottom:'15px'}}>
                            <label style={{marginBottom:'5px'}}>Presentation Mark</label>
                            <input type="number"
                            className="form-control"
                            name="presentationMark"
                            placeholder="Enter Presentation Mark"
                            value={this.state.presentationMark}
                            onChange={this.handleInputChange}/>
                        </div>

                        <div className="form-group" style={{marginBottom:'15px'}}>
                            <label style={{marginBottom:'5px'}}>Presentation FeedBack</label>
                            <input type="text"
                            className="form-control"
                            name="presentationFeedBack"
                            placeholder="Enter Presentation Mark"
                            value={this.state.presentationFeedBack}
                            onChange={this.handleInputChange}/>
                        </div>

                        <button className="btn btn-success" type="submit" style={{marginTop:'15px'}} onClick={this.onSubmit}>
                            <i className="far fa-check-square"></i>
                            &nbsp;save
                        </button>

                    </form>
            </div>
        )
    }
}