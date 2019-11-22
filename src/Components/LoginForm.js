import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';
import {userLoginFetch} from '../Actions';

import { Form, Button } from 'semantic-ui-react'
import {LOGINURL} from '../Constants.js'

class LoginForm extends React.Component {
	state = {
		username: "",
		password: "",
	}
	componentWillReceiveProps(newProps) {
  if(!newProps.finished && this.props.finished) {
		debugger
		if(this.props.currentUser){

			this.props.navigate(`profile/${this.props.currentUser.id}`);
		}
  }
}

	handleChange = (event) => {
		this.setState({
			[event.target.name]: event.target.value
		})
	}

	handleSubmit = () => {

		this.props.userLoginFetch(this.state)

		// this.props.history.push(`/profile/${this.props.currentUser.id}`)



		// fetch(LOGINURL, {
		// 	method: "POST",
		// 	headers: {
		// 		"Content-Type": "application/json",
		// 		"Accepts": "application/json",
		// 	},
		// 	body: JSON.stringify(this.state)
		// })
		// .then(res => res.json())
		// .then((response) => {
		// 	if (response.errors) {
		// 		alert(response.errors)
		// 	} else {
		// 			// we need to login at the top level where we are holding our current user!
		// 			// setState in App to currentuse
		// 			// debugger
		// 			// debugger
		// 			this.props.setCurrentUser(response.user)
		// 			localStorage.setItem('jwt', response.jwt)
		// 			this.props.history.push(`/profile/${response.user.id}`)
		//
		// 			// return <><Link to={`/profile/${this.props.currentUser.id}`}>Profile</Link></>
		//
		//
		// 		}
		// 	})
	}





	render(){
		return (<>
			{this.props.renderHeader()}
			<Form onSubmit={this.handleSubmit}>
		    <Form.Field>
		      <label>Username</label>
		      <input onChange={this.handleChange} name="username" value={this.state.username} placeholder='Username' />
		    </Form.Field>
		    <Form.Field>
		      <label>Password</label>
		      <input onChange={this.handleChange} type="password" name="password" value={this.state.password} placeholder='Password' />
		    </Form.Field>
		    <Button type='submit'>Submit</Button>
		  </Form></>
		)
	}
}
const mapDispatchToProps = dispatch => ({
  userLoginFetch: userInfo => dispatch(userLoginFetch(userInfo))
})

export default connect(null, mapDispatchToProps)(LoginForm);
