import React from "react";
import {Link,Route,Router} from 'react-router-dom'
import Profile from './Profile.js'



var randImg = 'http://lorempixel.com/400/200/sports/'

class FollowerCard extends React.Component {
  constructor(props){
    super(props)
  }
  // handleUserClick=(e)=>{
  //   // debugger
  //   console.log('in handle user click ',this.props.follower)
  //   return (
  //     // <Route path={`/profile/${user.id}`} exact render= {() => {
  //         <Profile
  //           user={this.props.follower}
  //         />
  //   )
  // }
  // <Link to={`/profile/${this.props.follower.id}`}>
  // </Link>




  // <Route path={`/profile/${this.props.follower.id}`} user={this.props.follower} />
  // <button
  //   type="button"
  //   class="btn btn-primary"
  //   >
  //   Check out my profile!</button>
  render() {
    return (
      <div class="card follower-container" >
        <img class="card-img-top" src={randImg} alt="Card image cap"/>
        <div class="card-body">
          <h5 class="card-title">Name: {this.props.follower.name}</h5>
          <p class="card-text">I drive a: {this.props.follower.car}</p>

          <div onClick={(e,user)=>this.props.handleUserClick(e,this.props.follower)}>
            <Link to={`/profile/${this.props.follower.id}`}>
              <button
                type="button"
                class="btn btn-primary"
                >
                Check out my profile!</button>
            </Link>

          </div>

        </div>
      </div>


    )
  }
}
export default FollowerCard
