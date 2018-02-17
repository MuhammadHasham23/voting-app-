import React,{Component} from "react";
import axios from "axios";
import Header from "./Header";
class NewPoll extends Component{
  constructor(){
    super();

    this.state={
      title:"",
      options:""
    }
  }
  submitPoll(){
  let obj = {};
  obj.title = this.state.title;
  obj.options=this.state.options.split("\n");
  axios.post('/newpoll',{poll:obj}).then(response =>console.log(response));
  }
  render(){
    return (
      <div>
      <Header/>
      <div className="container">
      <div className="jumbotron" style={{"marginTop":"7%"}}>
      <h1>Make a new poll</h1>
      <div class="form-group">
        <label for="usr">Title:</label>
        <input type="text" className="form-control" id="usr" onChange={(e)=>this.setState({title:e.target.value})}/>
        <label for="comment">Options (seperated by line):</label>
        <textarea class="form-control" rows="5" id="comment" onChange={(e)=> this.setState({options:e.target.value})}></textarea>
          </div>
          <button className="btn btn-primary" onClick={()=>this.submitPoll()}>Make!</button>
        </div>
      </div>
      </div>
    )
  }
}
export default NewPoll;
