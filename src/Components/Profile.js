import React,{Fragment} from "react";
import ProfileCard from './ProfileCard'
import RideList from './RideList.js'
import ForumsList from './ForumsList.js'
import Modal from './Modal.js'
import ReactModal from 'react-modal'

class Profile extends React.Component {
  constructor(props){
    super(props)
    this.state={
      modal: false,
      user:props.user,
      name:props.user.name,
      car: props.user.car,
      companies:props.user.companies,
      experience:props.user.experience,
      location:props.user.location,
      rating:props.user.rating,
      id:props.user.id
    }
    console.log('profile constructor props',props)
  }
  componentWillReceiveProps(props){
    this.setState({
      user:props.user,
      name:props.user.name,
      car: props.user.car,
      companies:props.user.companies,
      experience:props.user.experience,
      location:props.user.location,
      rating:props.user.rating,
      id:props.user.id
    })
  }

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
    this.patchEditProfile(e, state)

  }

  patchEditProfile(e, state){
    // debugger
    e.preventDefault()
    const profileUrl=`http://localhost:3000/api/v1/users/${this.state.id}`
    fetch(profileUrl,{
      headers:{
        'accepts':'application/json',
        'content-type':'application/json'
      },
      method:'PATCH',
      body:JSON.stringify({
        name:state.nameValue,
        experience:state.experienceValue,
        car:state.carValue,
        companies:state.companiesValue,
        location:state.locationValue,
        rating:state.ratingValue,
      })
    })
    .then(res=>{
      console.log(res)
      return res.json()
    })
    .then(editProfile=>{
      // debugger
      this.setState({
        modal:false,
        user: editProfile,
        name: editProfile.name,
        car: editProfile.car,
        experience: editProfile.experience,
        location: editProfile.location,
        rating: editProfile.rating,
        companies: state.companiesValue
      })
    })
  }

  renderModal = () => {
    if(this.props.user) {
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

  render() {
    console.log("rendering profile", this.state)

    // console.log("hit profile route", this.props)

    return (
      <Fragment>
        <div className = "container col-11">
          <div className="row justify-content-center">
            <div className="col-3 justify-content-center" id="profile-card-container">
              <ProfileCard user={this.state.user} companies={this.state.companies}/>
              <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#exampleModalCenter" id="edit-profile" onClick={this.handleEdit}> Edit Profile </button>
              {this.renderModal()}
            </div>
            <div className="col" id="profile-rides-list">
              <RideList rides={this.props.user.rides}/>
              <ForumsList forums={this.props.user.forums}/>
            </div>
          </div>
        </div>
      </Fragment>
    )
  }
}
export default Profile
