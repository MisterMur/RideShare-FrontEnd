import React,{Fragment} from "react";
import ProfileCard from './ProfileCard'
import RideList from './RideList.js'
import ForumsList from './ForumsList.js'
import Modal from './Modal.js'

import FriendsBox from './friends-box'
import {Button} from 'react-bootstrap'
import {connect} from 'react-redux'
import {postNewFriendship} from '../Actions.js'

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

//   componentWillMount() {
//   //
//     this.setState((prevState)=>{
//       currentUser:prevState.currentUser
//     });
//
// }


  // componentWillReceiveProps(props){
  //
  //   let userUrl = 'https://ride-share-api.herokuapp.com/api/v1/users'
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
    // let tempUser ={...this.props.user}
    this.props.postNewFriendship(this.props.currentUser,this.props.user)
    // this.setState(prevState=>{
    //   currentUser:{
    //     currentUser.followers:[...prevState.curentUser.followers, tempUser]
    //   }
    // })
    // this.setState(({currentUser})=>({currentUser:{
    //   ...currentUser,
    //   currentUser.followers:[...followers,tempUser]
    // }}))
    // debugger
    // fetch(`${USERURL}/${this.state.currentUser.id}`,{
    //   headers:{
    //     'accepts':'application/json',
    //     'content-type':'application/json'
    //   },
    //   method:'PATCH',
    //   body:JSON.stringify({
    //     followers:[...this.state.currentUser.followers,tempUser]
    //   })
    // })
    // .then(r => r.json())
    // .then(currentUser => {
    //   this.setState({
    //     currentUser
    //   })
    // })
}//hand follow
handleUnFollow = () => {
  console.log(this);
  let tempUser = Object.assign({},this.props.currentUser)
  // debugger
  // tempUser.followers = tempUser.followers.filter(f=>f.id=this.props.user.id)
  this.setState(prevState=>({
    currentUser:{
      ...prevState.currentUser,
      followers:tempUser.followers.filter(f=>f.id===this.props.user.id)
    }
  })
)

}
  renderProfileCard = () => {
    if(this.state.user){
      console.log('rendering profilecard',this.props.user)
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
    }else{
      // {this.renderFollowButton()}
      return (
        <>
        </>
      )
    }
  }

renderFollowButton=()=>{
  //if current user isnt following yet, render follow button
  //if current user is following render unfollow button
  let followList=null;
  if(this.props.currentUser.followers){

     followList = this.props.currentUser.followers
  }
  // debugger
  if(!  followList.find(x=>x.id ===this.props.user.id))
  {
    return   (
      <>
        <Button className="btn btn-primary"  id="follow-user" onClick={() => this.handleFollow()}> Follow this user </Button>
      </>
  )
  }
  else{
    return (
      <>
        <Button className="btn btn-primary"  id="follow-user" onClick={() => this.handleUnFollow()}> Unfollow this user </Button>
      </>
    )
  }
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


            </div>
            <div className="col" id="profile-rides-list">

              <RideList rides={this.props.user.rides}/>
              <ForumsList forums={this.props.user.forums}/>
              <FriendsBox followers={this.props.user.followers}/>


            </div>
          </div>

        </div>
      </Fragment>
    )
  }
}
function mapStateToProps(state) {
  // maps the state from the store to the props
	// debugger
	const { user } = state
	console.log('mapping state in profile',user)
  return {
    allCompanies:user.allCompanies,
    rides:user.rides,
    forums:user.forums,
    allForums:user.allForums,
    users:user.users,
    currentUser:user.currentUser
  }
}
const mapDispatchToProps = dispatch => ({
  postNewFriendship: () => dispatch(postNewFriendship())
})

export default connect(mapStateToProps,mapDispatchToProps) (Profile)
