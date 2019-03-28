import React, {Component} from 'react'
var randImg = 'http://lorempixel.com/400/200/sports/'

class FriendsBox extends Component {

  followerCards = () => {

    if (this.props.followers){
       return this.props.followers.map(follower => {
        return (
          <div class="card" style={{width: "18rem"}}>
          <img class="card-img-top" src={randImg} alt="Card image cap"/>
          <div class="card-body">
            <h5 class="card-title">Name: {follower.name}</h5>
            <p class="card-text">I drive a: {follower.car}</p>
            <a href={`http://localhost:3001/profile/${follower.id}`} class="btn btn-primary">Check out my profile!</a>
          </div>
        </div>)
      })
    }
  }

  render(){
    return(
      <div className="follower-container" style={{width: "20rem"}}>
      <h2 className="some-h2">Check out your followers, fam!</h2>
        {this.followerCards()}
      </div>
    )
  }

}
export default FriendsBox
