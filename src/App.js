import React, { Component, Fragment} from 'react';
import { Link, Route } from 'react-router-dom'
import logo from './logo.svg';
import './App.css';
import Company from './Components/Company.js'
import Header from './Components/Header.js'
import Rides from './Components/Rides.js'
import Forums from './Components/Forums.js'
import Profile from './Components/Profile.js'

// function Forum() {
//   return <h2> Forums </h2>
// }


class App extends Component {

  state = {
    modal: false,
    allCompanies:[],
    users: [],
    rides: [],
    forums:[],
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
    const userUrl = 'http://localhost:3000/api/v1/users'
    fetch(userUrl)
    .then(res=>res.json())
    .then(users=>{

      this.setState({
        users: users,
        currentUser: users.find(user=> user.name==="Jordan Ginor")
      })
    })

    const companyUrl = 'http://localhost:3000/api/v1/companies'
    fetch(companyUrl)
    .then(res=>res.json())
    .then(companies=>{

      this.setState({
        allCompanies: companies
      })
    })
    const rideUrl = 'http://localhost:3000/api/v1/rides'
    fetch(rideUrl)
    .then(res=>res.json())
    .then(rides=>{

      this.setState({
        rides
      })
    })
  }




  render() {
    console.log('in app render', this.state)
    return (
      <Fragment>
        <Header />
        <div className="container col-11">
          <Link to="/profile">Profile</Link>
          <Link to="/rides">Rides</Link>
          <Link to="/forums">Forums</Link>
        </div>

          <Route path="/rides" exact component={Rides} />
          {/* WE ONLY DOING THE FISRT USER FOR NOW, K?*/}
          <Route path="/profile" exact render={() => {
            return (
              <Profile
                user={this.state.currentUser}
                rides={this.state.rides}
                forum={this.state.forums}
                allCompanies={this.state.allCompanies}
              />)}
            }/>
          <Route path="/forums" exact component={Forums} />
          <Route path="/" exact component={Forums} />

      </Fragment>
    );
  }
}

export default App;
