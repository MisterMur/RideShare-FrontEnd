import React, {Component} from 'react'
import Profile from './Profile.js'
import {Link,Route,Router} from 'react-router-dom'

import Fragment from 'react'
import FollowerCard from './FollowerCard.js'

class FriendsBox extends Component {

  handleUserClick=(e,user)=>{
    // debugger
    console.log('in handle user click ',user)
    return (
              <Profile
                {...this.props}
                user={this.props.user}
              />


    )
  }//end of handle user click


  followerCards = () => {

    // href={`https://rideshare-frontend.netlify.com/profile/${follower.id}`}
    if (this.props.followers){
       return this.props.followers.map((follower,key) => {
         // debugger
        return (

          <FollowerCard
            handleUserClick={this.handleUserClick}
            key={key}
            idx={key+1}
            follower={follower}
            />
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
