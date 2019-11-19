import React, {Component} from 'react'
var randImg = 'http://lorempixel.com/400/200/sports/'

class FriendsBox extends Component {

  followerCards = () => {

    if (this.props.followers){
       return this.props.followers.map(follower => {
        return (
          <div class="card follower-container" >
          <img class="card-img-top" src={randImg} alt="Card image cap"/>
          <div class="card-body">
            <h5 class="card-title">Name: {follower.name}</h5>
            <p class="card-text">I drive a: {follower.car}</p>
            <a href={`https://rideshare-frontend.netlify.com/profile/${follower.id}`} class="btn btn-primary">Check out my profile!</a>
          </div>
        </div>)
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
