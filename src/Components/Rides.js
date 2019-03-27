import React from "react";
import Leaderboard from './Leaderboard.js'
class Rides extends React.Component {

  constructor(props){
    super(props)
  }

  render() {
    console.log("hit rides route")
    return (
      <div>
        <Leaderboard
          leaders={this.props.allUsers}
          allUsers={this.props.users}
          user={this.props.currentUser}
          forum={this.props.forums}
          rides={this.props.rides}
          allCompanies={this.props.allCompanies}
        />
      </div>
    )
  }
}
export default Rides
