import React,{Fragment} from "react";
import {connect} from 'react-redux'

import {Button} from 'react-bootstrap'

//import components
import ProfileCard from './ProfileCard'
import RideList from './RideList.js'
import ForumsList from './ForumsList.js'
import Modal from './Modal.js'
import FriendsBox from './friends-box'


//import actions
import {
  fetchFollowing,fetchUser,fetchFriendships,
  postNewFriendship,unfollow,fetchCompanies,
  fetchCurrentUser,patchEditProfile,postNewRide,
} from '../Actions.js'

//library imports
import SlideToggle from "react-slide-toggle";

//import constants
import {USERURL} from '../Constants'
// const eases = window.eases;



const ProgressBar = ({ progress }) => {
  return (
    <span className="progress-bar">
      <span
        className="progress-bar__inner"
        style={{
          transform: `scaleX(${progress})`
        }}
      />
    </span>
  );
};

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
      currentUser:this.props.currentUser,
      ride:{
        started_at:'',
        end_at:'',
        price:'',
        distance:'',
        start_location:'',
        end_location:'',
        user_id:this.props.currentUser.id,
        company_id: 21,
      },

    }
  }
  componentDidMount(){
    this.props.fetchCompanies();
    this.props.fetchFriendships();



  }


UNSAFE_componentWillReceiveProps(newProps){



  if(newProps.user === newProps.currentUser){
    //its the current users profile
    this.setState({
      isCurrentUserProfile:true,
      user:newProps.currentUser,
    })
  }
  else{

    let followList=null;
    if(newProps.currentUser.following){
       followList = newProps.currentUser.following
    }
    //the page is not the current users profile
    if(followList.find(u=>u.id ===newProps.user.id)){
      // debugger
      this.setState({
        isCurrentUserProfile:newProps.isCurrentUserProfile,
        user:newProps.user,
        isFollowing:true
      })
    }else{
      // debugger

      this.setState({
        isCurrentUserProfile:newProps.isCurrentUserProfile,
        user:newProps.user,
        isFollowing:false,
      })
    }



  }


}


  handleEdit = (e) => {
    this.setState({modal:true})
  }

  handleAfterOpen=()=>{
    // console.log('opened')
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
    let tempUser = Object.assign({},this.props.currentUser)
    if(!tempUser.following.includes(this.props.user)){


      this.setState(prevState=>({
        isFollowing:!prevState.isFollowing,

      }))
    }

}


handleUnFollow = () => {
  // debugger
  this.props.fetchFriendships();

  this.props.unfollow(this.props.currentUser,this.props.user,this.props.friendships)

  this.setState(prevState=>({
    isFollowing:!prevState.isFollowing,

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
    if(this.props.user===this.props.currentUser){
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

  if(this.state.isFollowing===false)
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
    {this.state.user.forums ?
      <ForumsList forums={this.state.user.forums} handleForumClick={this.handleForumClick}/>
      :
      <div >
        <table className="table table-striped" >
          <thead className="thead-dark">
            <tr>
              <th scope="col">Num</th>
              <th scope="col">Forum Topics</th>
            </tr>
          </thead>
          <tbody>
            <td className="text-center" scope="row"> NOT A MEMBER OF ANY FORUMS </td>

          </tbody>
        </table>
      </div>
    }

    </>
  )
}
handleAddRideChange=(e)=>{
  this.setState({
    ride:{
      ...this.state.ride,
      [e.target.name]:e.target.value,
    }
  })
}
handleAddRide=(e)=>{
  // debugger

  if(
    this.state.ride.company_id &&
    this.state.ride.user_id &&
    this.state.ride.distance &&
    this.state.ride.price &&
    this.state.ride.start_location &&
    this.state.ride.end_location &&
    this.state.ride.started_at &&
    this.state.ride.end_at
  ){
    // post new ride then reset text inputs
    // console.log('adding ride: ', this.state.ride)

    this.state.ride.company_id = parseInt(this.state.ride.company_id)

    this.props.postNewRide(this.state.ride)
    this.setState({
      ride:{
        ...this.state.ride,

        distance:'',
        price:'',
        start_location:'',
        end_location:'',
        started_at:'',
        end_at:'',
      }

    })

  }else{
    // console.log('cant add ride:',this.state.ride)
    alert("Please enter all fields before adding a new ride!")
  }
}
renderAllCompanySelect=()=>{
  if(this.props.allCompanies){
    return (
      this.props.allCompanies.map((c,idx)=>{
        // console.log('company id' ,c.id)
        return (<option key={idx} value={c.id}> {c.name} </option>)
      })
    )

  }
}
displayAddRide=()=>{
  if(this.props.user===this.props.currentUser){
    return (<>
      <Fragment>

        <tr>
          <td colspan="7">
            <button className="btn btn-primary" id="addridebutton" onClick={this.handleAddRide}>Add Ride</button>
          </td>
        </tr>

        <tr>
          <th scope="row">
            <select className='addrideinput' value={this.state.ride.company_id} name="company_id"
            onChange={this.handleAddRideChange}
            >
              {this.renderAllCompanySelect()}


            </select>
          </th>
          <td><input className="addrideinput" type="number" name="distance" placeholder='Distance' value={this.state.ride.distance} onChange={this.handleAddRideChange}></input></td>
          <td><input className="addrideinput" type="datetime-local" name="started_at" value={this.state.ride.started_at} onChange={this.handleAddRideChange}></input></td>
          <td><input className="addrideinput" type="datetime-local" name="end_at" value={this.state.ride.end_at} onChange={this.handleAddRideChange}></input></td>
          <td><input className="addrideinput" type="number" placeholder='Price' name="price" value={this.state.ride.price} onChange={this.handleAddRideChange}></input></td>
          <td><input className="addrideinput" type="text" name="start_location" placeholder='Starting Location' value={this.state.ride.start_location} onChange={this.handleAddRideChange}></input></td>
          <td><input className="addrideinput" type="text" name="end_location" placeholder='Ending Location' value={this.state.ride.end_location} onChange={this.handleAddRideChange}></input></td>

        </tr>



      </Fragment>
      </>

    )

  }

}
renderPage=()=>{
  return (

    <Fragment>
      <div className = "container col-11">
        <div className="row justify-content-center">
          <div className="col-6 justify-content-center" id="profile-card-container">
            {this.renderProfileCard()}
            {this.renderEditButton()}
            {this.renderModal()}

          </div>
          <div className="col" id="profile-rides-list">
            {this.props.userProfile?
              <RideList displayAddRide={this.displayAddRide} rides={this.props.userProfile.rides}/>
              :
              null
            }
            {this.renderUserForums()}


          </div>




        </div>

        <div className="row" id="profile-following">
          {this.props.userProfile?(
            <>
            <SlideToggle
          duration={800}
          collapsed
          whenReversedUseBackwardEase

          render={({
            toggle,
            progress,
            setCollapsibleElement,
            range,
            toggleState
          }) => (
            <div className="slide-toggle">
              <div className="slide-toggle__header">
                <button id="followingbutton" className="slide-toggle__toggle" onClick={toggle}>
                  Following
                </button>
                <ProgressBar progress={progress} />
              </div>
              <div className="slide-toggle__box" ref={setCollapsibleElement}>
                <div className="slide-toggle__box-inner">
                  <FriendsBox followers={this.props.userProfile.following}/>
                  <button id='followingbutton' Click={toggle}>
                    Hide Following
                  </button>
                </div>
              </div>
            </div>
          )}
        />
        </>
          )
            :
            null
          }
          {this.props.userProfile?(
            <>
            <SlideToggle
          duration={800}
          collapsed
          whenReversedUseBackwardEase

          render={({
            toggle,
            progress,
            setCollapsibleElement,
            range,
            toggleState
          }) => (
            <div className="slide-toggle">
              <div className="slide-toggle__header">
                <button id='followingbutton' className="slide-toggle__toggle" onClick={toggle}>
                  Following
                </button>
                <ProgressBar progress={progress} />
              </div>
              <div className="slide-toggle__box" ref={setCollapsibleElement}>
                <div className="slide-toggle__box-inner">
                  <FriendsBox followers={this.props.userProfile.followers}/>
                  <button id='followingbutton' onClick={toggle}>
                    Hide Followers
                  </button>
                </div>
              </div>
            </div>
          )}
        />
      </>
          )
            :
            null
          }
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


  return {
    allCompanies:user.allCompanies,
    rides:user.rides,
    forums:forums.forums[0],
    allForums:user.forums,
    users:user.users,
    currentUser:user.currentUser,
    following:user.following,
    friendships:user.friendships,
    userProfile:user.userProfile,

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
  postNewRide:(r)=>dispatch(postNewRide(r)),
})

export default connect(mapStateToProps,mapDispatchToProps) (Profile)
