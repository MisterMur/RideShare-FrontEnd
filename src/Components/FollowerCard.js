import React from "react";
import Profile from './Profile.js';
import {Link} from 'react-router-dom'
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

  render() {
    return (
      <div class="card follower-container" >
        <img class="card-img-top" src={randImg} alt="Card image cap"/>
        <div class="card-body">
          <h5 class="card-title">Name: {this.props.follower.name}</h5>
          <p class="card-text">I drive a: {this.props.follower.car}</p>

          <div onClick={(e,)=>this.props.handleUserClick(e,this.props.follower)}>
            <Link to={`/profile/${this.props.follower.id}`}>
              <button
                type="button"
                class="btn btn-primary"
                id={this.props.follower.id}
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
