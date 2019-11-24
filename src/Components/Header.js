import React from "react";

class Header extends React.Component {


  renderProfileLink = () => {
    // console.log('in render profile link')
    // debugger
    if(this.props.currentUser){
      console.log(this.props)
      return <Link to={`/profile/${this.props.currentUser.id}`}>Profile</Link>
    }
  }

  renderNav=()=>{
    return(
      <>
          <Navbar bg="dark" expand="md">
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">

              <Nav pullRight>
                <NavItem componentClass='span'>
                  {this.renderProfileLink()}
                </NavItem>
                <NavItem componentClass='span'>
                  <Link to="/rides">Rides</Link>
                </NavItem>
                <NavItem componentClass='span'>
                  <Link to="/forums">Forums</Link>
                </NavItem>
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
      {this.renderHeader()}
      {this.renderNav()}
      </>
    )
  }
}

function mapStateToProps(state) {
  // maps the state from the store to the props
  return {
    currentUser: null
  }
}


export default connect(mapStateToProps)(App);
