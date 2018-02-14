import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Home from "./components/Home";
import MyPolls from "./components/MyPolls";
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<MyPolls />, document.getElementById('root'));
registerServiceWorker();
