import React from "react";
import ReactDOM from 'react-dom';
import {Navbar, Nav, NavItem} from 'react-bootstrap';
import {Link} from 'react-router-dom'
import { connect } from 'react-redux';
import { setLogout} from '../Actions';

import '.././App.css'

class Header extends React.Component {
    constructor(props) {
      super(props);
      this.state = { navHeight: 50, navExpanded: false };
      

      this.handleResize = this.handleResize.bind(this);
    }

    handleResize(e = null) {
      this.setState({ navHeight: ReactDOM.findDOMNode(this._navbar).offsetHeight });
    }

    componentDidMount() {
      window.addEventListener('resize', this.handleResize);
      this.handleResize();
    }

    componentWillUnmount() {
      window.removeEventListener('resize', this.handleResize);
    }

    closeNav=()=> {
      this.setState({ navExpanded: false });
    };

    setNavExpanded=(expanded)=> {
      this.setState({ navExpanded: expanded });
    };

    logout = () => {

     localStorage.removeItem("jwt")
     this.props.setLogout()
   }

  renderProfileLink = () => {

    if(this.props.currentUser){
        return <Link style={{textDecoration:'none'}} to={`/profile`}> Profile </Link>

    }
    else{
      return <Link style={{textDecoration:'none'}} to={`/login`}> Profile </Link>
    }
  }
  renderLogout =() =>{
    return (
      <>
        <NavItem id='menu-item'>
          <Link style={{textDecoration:'none'}} to="/login" onClick={this.logout} >
            Logout
          </Link>
        </NavItem>
      </>
    )
  }
  renderLoginSignup = () =>{
    return (
      <>
        <NavItem onClick={this.closeNav} id='menu-item'>
          <Link  style={{textDecoration:'none'}} to="/login">
            Log In
          </Link>
        </NavItem>

        <NavItem onClick={this.closeNav} id='menu-item'>
          <Link  style={{textDecoration:'none'}} to="/signup">
            Sign Up
          </Link>
        </NavItem>
      </>
    )

  }


  renderNav=()=>{
    return(
      <>


          <Navbar bg="primary" expand="md" fixedtop="true" ref={(e) => this._navbar = e} onToggle={this.setNavExpanded}   expanded={this.state.navExpanded} inverse="true" fluid="true">

            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">

              <Nav>
                <NavItem  onClick={this.closeNav} data-bs-toggle="collapse" id='menu-item'>
                  {this.renderProfileLink()}
                </NavItem>
                <NavItem onClick={this.closeNav} data-bs-toggle="collapse" id='menu-item'>
                  <Link style={{textDecoration:'none'}} to="/rides"> Rides </Link>
                </NavItem>
                <NavItem onClick={this.closeNav} data-bs-toggle="collapse" id='menu-item'>
                 <Link style={{textDecoration:'none'}} to="/forums"> Forums </Link>
                </NavItem>
                <NavItem onClick={this.closeNav} data-bs-toggle="collapse" id='menu-item'>
                  <Link style={{textDecoration:'none'}} to="/discover"> Discover </Link>
                </NavItem>
                  {this.props.currentUser ? this.renderLogout() : this.renderLoginSignup() }
              </Nav>

            </Navbar.Collapse>
          </Navbar>
      </>
    )
  }
  renderHeader=()=>{
    return (
      <>
      <header className="title">
        <div className="container col-11" >
          <b>RideShare</b>
        </div>
      </header>
      </>
    )
  }

  render() {
    return (
      <>
      <div className="header">
        {this.renderHeader()}
        {this.renderNav()}
      </div>
      </>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  setLogout: () => dispatch(setLogout())
})

function mapStateToProps(state) {

	const { user } = state
  return {

    currentUser:user.currentUser
  }
}


export default connect(mapStateToProps,mapDispatchToProps)(Header);
