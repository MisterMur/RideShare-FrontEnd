import React from "react";
import ReactDOM from 'react-dom';
import {Navbar, Nav, NavItem,NavDropdown,Button} from 'react-bootstrap';
import {Link} from 'react-router-dom'
import { connect } from 'react-redux';
import { setLogout} from '../Actions';



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
      <Nav position="right">
        <NavItem componentClass='span' onClick={()=>this.props.history.push(`/users/${this.props.currentUser.id}`)} >

        </NavItem>
        <Link className="item" to="/login" onClick={this.logout} >
          Logout
        </Link>
      </Nav>
      </>
    )
  }
  renderLoginSignup = () =>{
    return (
      <>
      <Nav position="right">
        <Link className="span" to="/login">
          Login
        </Link>
        <Link className="span" to="/signup">
          Sign Up
        </Link>
      </Nav>
      </>
    )

  }


  renderNav=()=>{
    return(
      <>


          <Navbar bg="dark" expand="md" fixedTop ref={(e) => this._navbar = e} inverse fluid>

            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">

              <Nav pullRight>
                <NavItem componentClass='span'>
                  {this.renderProfileLink()}
                </NavItem>
                <NavItem componentClass='span'>
                  <Link to="/rides"> Rides </Link>
                </NavItem>
                <NavItem componentClass='span'>
                  <Link to="/forums"> Forums </Link>
                </NavItem>
                <NavItem componentClass='span'>
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
      <header className="header">
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
      <body style={{paddingTop: this.state.navHeight}}>
        {this.renderHeader()}
        {this.renderNav()}
      </body>
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
