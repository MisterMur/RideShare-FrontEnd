import React from "react";
import ReactDOM from 'react-dom';
import {Navbar, Nav, NavItem} from 'react-bootstrap';
import {Link} from 'react-router-dom'
import { connect } from 'react-redux';
import { setLogout} from '../Actions';

// import * from '../App.css'



class Header extends React.Component {
    constructor(props) {
      super(props);
      this.state = { navHeight: 50 };

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

    logout = () => {
     // event.preventDefault()
     // Remove the token from localStorage
     localStorage.removeItem("jwt")
     // Remove the user object from the Redux store
     this.props.setLogout()
   }

  renderProfileLink = () => {
    // console.log('in render profile link')
    // debugger
    // console.log('rendering profile link',this.props)
    // debugger
    if(this.props.currentUser){
      // return <Link to={`/profile/${this.props.currentUser.id}`}>Profile</Link>
        return <Link to={`/profile`}> Profile </Link>

    }
    else{
      return <Link to={`/login`}> Profile </Link>
    }
  }
  renderLogout =() =>{
    return (
      <>

        <NavItem onClick={()=>this.props.history.push(`/users/${this.props.currentUser.id}`)} >

        </NavItem>
        <NavItem className='menu-item'>
          <Link  to="/login" onClick={this.logout} >
            Logout
          </Link>
        </NavItem>

      </>
    )
  }
  renderLoginSignup = () =>{
    return (
      <>
        <NavItem className='menu-item'>
          <Link  to="/login">
            Login
          </Link>
        </NavItem>

        <NavItem className='menu-item'>
          <Link  to="/signup">
            Sign Up
          </Link>
        </NavItem>
      </>
    )

  }


  renderNav=()=>{
    return(
      <>


          <Navbar bg="dark" expand="md" fixedtop="true" ref={(e) => this._navbar = e} inverse="true" fluid="true">

            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">

              <Nav >
                <NavItem className='menu-item'>
                  {this.renderProfileLink()}
                </NavItem>
                <NavItem className='menu-item'>
                  <Link to="/rides"> Rides </Link>
                </NavItem>
                <NavItem className='menu-item'>
                  <Link to="/forums"> Forums </Link>
                </NavItem>
                <NavItem className='menu-item'>
                  <Link to="/discover"> Discover </Link>
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
  // maps the state from the store to the props
	// debugger
	const { user } = state
	// console.log('mapping state in header',user)
  return {

    currentUser:user.currentUser
  }
}


export default connect(mapStateToProps,mapDispatchToProps)(Header);
