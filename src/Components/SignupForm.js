import React from 'react'
import { Form, Button } from 'semantic-ui-react'
import {USERURL} from '../Constants.js'
import { connect } from 'react-redux';
import {createUser} from '../Actions';

class SignupForm extends React.Component {
	state = {
		name: "",
		username: "",
		password: "",
		passwordConfirmation: "",
	}

	handleChange = (event) => {
		this.setState({
			[event.target.name]: event.target.value
		})
	}

	// createUser = (login_data) => {
	// 	fetch(USERURL, {
	// 		method: "POST",
	// 		headers: {
	// 			"Content-Type": "application/json",
	// 			"Accepts": "application/json",
	// 		},
	// 		body: JSON.stringify(login_data)
	// 	})
	// 	.then(res => res.json())
	// 	.then((response) => {
	//
	// 		if (response.error){
	// 			alert(response.error)
	// 		} else {
	// 			// debugger
	// 			this.props.setCurrentUser(response.user)
	// 			localStorage.setItem('jwt', response.jwt)
	// 			this.props.history.push(`/users/${response.user.id}`)
	// 		}
	// 	})
	// }

	handleSubmit = () => {
		if(this.state.password === this.state.passwordConfirmation){
			// this.createUser()
			console.log('in handle submit create user')
			this.props.createUser(this.state)
		} else {
			alert("Passwords don't match!")
		}
	}
// 	handleSubmit = event => {
// 	event.preventDefault()
// }

	render(){
		return (<>
			<Form onSubmit={this.handleSubmit}>
		    <Form.Field>
		      <label>Username</label>
		      <input onChange={this.handleChange} name="username" value={this.state.username} placeholder='Username' />
		    </Form.Field>
		    <Form.Field>
		      <label>Name</label>
		      <input onChange={this.handleChange} name="name" value={this.state.name} placeholder='Name' />
		    </Form.Field>
		    <Form.Field>
		      <label>Password</label>
		      <input onChange={this.handleChange} type="password" name="password" value={this.state.password} placeholder='Password' />
		    </Form.Field>
		    <Form.Field>
		      <label>Password Confirmation</label>
		      <input onChange={this.handleChange} type="password" name="passwordConfirmation" value={this.state.passwordConfirmation} placeholder='Password Confirmation' />
		    </Form.Field>
		    <Button type='submit'>Submit</Button>
		  </Form></>
		)
	}
}

const mapDispatchToProps = dispatch => ({
  createUser: userInfo => dispatch(createUser(userInfo))
})

export default connect(null, mapDispatchToProps)(SignupForm);
