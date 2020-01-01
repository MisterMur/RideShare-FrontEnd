import React,{Fragment} from "react";
import ProfileCard from './ProfileCard'
import RideList from './RideList.js'
import ForumsList from './ForumsList.js'
import Modal from './Modal.js'

import FriendsBox from './friends-box'
import {Button} from 'react-bootstrap'
import {connect} from 'react-redux'
import {fetchFollowing,fetchUser,fetchFriendships,postNewFriendship,unfollow,fetchCompanies,fetchCurrentUser,fetchUsers,patchEditProfile} from '../Actions.js'
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
      isCurrentUserProfile:null,
      isFollowing:null,

    }
  }
  componentDidMount(){
    this.props.fetchCompanies();
    this.props.fetchFriendships();

    let followList=null;
    if(this.props.currentUser.following){
       followList = this.props.currentUser.following
    }

    if(this.props.isCurrentUserProfile){
      //its the current users profile
      this.setState({
        isCurrentUserProfile:this.props.isCurrentUserProfile,
        user:this.props.currentUser
      })
    }
    else{
      //the page is not the current users profile
      if(followList.find(u=>u.id ==this.props.user.id)){

        this.setState({
          isCurrentUserProfile:this.props.isCurrentUserProfile,
          user:this.props.user,
          isFollowing:true
        })
      }else{

        this.setState({
          isCurrentUserProfile:this.props.isCurrentUserProfile,
          user:this.props.user,
          isFollowing:false,
        })
      }

    }


  }


componentWillReceiveProps(newProps){


  if(newProps.isCurrentUserProfile){
    this.setState({user:newProps.currentUser})
  }
  else{

      this.setState({
        user:newProps.user,
      })

    }

}


  handleEdit = (e) => {
    this.setState({modal:true})
  }

  handleAfterOpen=()=>{
    console.log('opened')
  }
  handleAfterClose=()=>{
    this.setState({modal:false})
  }

  handleSubmit=(e, state)=>{
    e.preventDefault()
    this.patchEditProfile(e, state)
    this.setState({
      modal: false
    })

  }
  handleDelete=(e)=>{
  }
  handleForumClick = (e) => {
    this.setState({clickedForum: e.target.id})
    this.setState({openChat: true})
  }


  renderModal = () => {
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
    this.props.postNewFriendship(this.props.currentUser,this.props.user)
    this.setState(prevState=>({
      isFollowing:!prevState.isFollowing
    }))

}
handleUnFollow = () => {
  this.props.unfollow(this.props.currentUser,this.props.user,this.props.friendships)
  let tempUser = Object.assign({},this.props.currentUser)
  // debugger
  // tempUser.followers = tempUser.followers.filter(f=>f.id=this.props.user.id)
  this.setState(prevState=>({
    isFollowing:!prevState.isFollowing,
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
      return (
        <>
        {this.renderFollowButton()}
        </>
      )
    }
  }

renderFollowButton=()=>{

  if(!this.state.isFollowing)
  {
    return   (
      <>
        <Button className="btn btn-primary"  id="follow-user" onClick={() => this.handleFollow()}> Follow this user </Button>
      </>
  )
  }
  else if (this.state.isFollowing){
    return (
      <>
        <Button className="btn btn-primary"  id="follow-user" onClick={() => this.handleUnFollow()}> Unfollow this user </Button>
      </>
    )
  }
}
renderUserForums=()=>{
  return (
    <>
    {this.state.user.forums.length!=0 ?
      <ForumsList forums={this.state.user.forums} handleForumClick={this.handleForumClick}/>
      :
      <div className="ride-list">
        <table className="table table-striped" >
          <thead className="thead-dark">
            <tr>
              <th scope="col">Num</th>
              <th scope="col">Forum Topics</th>
            </tr>
          </thead>
          <tbody>
            <th className="text-center"scope="row">NOT A MEMBER OF ANY FORUMS</th>

          </tbody>
        </table>
      </div>
    }

    </>
  )
}
renderPage=()=>{
  // <FriendsBox followers={this.state.user.following}/>
//
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
            {this.props.userProfile?
              <RideList rides={this.props.userProfile.rides}/>
              :
              null
            }

            {this.renderUserForums()}

            <div className="row" id="profile-follwoing">
              <h4>Following</h4>
              {this.props.userProfile?
                <FriendsBox followers={this.props.userProfile.following}/>
                :
                null
              }
              <h4>Followers</h4>
              {this.props.userProfile?
                <FriendsBox followers={this.props.userProfile.followers}/>
                :
                null
              }
            </div>
          </div>



        </div>

      </div>
    </Fragment>
  )

}


  render() {
    // debugger

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
  // debugger
  console.log('in mapStateToProps user following',user.userProfile)
  //issuing rendering only the users Forums
  //setting allForums (meant to tbe user.allForums to forums.forums
//to make sure rendering only one of each to users page for now)

  return {
    allCompanies:user.allCompanies[1],
    rides:user.rides,
    forums:forums.forums[0],
    allForums:user.forums,
    users:user.users[1],
    currentUser:user.currentUser,
    following:user.following,
    friendships:user.friendships,
    userProfile:user.userProfile,
    // user:user.user
  }
}

const mapDispatchToProps = dispatch => ({
  fetchUser:(u)=>dispatch(fetchUser(u)),
  fetchCompanies:()=>dispatch(fetchCompanies()),
  patchEditProfile:(d)=>dispatch(patchEditProfile(d)),
  postNewFriendship:(user,follow)=>dispatch(postNewFriendship(user,follow)),
  unfollow:(user,follow,friendships)=>dispatch(unfollow(user,follow,friendships)),
  fetchCurrentUser:(u)=>dispatch(fetchCurrentUser(u)),
  fetchFriendships:()=>dispatch(fetchFriendships()),
  fetchFollowing:(u)=>dispatch(fetchFollowing(u)),
})

export default connect(mapStateToProps,mapDispatchToProps) (Profile)
