import React, {Component} from 'react'
import Profile from './Profile.js'

import FollowerCard from './FollowerCard.js'

class FriendsBox extends Component {

  handleUserClick=(e,user)=>{
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
export default FriendsBox
