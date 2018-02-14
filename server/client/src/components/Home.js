import React,{Component} from "react";
import Header from './Header';
import axios from "axios";
class Home extends Component{
  constructor(){
    super();
    this.state={
      arr:[]
    };
  }
  componentWillMount(){
    axios.get('/results').then((result,err)=>{
     this.setState({arr:result.data[0].polls});
    });
  }
  renderPolls(){
    if(this.state.arr.length ==0 ) return <h1 className="text-center">Loading . . .</h1>
    return this.state.arr.map(poll => <li className="list-group-item text-center">{poll.name}</li>);
  }
  render(){

    return (
      <div>
        <div className="container-fluid">
        <Header/>
        </div>
        <div className="jumbotron">
          <h1 className="text-center"> FCC Voting App </h1>
          <h3 className="text-center">Below are polls hosted by fcc-voting.</h3>
          <h4 className="text-center">Select a poll to see the results and vote, or <a href="#">make a new poll!</a></h4>
          <ul className="list-group" style={{marginTop:"5%"}}>
          {this.renderPolls()}
          </ul>
      </div>
      </div>
    );
  }
}
export default Home;
