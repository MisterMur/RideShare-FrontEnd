import React from "react";
import ForumsList from './ForumsList.js'
import ChatBox from './ChatBox'
import { connect } from 'react-redux';
import {fetchForums,fetchUsers}from '../Actions.js'


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

    this.props.fetchForums();
    this.props.fetchUsers();
  }

  handleForumClick = (e) => {
    this.setState({clickedForum: e.target.id})
    this.setState({openChat: true})
  }

  closeChat = () => {
    this.setState({openChat: false})
  }
  renderPage = ()=>{
    return (
      <>
      <div>
      {!this.state.openChat ? <ForumsList handleForumClick={this.handleForumClick} forums={this.props.allForums}/> : <ChatBox
      currentUser={this.props.currentUser} closeChat={this.closeChat} users={this.props.users} currentChat={this.props.allForums.find(forum => forum.topic === this.state.clickedForum)}/>}
    </div></>

    )
  }


  render(){
    return (
      <>
      {this.props.currentUser ? this.renderPage() : <p>Not Logged In </p>}
      </>
    )
  }

}
const mapDispatchToProps = dispatch => ({
	fetchUsers:()=>dispatch(fetchUsers()),
  fetchForums:()=>dispatch(fetchForums())

})

function mapStateToProps(state) {
  // maps the state from the store to the props
	// debugger
	const { user } = state;
  const {forums}=state.forums;
  // debugger

	console.log('mapping state in forums',user)
  return {
    allCompanies:user.allCompanies,
    rides:user.rides,
    forums:user.forums,
    allForums:forums[0],
    users:user.users[2],
    currentUser:user.currentUser
  }
}

export default connect(mapStateToProps,mapDispatchToProps) (ForumsPage)
