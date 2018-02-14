import React,{Component} from "react";
import {Link} from "axios";

class Header extends Component{
  render(){
    return(
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <a className="navbar-brand" href="#">FCC Voting App</a>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item active">
                        <a className="nav-link" href="#">Home</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#">My Polls</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#">New Poll</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#">Sign In</a>
                    </li>
                </ul>
            </div>
     </nav>
);
  }
}
export default Header;
