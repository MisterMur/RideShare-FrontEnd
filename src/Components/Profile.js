import React,{Fragment} from "react";
import ProfileCard from './ProfileCard'
import RideList from './RideList.js'
import ForumsList from './ForumsList.js'
import Modal from './Modal.js'
import ReactModal from 'react-modal'
import FriendsBox from './friends-box'

class Profile extends React.Component {
  constructor(props){
    super(props)
    this.state={
      modal: false,
      // user:"",
      user:this.props.user,
      curentUser: this.props.currentUser,
      editedUser: this.props.user
      // name:props.user.name,
      // car: props.user.car,
      // companies:props.user.companies,
      // experience:props.user.experience,
      // location:props.user.location,
      // rating:props.user.rating,
      // id:props.user.id
    }
    console.log('profile constructor props',props)
  }

  // componentWillReceiveProps(props){
  //
  //   let userUrl = 'http://localhost:3000/api/v1/users'
  //   let id = parseInt(this.props.match.params.id)
  //   // debugger
  //   fetch(`${userUrl}/${id}`)
  //   .then(res => res.json())
  //   .then(res => {
  //     this.setState({
  //       user: res
  //     })
  //   })
  // }

  handleEdit = (e) => {
    console.log(e)
    this.setState({modal:true})
    // this.renderEditModal()
  }

  handleAfterOpen=()=>{
    console.log('opened')
  }
  handleAfterClose=()=>{
    console.log('closed')
    this.setState({modal:false})
  }

  handleSubmit=(e, state)=>{
    e.preventDefault()
    console.log('in save edit user',this.state)
    this.props.handleEdit(e, state)
    this.setState({
      modal: false
    })

  }
  handleDelete=(e)=>{
    console.log('in handle delete function',e.target)
  }


  renderModal = () => {
    if(this.props.user) {
      // debugger
      return(
        <Modal
          state={this.state}
          props={this.props}
          handleAfterOpen={this.handleAfterOpen}
          handleAfterClose={this.handleAfterClose}
          handleEditFormChange={this.handleEditFormChange}
          handleSubmit={this.handleSubmit}
        />
      )
    }
  }


  handleFollow = () => {
    console.log(this);
    debugger
}
  renderProfileCard = () => {
    if(this.state.user){
      // debugger
      return(
        <ProfileCard user={this.props.user} companies={this.props.user.companies}/>
      )
    }
  }
  renderEditButton=()=>{
    if(this.props.user==this.props.currentUser){
      return(
        <div>
        <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#exampleModalCenter" id="edit-profile" onClick={this.handleEdit}> Edit Profile </button>
        <button type="button" className="btn btn-primary"  id="edit-profile" onClick={this.handleDelete}> Delete Profile </button>
        </div>
      )
    }

  

  render() {


    console.log("rendering profile", this.state)
    // debugger


    return (
      <Fragment>
        <div className = "container col-11">
          <div className="row justify-content-center">
            <div className="col-3 justify-content-center" id="profile-card-container">
              {this.renderProfileCard()}
              {this.renderEditButton()}
              {this.renderModal()}
              <button type="button" className="btn btn-primary"  id="follow-user" onClick={() => this.handleFollow()}> Follow this user </button>
            </div>
            <div className="col" id="profile-rides-list">

              <RideList rides={this.state.user.rides}/>
              <ForumsList forums={this.state.user.forums}/>
              <FriendsBox followers={this.state.user.followers}/>

            </div>
          </div>

        </div>
      </Fragment>
    )
  }
}
export default Profile
