import React from 'react';
import {  Route,Switch, Redirect} from 'react-router-dom'

import { connect } from 'react-redux';

import {Grid} from 'semantic-ui-react'

import Header from './Components/Header.js'
import Rides from './Components/Rides.js'
import LoginForm from './Components/LoginForm.js'
import SignupForm from './Components/SignupForm.js'
import ForumsPage from './Components/ForumsPage.js'
import DiscoverPage from './Components/DiscoverPage.js'
import NotLoggedIn from './Components/NotLoggedIn.js'

import Profile from './Components/Profile.js'
import {fetchUser,getProfileFetch, setLogout,fetchUsers,fetchRides,fetchForums,fetchCompanies} from './Actions';

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
				 debugger

				 let paramid = parseInt(props.match.params.id)
				 if(this.props.currentUser){

					  // debugger
						if(paramid !== this.props.currentUser.id){
							let userFromParams = this.props.users.find(u => u.id === paramid )
							return (
							 <Profile
								 {...props}
								 allCompanies={this.props.allCompanies}
								 currentUser={this.props.currentUser}
								 user={userFromParams}
							 />)
					 }else{

					 }
				 }	}} />
			 </>
	 )
 }
 renderPage=(rout)=>{
	 let paramid = parseInt(rout.match.params.id)
	 if(this.props.currentUser){


			if(paramid !== this.props.currentUser.id){
				if(this.props.users){

					let userFromParams = this.props.users.find(u => u.id === paramid )
					
					this.props.fetchUser(userFromParams)
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
	 else{

		 if(this.props.users){
			//  let userFromParams = this.props.users.find(u => u.id === paramid )
			 // this.props.fetchUser(userFromParams)
			 // <Profile
				//  {...rout}
				//  isCurrentUserProfile={false}
				//  user={userFromParams}
				//  />
			 return (
				 <NotLoggedIn/>
			 )

		 }
	 }

 }
	renderProfileRoute=()=>{
	  return (
			<>
	    <Route path="/users/:id" exact render={(props) => {
	        let id = parseInt(props.match.params.id)
	      if(this.props.currentUser){
	        if(id !== this.props.currentUser.id){
	          let ourUser = this.props.users.find(u => u.id === id )
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

    return (
      <>
      <Grid>
        <Header history={this.props.history}  currentUser={this.props.currentUser} />
        <Grid.Row centered>
          <Switch>
						<Route path="/login" render={routerProps => <LoginForm {...routerProps} setCurrentUser={this.props.setCurrentUser} />} />
						<Route path="/profile" render={routerProps =>{
								if(this.props.currentUser){
									this.props.fetchUser(this.props.currentUser)
									return (
										<Profile {...routerProps} allCompanies={this.props.allCompanies}	 isCurrentUserProfile={false} currentUser={this.props.currentUser} user={this.props.currentUser} />
									)
								}else {
									return (

										<Route path="/" />
									)
								}

								}
						}
							/>
						<Route path="/user/:id" render={(routerProps) =>
									this.renderPage(routerProps)						} />

						<Route path="/discover" component={DiscoverPage} />

            <Route path="/forums" component={ForumsPage} />
            <Route path="/rides" component={Rides} />
						<Route path="/signup" render={routerProps => <SignupForm {...routerProps} setCurrentUser={this.props.setCurrentUser} />} />

						{!this.props.currentUser ?
							<Redirect from="*" to="/login" />
							:<>
							<Redirect from={'/user/'+this.props.currentUser.id} to="/profile"/>
							<Redirect from="*" to="/profile" /></>

						 }



          </Switch>
        </Grid.Row>
      </Grid>
      </>
    )
  }
}


const mapDispatchToProps = dispatch => ({
  getProfileFetch: () => dispatch(getProfileFetch()),
  setLogout: () => dispatch(setLogout()),
	fetchRides:() => dispatch(fetchRides()),
	fetchForums:() => dispatch(fetchForums()),
	fetchUsers:()=>dispatch(fetchUsers()),
	fetchCompanies:()=>dispatch(fetchCompanies()),
	fetchUser:(u)=>dispatch(fetchUser(u)),

})
function mapStateToProps(state) {
  // maps the state from the store to the props
	// debugger
	const { user } = state;
  const { rides} = state.rides;
  const {forums}= state.forums;

  return {
    allCompanies:user.allCompanies,
    rides: rides,
    forums:forums[0],
    allForums: forums[0],
    users:user.users,
    currentUser:user.currentUser
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(App);
