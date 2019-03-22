import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Company from './Components/Company.js'

class App extends Component {
  state={
    companies:[]
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
    console.log('in app render')
    return (
      <div className="App">
        {this.getCompanies()}
      </div>
    );
  }
}

export default App;
