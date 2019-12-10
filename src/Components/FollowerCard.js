import React from "react";
import {Link} from 'react-router-dom'
import Profile from './Profile.js'
import {Button,Card} from 'react-bootstrap'


// var randImg = 'http://lorempixel.com/400/200/sports/'
var randImg = 'https://sadanduseless.b-cdn.net/wp-content/uploads/2018/11/taxi-driver-calendar2.jpg'

class FollowerCard extends React.Component {
  constructor(props){
    super(props)
  }


  renderCard=()=>{
    return (
      <>
      <Card style={{ width: '18rem' }}>
        <Card.Img variant="top" src={this.props.follower.image_url} />
        <Card.Body>
          <Card.Title>Name: {this.props.follower.name}</Card.Title>
          <Card.Text>
            I drive a: {this.props.follower.car}
          </Card.Text>
          <div onClick={(e,user)=>this.props.handleUserClick(e,this.props.follower)}>
            <Link to={`/user/${this.props.follower.id}`}>
              <Button
                type="button"
                className="btn btn-primary"
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
      <div className="card follower-container" >
        {this.renderCard()}
      </div>

    )

  }
}
export default FollowerCard
