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


class App extends React.Component {

  render() {
    return (
      <div>

      </div>
    )
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


export default connect(mapStateToProps, mapDispatchToProps)(App);
