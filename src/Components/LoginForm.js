import React from "react";

import { Link} from 'react-router-dom'


import { MDBContainer, MDBRow, MDBCol } from 'mdbreact';
import TextField from "@material-ui/core/TextField";
import { connect } from 'react-redux';
import {userLoginFetch} from '../Actions';
import { Form, Button } from 'semantic-ui-react'
import '../App.css';


class LoginForm extends React.Component {

  state = {
    username: "",
    password: "",
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
    // console.log('in handle submit login')
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
        			          type='password'
        			          name="password"
        			          label="Password"
        			          value={this.state.password}
        			          onChange={this.handleChange}
                        style={{width:'50%'}}

        			        />
        						</Form.Field>

                  <div className="col text-center mt-4" id="authbutton">
                      <Button styel={{width:'60%'}} color="teal" className='btn btn-primary' type="submit">
                        Login
                      </Button>
                      <Link to='/signup' className='btn btn-primary' color='teal'>
                        Sign Up
                      </Link>
                  </div>
                </Form>
                <div className='text-center mt-4'>
                  <p className='h5 text-center mb-4'> guest / 1234 </p>
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
  // maps the state from the store to the props
  const {user} = state
  return {
    currentUser: user.currentUser
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
