import React,{Component} from "react";
import axios from "axios";
import Chart from "./Chart";
import Header from "./Header";
class PollInsights extends Component{
  constructor(){
    super();
    this.state={poll:[],opt:"",newoption:"",addOption:false}
  }
  componentWillMount(){
    axios.post("/pollinfo",{pollId:this.props.params.id}).then(res => this.arrangeArray(res));
  }
  arrangeArray(response){
      const arr = response.data.filter(Boolean);
      this.setState({poll:arr[0]});
  }
  renderList(){
  if(this.state.poll.length == 0) return;
  return this.state.poll.options.map((option,key)=>{
    return <a className="dropdown-item" href="#" key={key} onClick={(e)=> this.setState({opt:key})}>{option.name}</a>
  });
  }
  submit(){
    if(this.state.newoption.length > 0){
      axios.post('/addoption',{pollId:this.props.params.id,newoption:this.state.newoption}).then((res) => {
        window.location.reload();
      });
      alert(`You have voted for : ${this.state.newoption}`);
    }
    else{
    axios.post('/updatecount',{counter:this.state.opt,pollId:this.props.params.id}).then((res) => {
        window.location.reload();

      });
    alert("Thank you for the vote");
  }
  }

  render(){
    console.log(this.state.poll);
    let value = 'enabled';
    this.state.addOption? value="disabled": value="enabled"
    if(this.state.poll == null) return <h1>Loading . . .</h1>
    return (
      <div>
        <Header/>
      <div className="container">
        <div className="jumbotron" style={{marginTop:"10%"}}>
          <h4>{this.state.poll.name}</h4>
          <p>I would Like To Vote For</p>
          <div class="dropdown">
              <button class={`btn btn-primary dropdown-toggle ${value}`} type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              Select an option
              </button>
      <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
        {this.renderList()}
        <a className="dropdown-item" href="#" onClick={()=>this.setState({addOption:!this.state.addOption})}>Add an option</a>
      </div>
      </div>
        <div className="row">
          <div className="col-md-6">
              {this.state.addOption ? <input style={{marginTop:"7%"}} type="text" placeholder="add on option" onChange={(e)=> this.setState({newoption:e.target.value})}/>: ""}
          </div>
          <div className="col-md-6">
              <Chart id={this.props.params.id}/>
          </div>
        </div>
        <button style={{marginTop:"3%"}} className="btn btn-primary btn-block" onClick={()=> this.submit()}>Submit</button>
          <a className="twitter-share-button btn btn-primary btn-block" target="_blank" href={`https://twitter.com/intent/tweet?text=http://localhost:3000${this.props.location.pathname}`}>Share on twitter</a>
      </div>
      </div>
        </div>
    );
  }
}
export default PollInsights;
