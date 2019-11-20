import React from "react";
import {Link,Route,Router} from 'react-router-dom'
import Profile from './Profile.js'
import {Button,Card} from 'react-bootstrap'


var randImg = 'http://lorempixel.com/400/200/sports/'

class FollowerCard extends React.Component {
  constructor(props){
    super(props)
  }

  // return (
  //   <div class="card follower-container" >
  //     <img class="card-img-top" src={randImg} alt="Card image cap"/>
  //     <div class="card-body">
  //       <h5 class="card-title">Name: {this.props.follower.name}</h5>
  //       <p class="card-text">I drive a: {this.props.follower.car}</p>
  //
  //       <div onClick={(e,user)=>this.props.handleUserClick(e,this.props.follower)}>
  //         <Link to={`/profile/${this.props.follower.id}`}>
  //           <button
  //             type="button"
  //             class="btn btn-primary"
  //             >
  //             Check out my profile!</button>
  //         </Link>
  //
  //       </div>
  //
  //     </div>
  //   </div>
  //
  //
  // )


  renderCard=()=>{
    return (
      <>
      <Card style={{ width: '18rem' }}>
        <Card.Img variant="top" src={randImg} />
        <Card.Body>
          <Card.Title>Name: {this.props.follower.name}</Card.Title>
          <Card.Text>
            I drive a: {this.props.follower.car}
          </Card.Text>
          <div onClick={(e,user)=>this.props.handleUserClick(e,this.props.follower)}>
            <Link to={`/profile/${this.props.follower.id}`}>
              <Button
                type="button"
                class="btn btn-primary"
                >
                Check out my profile!</Button>
            </Link>
          </div>
        </Card.Body>
      </Card>
      </>
    )
  }



  render() {
    return (
      <div class="card follower-container" >
        {this.renderCard()}
      </div>

    )

  }
}
export default FollowerCard
