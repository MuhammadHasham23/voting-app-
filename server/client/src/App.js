import React, { Component } from 'react';
import logo from './logo.svg';

import axios from 'axios';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

class App extends Component {

  submitPoll(){
    axios.post('/newpoll',{"title":"My New Poll","options":[{name:"what do you like",count:0},{name:"what is the day today?",count:0}]})
    .then(function(response){
      console.log(response);
    });
  }
  deletePoll(){
    axios.post('/deletepoll',{"id":"1"})
    .then(function(response){
      console.log(response);
    });
  }
  addoption(){
    axios.post('/addoption',{"option":"Who will win elections 2018?"})
    .then(function(response){
      console.log(response);
    });
  }

  render() {
    return (
      <div className="App">


        <button onClick={()=> this.submitPoll()}>Submit</button>
        <button onClick={()=> this.deletePoll()}>Delete Poll</button>
        <button onClick={()=> this.addoption()}>Add An Option</button>
      </div>
    );
  }
}

export default App;
