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
    companies:[],
    users: [],
    currentUser: ''
  }

  getCompanies(){
    let companies = [...this.state.companies]
    console.log(companies)
    return companies.map(company=>{
      console.log('in fetch,  company:',company)
      return <Company company={company}/>
    })
  }

  componentDidMount(){
    const userUrl = 'http://localhost:3000/api/v1/users'
    fetch(userUrl)
    .then(res=>res.json())
    .then(users=>{
      
      this.setState({
        users: users,
        currentUser: users[0]
      })
    })

    const companyUrl = 'http://localhost:3000/api/v1/companies'
    fetch(companyUrl)
    .then(res=>res.json())
    .then(companies=>{

      this.setState({
        companies: companies
      })
    })
  }




  render() {
    console.log('in app render', this.state)
    return (
      <Fragment>
        <Header />
        <Link to="/profile">Profile</Link>
        <Link to="/rides">Rides</Link>
        <Link to="/forums">Forums</Link>

        <Route path="/rides" exact component={Rides} />
        {/* WE ONLY DOING THE FISRT USER FOR NOW, K?*/}
        <Route path="/profile" exact render={() => {return <Profile user={this.state.currentUser}/>}} />
        <Route path="/forums" exact component={Forums} />
        <Route path="/" exact component={Forums} />
        <div className="App">
          {this.getCompanies()}
        </div>
      </Fragment>
    );
  }
}

export default App;
