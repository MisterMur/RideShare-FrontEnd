import React, {Component} from 'react'
import Profile from './Profile.js'
import Fragment from 'react'
import FollowerCard from './FollowerCard.js'
class FriendsBox extends Component {
  handleUserClick=(e,user)=>{
    // debugger
    console.log('in handle user click ',user)
    return (
      // <Route path={`/profile/${user.id}`} exact render= {() => {
      //   return (
          <Profile
            user={user}
            rides={this.props.rides}
            forum={this.props.forums}
            allCompanies={this.props.allCompanies}
          />
        // )}
        // }/>
    )
  }
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
