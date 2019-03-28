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
      user:"",
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
  //   this.setState({
  //     user:props.user,
  //     // name:props.user.name,
  //     // car: props.user.car,
  //     // companies:props.user.companies,
  //     // experience:props.user.experience,
  //     // location:props.user.location,
  //     // rating:props.user.rating,
  //     // id:props.user.id
  //   })
  // }

  componentDidMount(){
    let userUrl = 'http://localhost:3000/api/v1/users'
    let id = parseInt(this.props.match.params.id)
    // debugger
    fetch(`${userUrl}/${id}`)
    .then(res => res.json())
    .then(res => {
      this.setState({
        user: res
      })
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
    let userUrl = 'http://localhost:3000/api/v1/users'
    let id = parseInt(this.props.match.params.id)
    // debugger
    e.preventDefault()
    fetch(`${userUrl}/${id}`,{
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
    .then(r => r.json())
    .then(res => {
      this.setState({
        user: res,
        modal: false
      })
    })
  }

  renderModal = () => {
    if(this.state.user) {
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

  render() {
    // debugger
    console.log("rendering profile", this.state)

    // console.log("hit profile route", this.props)

    return (
      <Fragment>
        <div className = "container col-11">
          <div className="row justify-content-center">
            <div className="col-3 justify-content-center" id="profile-card-container">
              <ProfileCard user={this.state.user} companies={this.state.user.companies}/>
              <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#exampleModalCenter" id="edit-profile" onClick={this.handleEdit}> Edit Profile </button>
              {this.renderModal()}
            </div>
            <div className="col" id="profile-rides-list">
              <RideList rides={this.state.user.rides}/>
              <ForumsList forums={this.state.user.forums}/>
            </div>
          </div>
        </div>
      </Fragment>
    )
  }
}
export default Profile
