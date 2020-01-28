import React from 'react'
import { Form, Button } from 'semantic-ui-react'
import { connect } from 'react-redux';
import {createUser} from '../Actions';



class SignupForm extends React.Component {
	state = {
		name: "",
		username: "",
		password: "",
		passwordConfirmation: "",
		// profilePic:null,
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


	handleSubmit = () => {
		if(this.state.password === this.state.passwordConfirmation){
			// this.createUser()
			console.log('in handle submit create user')
			this.props.createUser(this.state)
		} else {
			alert("Passwords don't match!")
		}
	}

	fileSelectedHandler = (event)=>{
		this.setState({selectedFile:event.target.files[0]})
	}
	fileUploadHandler=()=>{

	}

	// onDrop=(pic) =>{
	// 	console.log('Setting state profilePic to ',pic)
  //       this.setState({
  //           profilePic: pic[0],
  //       });
  //   }
	// <ImageUploader
	// 			withIcon={true}
	// 			withLabel={true}
	// 			label='Profile Picture'
	// 			buttonText='Choose image'
	// 			onChange={this.onDrop}
	// 			imgExtension={['.jpg', '.gif', '.png', '.gif']}
	// 			maxFileSize={5242880}
	// 			singleImage={true}
	// 	/>

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
				<Form.Field>


				</Form.Field>
		    <Button type='submit'>Submit</Button>
		  </Form></>
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
