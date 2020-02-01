import React from "react";
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {Button,Card} from 'react-bootstrap'

import '../App.css'
import {
  UserCard,
  ProductCard,
  FlippingCard,
  FlippingCardFront,
  FlippingCardBack,


} from 'react-ui-cards';


// var randImg = 'http://lorempixel.com/400/200/sports/'
// var randImg = 'https://sadanduseless.b-cdn.net/wp-content/uploads/2018/11/taxi-driver-calendar2.jpg'

class FollowerCard extends React.Component {
  getProfileLink=()=>{
    if(this.props.follower.id === this.props.currentUser.id){
      return '/profile'
    }else{
      return `/user/${this.props.follower.id}`
    }
  }
  renderFollowCard=()=>{
    // debugger
    return(
      <>
      <div id="follower-card" onClick={(e,user)=>this.props.handleUserClick(e,this.props.follower)} >
          <Link to={this.getProfileLink()}>

          <FlippingCard style={{height:'100%',width:'100%'}} >
            <FlippingCardFront>
              <div
              style={{
                width: '100%',
                height: '100%',
                backgroundSize: 'contain',
                backgroundPosition: 'center',
              }}>
              <UserCard
                float
                header='https://loremflickr.com/320/240/car'
                avatar='https://ptetutorials.com/images/user-profile.png'
                name={this.props.follower.name}
                positionName={this.props.follower.car}
                stats={[
                  {
                    name: 'Car',
                    value: this.props.follower.car
                  },

                ]}
                />

            </div>
            </FlippingCardFront>
            <FlippingCardBack>
              <div
              style={{
                width: '100%',
                height: '100%',
                backgroundSize: 'contain',
                backgroundPosition: 'center',
              }}>

              <ProductCard
                photos={[this.props.follower.image_url]}
                price={this.props.follower.ratingValue}
                productName={this.props.follower.name}
                description='Click to View Profile'
                rating={this.props.follower.ratingValue}

                />
            </div>
            </FlippingCardBack>
          </FlippingCard>

        </Link>

      </div>
      </>



    )
  }



  renderCard=()=>{
    return (
      <>
      <Card className="card mb-4 border-0" id="following-card">
        <Card.Img variant="top" className='followercardimg' src={this.props.follower.image_url} />
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
      <div className="card-container" >
        {this.renderFollowCard()}
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
export default connect (mapStateToProps)(FollowerCard)
