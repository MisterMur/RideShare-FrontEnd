import React from "react";
import ForumsList from './ForumsList.js'
import ChatBox from './ChatBox'
import { connect } from 'react-redux';


class ForumsPage extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      allForums: null,
      clickedForum: null,
      openChat: false
    }
  }

  componentDidMount(){
    fetch('https://ride-share-api.herokuapp.com/api/v1/forums')
    .then(r => r.json())
    .then(r => {
      this.setState({allForums: r})
    })
  }

  handleForumClick = (e) => {
    this.setState({clickedForum: e.target.id})
    this.setState({openChat: true})
  }

  closeChat = () => {
    this.setState({openChat: false})
  }




  render(){
    return (
      <>
      <div>
      {!this.state.openChat ? <ForumsList handleForumClick={this.handleForumClick} forums={this.state.allForums}/> : <ChatBox
      currentUser={this.props.currentUser} closeChat={this.closeChat} users={this.props.users}currentChat={this.state.allForums.find(forum => forum.topic === this.state.clickedForum)}/>}
    </div></>
    )
  }

}
function mapStateToProps(state) {
  // maps the state from the store to the props
	// debugger
	const { user } = state

	console.log('mapping state in forums',user)
  return {
    allCompanies:user.allCompanies,
    rides:user.rides,
    forums:user.forums,
    allForums:state.forums,
    users:user.users,
    currentUser:user.currentUser
  }
}
export default connect(mapStateToProps) (ForumsPage)
