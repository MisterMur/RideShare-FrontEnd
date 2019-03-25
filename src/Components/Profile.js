import React from "react";
import ProfileCard from './ProfileCard'

class Profile extends React.Component {

  constructor(props){
    super(props)
  }

  render() {

    console.log("hit profile route", this.props)

    return (
     <ProfileCard user={this.props.user}/>
    )
  }
}
export default Profile
