import React from "react";
import {connect} from 'react-redux'
import FriendsBox from './friends-box.js'


class DiscoverPage extends React.Component {
  renderFriendsBox(){
    return (<>
      <FriendsBox followers={
        this.props.users.filter(u=>u.id!==this.props.currentUser.id)
      }/>
      </>)
  }
  render() {
    return (
      <div>
        {this.props.users?this.renderFriendsBox():<p>LOADING</p>}

      </div>
    )
  }
}
function mapStateToProps(state) {

	const { user } = state;


  return {
    users:user.users,
    currentUser:user.currentUser
  }
}
export default connect(mapStateToProps) (DiscoverPage)
