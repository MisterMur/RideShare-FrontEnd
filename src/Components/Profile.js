import React,{Fragment} from "react";
import ProfileCard from './ProfileCard'
import RideList from './RideList.js'
import ForumsList from './ForumsList.js'
import Modal from './Modal.js'

import FriendsBox from './friends-box'
import {Button} from 'react-bootstrap'
import {connect} from 'react-redux'
import {postNewFriendship,fetchCompanies,fetchCurrentUser,fetchUsers,patchEditProfile} from '../Actions.js'
import {USERURL} from '../Constants'
class Profile extends React.Component {
  constructor(props){
    super(props)
    this.state={
      modal: false,
      user:this.props.user,
      editedUser: this.props.user,
      clickedForum: null,
      openChat: false,
      isCurrentUserProfile:null

    }
  }
  componentDidMount(){
    this.props.fetchCompanies();
    this.setState({isCurrentUserProfile:this.props.isCurrentUserProfile})

  }


componentWillReceiveProps(newProps){
  if(newProps.isCurrentUserProfile){

    this.setState({user:newProps.currentUser})
  }
  else{
    this.setState({user:newProps.user})
  }



}


  handleEdit = (e) => {
    console.log(e)
    this.setState({modal:true})
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
    this.setState({
      modal: false
    })

  }
  handleDelete=(e)=>{
    console.log('in handle delete function',e.target)
  }
  handleForumClick = (e) => {
    this.setState({clickedForum: e.target.id})
    this.setState({openChat: true})
  }


  renderModal = () => {
    console.log('rendar modal with ', this.props.allCompanies)
    if(this.props.user) {
      return(
        <Modal
          state={this.state}
          props={this.props}
          companiesValue={this.props.allCompanies}
          currentUser={this.props.currentUser}
          handleAfterOpen={this.handleAfterOpen}
          handleAfterClose={this.handleAfterClose}
          handleEditFormChange={this.handleEditFormChange}
          handleSubmit={this.handleSubmit}
        />
      )
    }
  }

  patchEditProfile = (e, userData) => {

    e.preventDefault()
    if(this.props.currentUser){
      userData.id=this.props.currentUser.id;
      fetch(`${USERURL}/${this.props.currentUser.id}`,{
        headers:{
          'accepts':'application/json',
          'content-type':'application/json'
        },
        method:'PATCH',
        body:JSON.stringify({
          id:userData.id,
          name:userData.nameValue,
          experience:userData.experienceValue,
          car:userData.carValue,
          companies:userData.options,
          location:userData.locationValue,
          rating:userData.ratingValue,

        })
      })
      .then(r => r.json())
      .then(resUser => {
        this.setState({
          modal: false
        }  ,this.props.fetchCurrentUser(resUser.user)  )
      })
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
      return(
        <ProfileCard user={this.state.user} companies={this.state.user.companies}/>
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
renderPage=()=>{
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

            <RideList rides={this.state.user.rides}/>
            <ForumsList forums={this.state.user.forums} handleForumClick={this.handleForumClick}/>
            <FriendsBox followers={this.state.user.followers}/>
          </div>
        </div>

      </div>
    </Fragment>
  )

}


  render() {


    return (
      <>
      {this.props.currentUser ? this.renderPage() : <p>not logged in </p>}

      </>


    )
  }
}
function mapStateToProps(state) {
  // maps the state from the store to the props

	const { user } = state
  const { forums } = state
  console.log('profile mapstatetoprops staete',forums.forums[0])
  //issuing rendering only the users Forums
  //setting allForums (meant to tbe user.allForums to forums.forums
//to make sure rendering only one of each to users page for now)

  return {
    allCompanies:user.allCompanies[1],
    rides:user.rides,
    forums:forums.forums[0],
    allForums:forums.forums[0],
    users:user.users[1],
    currentUser:user.currentUser
  }
}

const mapDispatchToProps = dispatch => ({
  fetchCompanies:()=>dispatch(fetchCompanies()),
  patchEditProfile:(d)=>dispatch(patchEditProfile(d)),
  fetchCurrentUser:(u)=>dispatch(fetchCurrentUser(u))//,
})

export default connect(mapStateToProps,mapDispatchToProps) (Profile)
