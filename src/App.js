import React, { Component, Fragment} from 'react';
import { Link, Route } from 'react-router-dom'
import './App.css';
import Header from './Components/Header.js'
import Rides from './Components/Rides.js'
import ForumsPage from './Components/ForumsPage.js'
import Profile from './Components/Profile.js'


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




  render() {
    //console.log('in app render', this.state)
    return (
      <Fragment>
        <Header />
        <div className="container col-11">
          {this.renderProfileLink()}
          <Link to="/rides">Rides</Link>
          <Link to="/forums">Forums</Link>
        </div>



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
    );
  }
}

export default App;




// <Route path="/profile" exact render={() => {
//   return (
//     <Profile
//     user={this.state.currentUser}
//     rides={this.state.rides}
//     forum={this.state.forums}
//     allCompanies={this.state.allCompanies}
//     />
//   )}
// }/>
