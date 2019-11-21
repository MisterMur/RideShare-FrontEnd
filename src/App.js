import React, { Component, Fragment} from 'react';
import { Link, Route,Switch } from 'react-router-dom'
import './App.css';
import {Grid} from 'semantic-ui-react'
import Header from './Components/Header.js'
import Rides from './Components/Rides.js'
import ForumsPage from './Components/ForumsPage.js'
import Profile from './Components/Profile.js'
import { connect } from 'react-redux';
import { fetchUsers } from './Actions';
import LoginForm from './Components/LoginForm.js'
import SignupForm from './Components/SignupForm.js'

import {Navbar, Nav, NavItem,NavDropdown} from 'react-bootstrap';

// import NavDropDown from 'react-bootstrap/NavDropDown'
// function Forum() {
//   return <h2> Forums </h2>
// }
const userUrl = 'https://ride-share-api.herokuapp.com/api/v1/users'
const companyUrl = 'https://ride-share-api.herokuapp.com/api/v1/companies'
const rideUrl = 'https://ride-share-api.herokuapp.com/api/v1/rides'

class App extends Component {

  state = {
    modal: false,
    allCompanies:[],
    users: "",
    // users: [],
    rides: [],
    forums:[],
    allForums:[],
    friendships: [],
    currentUser: ''
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

  renderProfileLink = () => {
    if(this.state.currentUser){
      return <Link to={`/profile/${this.state.currentUser.id}`}>Profile</Link>
    }
  }


  patchEditProfile = (e, state) => {
    // debugger
    // let userUrl = 'https://ride-share-api.herokuapp.com/api/v1/users'
    let id = this.state.currentUser.id
    // let id = parseInt(this.match.params.id)
    // debugger
    e.preventDefault()
    fetch(`${userUrl}/${id}`,{
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

renderbootstrapheader=()=>{
  return (
    <>
    <Header />
    <Navbar bg="dark" expand="md">
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link>{this.renderProfileLink()}</Nav.Link>
          <Nav.Link><Link to="/rides">Rides</Link></Nav.Link>
          <Nav.Link><Link to="/forums">Forums</Link></Nav.Link>
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
      if(this.state.users){
        if(id !== this.state.currentUser.id){
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
          let ourOtherUser = this.state.currentUser
          // debugger
          return (
            <Profile
              {...props}
              allCompanies={this.state.allCompanies}
              currentUser={this.state.currentUser}
              user={ourOtherUser}
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
            allUsers={this.state.users}
            users={this.state.users}
            user={this.state.currentUser}
            forum={this.state.forums}
            rides={this.state.rides}
            allCompanies={this.state.allCompanies}
          />
          </Fragment>
        )}
      }/>


</Fragment>

    </>
  )
}


  render() {
    //console.log('in app render', this.state)
    return (
      <>
        <Grid>
        {this.renderbootstrapheader()}
				<Grid.Row centered>
					<Switch>
						<Route path="/login" render={routerProps => <LoginForm {...routerProps} setCurrentUser={this.setCurrentUser} />} />
						<Route path="/signup" component={SignupForm} />
					</Switch>
				</Grid.Row>
			</Grid>
        {this.renderMainPage()}

      </>
    );
  }
}


function mapDispatchToProps(dispatch) {
  return {
    fetchUsers: (n) => dispatch(fetchUsers())
  }
}

// export default connect(null, mapDispatchToProps);

export default App
