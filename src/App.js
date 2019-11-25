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
import {getProfileFetch, setLogout,fetchUsers,fetchRides,fetchForums,fetchCompanies} from './Actions';

import './App.css';



class App extends React.Component {

	componentDidMount() {
    this.props.getProfileFetch();
		this.props.fetchRides();
		this.props.fetchUsers();
		this.props.fetchForums();

	}
	renderUserPage=()=>{
		return (
		 <>
		 <Route path="/users/:id" exact render={(props) => {

				 let paramid = parseInt(props.match.params.id)
				 if(this.props.currentUser){

					  debugger
						if(paramid !== this.props.currentUser.id){
							let userFromParams = this.props.users.find(u => u.id === paramid )
							return (
							 <Profile
								 {...props}
								 allCompanies={this.props.allCompanies}
								 currentUser={this.props.currentUser}
								 user={userFromParams}
							 />)
					 }
				 }	}} />
			 </>
	 )
 }
 renderPage=(rout)=>{
	 let paramid = parseInt(rout.match.params.id)
	 console.log('in render page',this.props)
	 if(this.props.currentUser){

			// debugger
			if(paramid !== this.props.currentUser.id){
				let userFromParams = this.props.users.find(u => u.id === paramid )
				return (
				 <Profile
					 {...rout}
					 allCompanies={this.props.allCompanies}
					 isCurrentUserProfile={false}
					 currentUser={this.props.currentUser}
					 user={userFromParams}
				 />)
		 }
	 }

 }
	renderProfileRoute=()=>{
	  return (
			<>
	    <Route path="/users/:id" exact render={(props) => {
	        // debugger
	        let id = parseInt(props.match.params.id)
	        // let userUrl = 'https://ride-share-api.herokuapp.com/api/v1/users'
	        // debugger
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
		// <Route path="/users/:id" exact render={routerProps => <Profile currentUser={this.props.currentUser} {...routerProps} />} />
		// <Route path="/profile" component={Profile} />
		// debugger
		// <Route path="/users/:id" render={routerProps => <Profile {...routerProps} allCompanies={this.props.allCompanies} currentUser={this.props.currentUser} user={this.props.currentUser} />} />
		// {this.renderProfileRoute()}
    return (
      <>
      <Grid>
        <Header history={this.props.history}  currentUser={this.props.currentUser} />
        <Grid.Row centered>
          <Switch>
						<Route path="/profile" render={routerProps => <Profile {...routerProps} allCompanies={this.props.allCompanies}	 isCurrentUserProfile={false} currentUser={this.props.currentUser} user={this.props.currentUser} />} />
						<Route path="/user/:id" render={(routerProps) => this.renderPage(routerProps)} />


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
	fetchForums:() => dispatch(fetchForums()),
	fetchUsers:()=>dispatch(fetchUsers()),
	fetchCompanies:()=>dispatch(fetchCompanies())
})
function mapStateToProps(state) {
  // maps the state from the store to the props
	// debugger
	const { user } = state;
  const { rides} = state.rides;
  const {forums}= state.forums;
	// console.log('mapping state in rides',user)
  // debugger
  return {
    allCompanies:user.allCompanies,
    rides: rides[0],
    forums:user.forums,
    allForums: forums[0],
    users:user.users[1],
    currentUser:user.currentUser
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(App);
