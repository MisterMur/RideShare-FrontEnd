import React, {Component} from 'react'
import {connect} from 'react-redux'

import Profile from './Profile.js'
import FollowerCard from './FollowerCard.js'

class FriendsBox extends Component {

  handleUserClick=(e,user)=>{
    const {hideFriends} = this.props;
    if(hideFriends){
      hideFriends()
    }
      return (
        <Profile
          {...this.props}
          user={this.props.user}
          />

      )

    
  }

  followerCards = () => {
    const {history} = this.props;

    if (this.props.followers){
       return this.props.followers.map((follower,idx) => {
        return (
          <div key={idx} className="card-rows">
            <FollowerCard
              handleUserClick={this.handleUserClick}
              history = {history}
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
