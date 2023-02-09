import React from "react";

import { Link} from 'react-router-dom'


import { connect } from 'react-redux';
import {userLoginFetch} from '../Actions';

import { MDBContainer, MDBRow, MDBCol } from 'mdbreact';
import TextField from "@material-ui/core/TextField";
import { Form, Button } from 'semantic-ui-react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye ,faEyeSlash} from '@fortawesome/free-solid-svg-icons'

import '../App.css';


class LoginForm extends React.Component {

  state = {
    username: "",
    password: "",
    type: 'password',
    showPass: false
  }

  UNSAFE_componentWillReceiveProps(newProps) {
    if(newProps.currentUser){
      this.props.history.push(`/profile`)
    }
  }

	pwMask=(event) =>{
    event.preventDefault();
    this.setState(state =>
      Object.assign({}, state, {
        type: this.state.type === "password" ? "input" : "password",
        showPass: !this.state.showPass
      })
    );
    this.setState((prevState) =>  ({showPass: !prevState.showPass}))
  }
 
 

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit = () => {
    this.props.userLoginFetch(this.state)


  }

  render() {
    return (
      <div className="container">
        <div className="authBox">

          <MDBContainer  >
            <MDBRow >
              <MDBCol >
                <Form onSubmit={this.handleSubmit}>
                  <h1>Sign in</h1>

                  <Form.Field>
      							<TextField
      								name="username"
      								label="Username"
      								value={this.state.username}
      								onChange={this.handleChange}
                      style={{width:'50%'}}

      								/>
      						</Form.Field>

                  <br />
                    <Form.Field>
        							<TextField
        			          type={this.state.type}
        			          name="password"
        			          label="Password"
        			          value={this.state.password}
        			          onChange={this.handleChange}
                        style={{width:'50%'}}

        			        />
        						</Form.Field>
                      <FontAwesomeIcon id="pwShowHideBtn" onClick={this.pwMask} icon={this.state.showPass ? faEyeSlash : faEye} />

                  <div className="col text-center mt-4" >
                      <Button styel={{width:'60%'}} id="authbutton" color="teal" className='btn btn-primary' type="submit">
                        Login
                      </Button>
                      <Link to='/signup' id="authbutton" className='btn btn-primary' color='teal'>
                        Sign Up
                      </Link>
                  </div>
                </Form>
                <div className='text-center mt-4'>
                  <p className='h5 text-center mb-4'>  </p>
                </div>
              </MDBCol>
            </MDBRow>
          </MDBContainer>

        </div>

      </div>
    )
  }
}
const mapDispatchToProps = dispatch => ({
  userLoginFetch: userInfo => dispatch(userLoginFetch(userInfo))
})
function mapStateToProps(state) {
  const {user} = state
  return {
    currentUser: user.currentUser
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
