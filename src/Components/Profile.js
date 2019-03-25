import React from "react";

class Profile extends React.Component {

  constructor(props){
    super(props)
  }

  render() {
    console.log("hit profile route")
    return (
      <div>
        Profile!
      </div>
    )
  }
}
export default Profile
