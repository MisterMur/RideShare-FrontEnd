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
        <div className = "container">
          <div class="row">
            <div class="col-3">
              <ProfileCard user={this.props.user}/>
            </div>


            <div class="col-9" id="profile-rides-list">
              <RideList rides={this.props.user.rides}/>
              <ForumsList forums={this.props.user.forums}/>
            </div>
          </div>
        </div>
      </Fragment>
    )
  }
}
export default Profile
