import React from "react";
import {connect} from 'react-redux'
import FriendsBox from './friends-box.js'
import {fetchUsers} from '../Actions.js'


class DiscoverPage extends React.Component {
  componentDidMount(){
    this.props.fetchUsers()
  }
  renderFriendsBox(){
    //if logged in dont render the logged in user to the DiscoverPage
    // so you cant see yourself on page
    //if not logged in render all the users
    if(this.props.currentUser){
      return (<>
        <FriendsBox followers={
            this.props.users.filter(u=>u.id!==this.props.currentUser.id)
          }/>
          </>)

    }else{
      return (<>
        <FriendsBox followers={
            this.props.users
          }/>
          </>)


    }
  }
  render() {
    return (
      <div className="container">

        <div id="discoverpage">
          {this.props.users?this.renderFriendsBox():
            <div className='authBox'>
              <h3>Loading..</h3>
            </div>
            }
        </div>

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

const mapDispatchToProps=dispatch=>({
  fetchUsers:()=>dispatch(fetchUsers()),

})


export default connect(mapStateToProps,mapDispatchToProps) (DiscoverPage)
