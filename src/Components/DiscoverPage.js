import React from "react";
import {connect} from 'react-redux'
import FriendsBox from './friends-box.js'


class DiscoverPage extends React.Component {

  render() {
    return (
      <div>
        <FriendsBox followers={this.props.users}/>


      </div>
    )
  }
}
function mapStateToProps(state) {

	const { user } = state;


  return {
    users:user.users[1],
    currentUser:user.currentUser
  }
}
export default connect(mapStateToProps) (DiscoverPage)
