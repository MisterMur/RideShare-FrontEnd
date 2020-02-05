import React from 'react'
import { connect } from 'react-redux';
import {Link} from 'react-router-dom'


//library imports
import TextField from "@material-ui/core/TextField";
import { Form, Button } from 'semantic-ui-react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye } from '@fortawesome/free-solid-svg-icons'


//action imports
import {createUser} from '../Actions';

//import Components
import PasswordStr from "./PasswordStr";
const FormValidators = require("./validate");
const zxcvbn = require("zxcvbn");




class SignupForm extends React.Component {
	state = {
		name: "",
		username: "",
		password: "",
		passwordConfirmation: "",
		btnTxt: "show",
    type: "password",
    score: "0",
		errors:{},
	}

	UNSAFE_componentWillReceiveProps(newProps) {
		if(newProps.currentUser){
			this.props.history.push(`/profile`)
		}
	}

	handleChange = (event) => {
		this.setState({
			[event.target.name]: event.target.value
		})
	}

	pwHandleChange=(event)=> {
		// const field = event.target.name;
		// const user ={
		// 	username:	this.state.username,
		// 	name:this.state.name,
		// 	password:this.state.password,
		// 	passwordConfirmation:this.state.passwordConfirmation
		// }
		//
		// user[field] = event.target.value;

		this.setState({
			password:event.target.value
		});

		if (event.target.value === "") {
			// debugger
			this.setState(state =>
				Object.assign({}, state, {
					score: "null"
				})
			);
		} else {

			let pw = zxcvbn(event.target.value);
			// debugger
			this.setState(state =>
				Object.assign({}, state, {
					score: pw.score + 1
				})
			);
		}
}


	handleSubmit = () => {
		if(this.state.password === this.state.passwordConfirmation){
			// this.createUser()
			console.log('in handle submit create user')
			this.props.createUser(this.state)
		} else {
			alert("Passwords don't match!")
		}
	}

	pwMask=(event) =>{
	 event.preventDefault();
	 this.setState(state =>
		 Object.assign({}, state, {
			 type: this.state.type === "password" ? "input" : "password",
			 btnTxt: this.state.btnTxt === "show" ? "hide" : "show"
		 })
	 );
 }


	// <Form.Field>
	// 	<label>Username</label>
	// 	<input onChange={this.handleChange} name="username" value={this.state.username} placeholder='Username' />
	// </Form.Field>
	// <Form.Field>
	// 	<label>Name</label>
	// 	<input onChange={this.handleChange} name="name" value={this.state.name} placeholder='Name' />
	// </Form.Field>



	render(){
		return (
			<div className="container">

				<div className="authBox">
					<h1>Sign Up</h1>

					<Form className='col' onSubmit={this.handleSubmit}>
						<Form.Field>
							<TextField
								name="username"
								label="Username"
								value={this.state.username}
								onChange={this.handleChange}
								style={{width:'50%'}}
								/>
						</Form.Field>
						<Form.Field>
							<TextField
								name="name"
								label="Name"
								value={this.state.name}
								onChange={this.handleChange}
								style={{width:'50%'}}

								/>
						</Form.Field>
						<Form.Field>
							<TextField
			          type={this.state.type}
			          name="password"
			          label="Password"
			          value={this.state.password}
			          onChange={this.pwHandleChange}
			          errorText={this.state.errors.password}
								style={{width:'50%'}}

			        />
						</Form.Field>
						<FontAwesomeIcon id="pwShowHideBtn" onClick={this.pwMask} icon={faEye} />


						<div className="pwStrRow">
		          {this.state.score >= 1 ? (
		            <div>
		              <PasswordStr score={this.state.score} />


		            </div>
							):null}
		        </div>
						<Form.Field>
							<TextField
								type={this.state.type}
								name="passwordConfirmation"
								label="Confirm Pssword"
								value={this.state.passwordConfirmation}
								onChange={this.handleChange}
								errorText={this.state.errors.pwconfirm}
								style={{width:'50%'}}

								/>
						</Form.Field>

						<br/>
						<Form.Field>
							<Button className='btn btn-primary' color="teal" style={{width:'60%',}} type='submit'>Submit</Button>
						</Form.Field>
					</Form>
					<br/>
					<p> Aleady have an account? <br />
						<Link to='/login'>
							Login Here!

						</Link>
		      </p>
				</div>

			</div>
		)
	}
}
// <input type="file" onChange={this.fileSelectedHandler}/>
// <button onClick={this.fileUploadHandler}></button>
function mapStateToProps(state) {
  // maps the state from the store to the props
  const {user} = state
  return {
    currentUser: user.currentUser
  }
}

const mapDispatchToProps = dispatch => ({
  createUser: userInfo => dispatch(createUser(userInfo))
})

export default connect(mapStateToProps, mapDispatchToProps)(SignupForm);
