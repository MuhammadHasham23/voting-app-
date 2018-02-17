import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Home from "./components/Home";
import MyPolls from "./components/MyPolls";
import NewPoll from "./components/NewPoll";
import PollInsights from "./components/PollInsights";
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import {browserHistory  ,Router,Route} from "react-router";
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
  <Router history={browserHistory}>
    <Route path="/" component={Home}/>
    <Route path="/home" component={Home}/>
    <Route path="/makepoll" component={NewPoll}/>
    <Route path="/createdpolls" component={MyPolls}/>
    <Route path="/polls/:id" component={PollInsights}/>
  </Router>
  , document.getElementById('root'));
registerServiceWorker();
