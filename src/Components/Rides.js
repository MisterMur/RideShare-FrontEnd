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
        />
      </div>
    )
  }
}
export default Rides
