import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';
import {userLoginFetch} from '../Actions';
import Profile from './Profile.js'
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
		console.log('in handle submit login')
		this.props.userLoginFetch(this.state)

	}

goToProfile=()=>{
	if(this.props.currentUser)
	{
		return(
			<>
			<Profile
				allCompanies={this.props.allCompanies}
				currentUser={this.props.currentUser}
				user={this.props.currentUser}
				handleEdit={this.patchEditProfile}
			/>
			</>
		)
	}
}



	render(){
		return (<>
			{this.props.renderHeader()}
			{this.props.goToProfile()}
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
