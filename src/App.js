import React, { Component, Fragment} from 'react';
import ReactDOM from 'react-dom'
import { Link, Route,Switch, Redirect} from 'react-router-dom'
// import { Router, Route, browserHistory,Switch,Redirect } from 'react-router'
// import { syncHistoryWithStore, routerReducer } from 'react-router-redux'
import { connect } from 'react-redux';

import {Grid} from 'semantic-ui-react'

import Header from './Components/Header.js'
import Rides from './Components/Rides.js'
import LoginForm from './Components/LoginForm.js'
import SignupForm from './Components/SignupForm.js'
import ForumsPage from './Components/ForumsPage.js'
import Profile from './Components/Profile.js'
import {getProfileFetch, setLogout,fetchUsers,fetchRides,fetchForums} from './Actions';

import './App.css';



class App extends React.Component {

	componentDidMount() {
    this.props.getProfileFetch();
		this.props.fetchRides();
		this.props.fetchUsers();
		this.props.fetchForums();

	}
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

	            />
	          )
	        }}
	    }}/>
	    </>
	  )

	}



  render() {
		console.log('app props',this.props)
		// {this.renderProfileRoute()}
		// <Route path="/users/:id" exact render={routerProps => <Profile currentUser={this.props.currentUser} {...routerProps} />} />
    return (
      <>
      <Grid>
        <Header history={this.props.history}  currentUser={this.props.currentUser} />
        <Grid.Row centered>
          <Switch>
						<Route path="/users/:id"component={Profile} />

            <Route path="/forums" component={ForumsPage} />
            <Route path="/rides" component={Rides} />
            <Route path="/login" render={routerProps => <LoginForm {...routerProps} setCurrentUser={this.props.setCurrentUser} />} />
            <Route path="/signup" component={SignupForm} />
          </Switch>
        </Grid.Row>
      </Grid>
      </>
    )
  }
}


const mapDispatchToProps = dispatch => ({
  getProfileFetch: () => dispatch(getProfileFetch()),
  fetchUsers: () => dispatch(fetchUsers()),
  setLogout: () => dispatch(setLogout()),
	fetchRides:() => dispatch(fetchRides()),
	fetchForums:() => dispatch(fetchForums())
})
function mapStateToProps(state) {
  // maps the state from the store to the props
	// debugger
	const { user } = state
	const {rides}=state
	const {forums}=state
	console.log('mapping state in app',user)
	// debugger
  return {
    allCompanies:user.allCompanies,
    rides:rides.rides,
    forums:user.forums,
    allForums:forums.forums,
    users:user.users,
    currentUser:user.currentUser
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(App);
