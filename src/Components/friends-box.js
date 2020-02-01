import React, {Component} from 'react'
import {connect} from 'react-redux'

import Profile from './Profile.js'
import FollowerCard from './FollowerCard.js'

class FriendsBox extends Component {

  handleUserClick=(e,user)=>{
    // if(user.id !== this.props.currentUser.id){
      // debugger
      return (
        <Profile
          {...this.props}
          user={this.props.user}
          />

      )

    
  }//end of handle user click


  followerCards = () => {

    if (this.props.followers){
       return this.props.followers.map((follower,idx) => {
         // debugger
        return (
          <div key={idx} className="card-rows">
            <FollowerCard
              handleUserClick={this.handleUserClick}
              key={idx}
              follower={follower}
              />
          </div>

        )


      })
    }
  }

  render(){
    return(
      <div className="card-group col-12" >
        {this.followerCards()}
      </div>
    )
  }

}
function mapStateToProps(state){
  const {user} = state
  return {
    currentUser:user.currentUser,
  }
}
export default connect(mapStateToProps)(FriendsBox)
