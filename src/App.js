import React, { Component, Fragment} from 'react';
import ReactDOM from 'react-dom'
import { Link, Route,Switch, Redirect} from 'react-router-dom'
// import { Router, Route, browserHistory,Switch,Redirect } from 'react-router'
// import { syncHistoryWithStore, routerReducer } from 'react-router-redux'

import './App.css';
import {Grid} from 'semantic-ui-react'
import Header from './Components/Header.js'
import Rides from './Components/Rides.js'
import ForumsPage from './Components/ForumsPage.js'
import Profile from './Components/Profile.js'
import { connect } from 'react-redux';

import {getProfileFetch, setLogout,fetchUsers} from './Actions';

import LoginForm from './Components/LoginForm.js'
import SignupForm from './Components/SignupForm.js'

import {Navbar, Nav, NavItem,NavDropdown,Button} from 'react-bootstrap';
import {AUTOLOGINURL,USERURL} from './Constants.js'
import history from './history.js'

// import NavDropDown from 'react-bootstrap/NavDropDown'
// function Forum() {
//   return <h2> Forums </h2>
// }
// const userUrl = 'https://ride-share-api.herokuapp.com/api/v1/users'
// const companyUrl = 'https://ride-share-api.herokuapp.com/api/v1/companies'
// const rideUrl = 'https://ride-share-api.herokuapp.com/api/v1/rides'



class App extends Component {

  // state = {
  //   allCompanies:[],
  //   users: "",
  //   // users: [],
  //   rides: [],
  //   forums:[],
  //   allForums:[],
  //   friendships: [],
  //   currentUser: null
  // }

componentDidMount() {

   this.props.getProfileFetch()

  const jwt = localStorage.getItem('jwt')

  if (jwt){
    fetch(AUTOLOGINURL, {
      headers: {
        "Authorization": jwt
      }
    })
      .then(res => res.json())
      .then((response) => {
        if (response.errors) {
          alert(response.errors)
        } else {
          this.setState({currentUser: response})
        }
      })
  }
}


  //
  // getCompanies(){
  //   let companies = [...this.state.companies]
  //   console.log(companies)
  //   return companies.map(company=>{
  //     console.log('in fetch,  company:',company)
  //     return <Company company={company}/>
  //   })
  // }

  /*
  componentDidMount(){
    fetch(userUrl)
    .then(res=>res.json())
    .then(users=>{
      this.setState({
        users: users,
        currentUser: users.find(user=> user.name === "Brian")

      })
    })

    fetch(companyUrl)
    .then(res=>res.json())
    .then(companies=>{

      this.setState({
        allCompanies: companies
      })
    })
    fetch(rideUrl)
    .then(res=>res.json())
    .then(rides=>{

      this.setState({
        rides
      })
    })
    const forumUrl = 'https://ride-share-api.herokuapp.com/api/v1/forums'
    fetch(forumUrl)
    .then(res=>res.json())
    .then(allForums=>{
      this.setState({
        allForums
      })
    })
  }

*/
handleLogout = event => {
  event.preventDefault()
  // Remove the token from localStorage
  localStorage.removeItem("token")
  // Remove the user object from the Redux store
  this.props.logoutUser()
}

	setCurrentUser = (response) => {
    // we need to set the current user and the token
		// localStorage.setItem("token", response.jwt)

		this.setState({
			currentUser: response
		})
	}

	updateUser = (user) => {
    // this is just so all of our data is as up to date as possible now that we are
    // just keep state at the top level of our application in order to correctly update
    // we must have the state be updated properly
		this.setState({
			currentUser: user
		})
	}
  //
	// logout = () => {
  //   // we need to reset state and remove the current user and remove the token
	// 	// localStorage.removeItem("token")
	// 	this.setState({
	// 		currentUser: null
	// 	}, () => { this.props.history.push("/login") })
	// }

  renderProfileLink = () => {
    // console.log('in render profile link')
    // debugger
    if(this.props.currentUser){
      console.log(this.props)
      return <Link to={`/profile/${this.props.currentUser.id}`}>Profile</Link>
    }
  }


  patchEditProfile = (e, state) => {
    // debugger
    // let userUrl = 'https://ride-share-api.herokuapp.com/api/v1/users'
    let id = this.state.currentUser.id
    // let id = parseInt(this.match.params.id)
    // debugger
    e.preventDefault()
    fetch(`${USERURL}/${id}`,{
      headers:{
        'accepts':'application/json',
        'content-type':'application/json'
      },
      method:'PATCH',
      body:JSON.stringify({
        name:state.nameValue,
        experience:state.experienceValue,
        car:state.carValue,
        companies:state.companiesValue,
        location:state.locationValue,
        rating:state.ratingValue,
      })
    })
    .then(r => r.json())
    .then(res => {
      this.setState({
        currentUser: res,
        modal: false
      })
    })
  }

renderHeader=()=>{
  return (
    <>
    <Header />
    <Navbar bg='dark' expand='sm' role="banner" class="navbar navbar-fixed-top navbar-inverse">
      <div class="container">
         <div class="navbar-header">
           <button data-toggle="collapse-side" data-target=".side-collapse" data-target-2=".side-collapse-container" type="button" class="navbar-toggle pull-left"><span class="icon-bar"></span><span class="icon-bar"></span><span class="icon-bar"></span></button>
         </div>
         <div class="navbar-inverse side-collapse in">
           <nav role="navigation" class="navbar-collapse">
             <ul class="nav navbar-nav">
               {this.renderProfileLink()}
               <Link to="/rides">Rides</Link>
               <Link to="/forums">Forums</Link>

             </ul>
           </nav>
         </div>
       </div>
     </Navbar>
  </>
  )

}

// <Nav className="mr-auto">
//   <Nav.Link>{this.renderProfileLink()}</Nav.Link>
//   <Nav.Link><Link to="/rides">Rides</Link></Nav.Link>
//   <Nav.Link><Link to="/forums">Forums</Link></Nav.Link>
// </Nav>
renderProfileRoute=()=>{
  return (
    <>
    <Route path="/profile/:id" exact render={(props) => {
        // debugger
        let id = parseInt(props.match.params.id)
        // let userUrl = 'https://ride-share-api.herokuapp.com/api/v1/users'
        debugger
      if(this.props.currentUser){
        debugger
        if(id !== this.props.currentUser.id){
          let ourUser = this.props.users.find(u => u.id === id )
          // debugger
          return (
            <Profile
              {...props}
              allCompanies={this.props.allCompanies}
              currentUser={this.props.currentUser}
              user={ourUser}
              handleEdit={this.patchEditProfile}
            />
          )
        }
        else {
          // let ourOtherUser = this.state.currentUser
          // debugger
          return (
            <Profile
              {...props}
              allCompanies={this.props.allCompanies}
              currentUser={this.props.currentUser}
              user={this.props.currentUser}
              handleEdit={this.patchEditProfile}
            />
          )
        }}
    }}/>
    </>
  )

}
renderbootstrapheader=()=>{
  return (
    <>
    <Header />
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


renderMainPage =()=>{
  return (
    <>
    <Fragment>
    <Route path="/profile/:id" exact render={(props) => {
        // debugger
        let id = parseInt(props.match.params.id)
        // let userUrl = 'https://ride-share-api.herokuapp.com/api/v1/users'
      if(this.props.currentUser){
        if(id !== this.props.currentUser.id){
          let ourUser = this.state.users.find(u => u.id === id )
          // debugger
          return (
            <Profile
              {...props}
              allCompanies={this.state.allCompanies}
              currentUser={this.state.currentUser}
              user={ourUser}
              handleEdit={this.patchEditProfile}
            />
          )
        }
        else {
          // let ourOtherUser = this.state.currentUser
          // debugger
          return (
            <Profile
              {...props}
              allCompanies={this.props.allCompanies}
              currentUser={this.props.currentUser}
              user={this.props.currentUser}
              handleEdit={this.patchEditProfile}
            />
          )
        }}
    }}/>


    <Route path="/rides" exact render={() => {
      return (
        <Fragment>
        <Rides
          allUsers={this.state.users}
          user={this.state.currentUser}
          forum={this.state.forums}
          rides={this.state.rides}
          allCompanies={this.state.allCompanies}
        />
        </Fragment>
      )}

      }/>
    {/* WE ONLY DOING THE FISRT USER FOR NOW, K?*/}
    <Route path="/forums" exact render={() => {
      return (
        <Fragment>
        <ForumsPage
        users={this.state.users}
        currentUser={this.state.currentUser}
        />
        </Fragment>
      )}

      }/>
      <Route path="/" exact render={() => {
        return (
          <Fragment>
          <Rides
            allUsers={this.props.users}
            users={this.props.users}
            user={this.props.currentUser}
            forum={this.props.forums}
            rides={this.props.rides}
            allCompanies={this.props.allCompanies}
          />
          </Fragment>
        )}
      }/>


</Fragment>

    </>
  )
}
//for logout render button
// {this.props.currentUser.username
//   ? <Button onClick={this.handleLogout}>Log Out</Button>
//   : null
// }
  render() {
    //console.log('in app render', this.state)
    return (
   <div>
     <Switch>
       <Redirect exact from="/" to="/login" />
       <Route path="/signup"  render={routerProps => <SignupForm {...routerProps} renderProfileLink={this.renderProfileLink} renderHeader={this.renderbootstrapheader}/>}/>
       <Route path="/login" render={routerProps => <LoginForm {...routerProps} renderProfileLink={this.renderProfileLink}  renderHeader={this.renderbootstrapheader}/>}/>
       {this.renderProfileRoute()}
       <Route path="/rides" render={routerProps=><Rides {...routerProps} renderProfileLink={this.renderProfileLink} renderHeader={this.renderbootstrapheader}/>}/>
       <Route path="/forums" render={routerProps=><ForumsPage {...routerProps}renderProfileLink={this.renderProfileLink}  renderHeader={this.renderbootstrapheader}/>}/>
     </Switch>

   </div>
 );
    // return (
    //   <>
    //     <Grid>
    //     {this.renderbootstrapheader()}
		// 		<Grid.Row centered>
		// 			<Switch>
		// 				<Route path="/login" render={routerProps => <LoginForm {...routerProps} setCurrentUser={this.setCurrentUser} />} />
		// 				<Route path="/signup"  render={routerProps => <SignupForm {...routerProps} setCurrentUser={this.setCurrentUser} />} />
		// 			</Switch>
		// 		</Grid.Row>
		// 	</Grid>
    //     {this.renderMainPage()}
    //
    //   </>
    // );
  }
}


const mapDispatchToProps = dispatch => ({
  getProfileFetch: () => dispatch(getProfileFetch()),
  fetchUsers: () => dispatch(fetchUsers()),
  setLogout: () => dispatch(setLogout())
})
function mapStateToProps(state) {
  // maps the state from the store to the props
  return {
    allCompanies:[],
    rides: [],
    forums:[],
    allForums:[],
    users:[],
    currentUser: null
  }
}

// higher order function => it returns another function or takes one as an arguement or both
// higher order component => function that takes a component returns another compoonbent
// const HOC = connect(mapStateToProps)
//
// export default HOC(App);

export default connect(mapStateToProps, mapDispatchToProps)(App);

// export default App
