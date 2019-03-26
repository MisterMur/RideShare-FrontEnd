import React,{Fragment} from "react";
import ProfileCard from './ProfileCard'
import RideList from './RideList.js'
import ForumsList from './ForumsList.js'

class Profile extends React.Component {

  constructor(props){
    super(props)

  }

  handleEdit = (e) => {
    console.log(e)
  }



  render() {

    console.log("hit profile route", this.props)

    return (
      <Fragment>
        <div className = "container col-11">
          <div className="row justify-content-center">
            <div className="col-3 justify-content-center" id="profile-card-container">
              <ProfileCard user={this.props.user}/>
              <button id="edit-profile" onClick={this.handleEdit}> Edit Profile </button>
            </div>


            <div className="col" id="profile-rides-list">
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
