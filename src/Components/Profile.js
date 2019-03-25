import React,{Fragment} from "react";
import ProfileCard from './ProfileCard'
import RideList from './RideList.js'
import ForumsList from './ForumsList.js'

class Profile extends React.Component {

  constructor(props){
    super(props)

  }


  render() {

    console.log("hit profile route", this.props)

    return (
      <Fragment>
        <ProfileCard user={this.props.user}/>
        <RideList rides={this.props.user.rides}/>
        <ForumsList forums={this.props.user.forums}/>
      </Fragment>
    )
  }
}
export default Profile
