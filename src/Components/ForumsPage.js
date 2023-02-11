//import react
import React from "react";
import { connect } from 'react-redux';

// import libraries

//import components
import ForumsList from './ForumsList.js'
import ChatBox from './ChatBox.js'
import NotLoggedIn from './NotLoggedIn.js'


//import actions
import {fetchForums,fetchUsers,fetchForumMessages}from '../Actions.js'



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

  handleForumClick = (e,topic) => {
    let forum = this.props.forums.find(f => f.topic === topic)
    
    if(forum){
      this.props.fetchForumMessages(forum)
    }

    this.setState({clickedForum: topic,openChat:true})
  }

  closeChat = () => {
    this.setState({openChat: false})
  }
  renderPage = ()=>{
    return (
      <>
      <div id="forum-list">
        <h3>Click on a Forum To Chat</h3>
      {!this.state.openChat ? <ForumsList handleForumClick={this.handleForumClick} forums={this.props.allForums}/> :
       <ChatBox
      currentUser={this.props.currentUser}
      closeChat={this.closeChat}
      currentChat={this.props.forums.find(forum => forum.topic === this.state.clickedForum)}
      />
  }
    </div>
    </>

    )
  }


  render(){
    return (
      <div className="container">
        {this.props.currentUser ? this.renderPage() : <NotLoggedIn/>}
      </div>

    )
  }

}
const mapDispatchToProps = dispatch => ({
	fetchUsers:()=>dispatch(fetchUsers()),
  fetchForums:()=>dispatch(fetchForums()),
  fetchForumMessages:(f)=>dispatch(fetchForumMessages(f)),

})

function mapStateToProps(state) {
	const { user } = state;
  const {forums}=state.forums;


  return {
    allCompanies:user.allCompanies,
    rides:user.rides,
    forums:forums[0],
    allForums:forums[0],
    users:user.users,
    currentUser:user.currentUser
  }
}

export default connect(mapStateToProps,mapDispatchToProps) (ForumsPage)
