import React,{Component} from "react";
import {Link} from "react-router";
import axios from "axios";
class Header extends Component{
  constructor(){
    super();
    this.state = {auth:false};
  }
  componentWillMount(){
    axios.get("/verifyuser").then((response)=>{
      this.setState({auth:response});
      console.log(response);
    });
  }
  logout(){
    axios.get('/logout').then((response)=>{
      alert("You have been logged out")
    });
  }
  render(){
    console.log(this.state.auth);
    return(
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <a className="navbar-brand" href="#">FCC Voting App</a>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item active">
                        <Link className="nav-link" to="/home">Home</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/createdpolls">My Polls</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/makepoll">New Poll</Link>
                    </li>
                    <li className="nav-item">
                        {!this.state.auth ? <Link className="nav-link" href="http://localhost:5000/auth/twitter">Sign In</Link>
                        :<Link className="nav-link" onClick={()=>this.logout()}>Sign Out</Link>}
                    </li>
                </ul>
            </div>
     </nav>
);
  }
}
export default Header;
