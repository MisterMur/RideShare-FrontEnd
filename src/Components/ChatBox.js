import React, {Component, Fragment} from 'react'
import {connect} from 'react-redux'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faPaperPlane,faWindowClose} from '@fortawesome/free-solid-svg-icons'
 

import {postNewMessage,fetchUsers,fetchForumMessages,resetMessages} from '../Actions.js'


class ChatBox extends Component{

  constructor(props){

    super(props)

    this.state = {
      formInput: '',
      currentUser: this.props.currentUser,
      currentChat: this.props.currentChat,
      messages:[],
    }
  }

  componentDidMount(){
    this.props.fetchUsers();

    this.setState({messages:this.props.messages})



  }


  UNSAFE_componentWillReceiveProps(newProps){


      // nextProps.myProp has a different value than our current prop
      // so we can perform some calculations based on the new value
      this.setState({messages:newProps.messages})

  }

  renderMessages = (messages) => {
    //default message img
    // "https://ptetutorials.com/images/user-profile.png"

    if (this.props.users){

      return messages.map((m,idx)=>{
        console.log('messag user',this.props.users.find(user=> user.id === m.user_id))
        const messageUser=this.props.users.find(user=> user.id === m.user_id);
        let messageName =messageUser.name
        return (
            <div key={idx} className="incoming_msg">
              <img className="incoming_msg_img" src={messageUser.image_url} alt="user_image"/>
              <div className="received_msg">
                <div className="received_withd_msg">
                  <p>
                    {m.content}
                  </p>
                  <span className="time_date">  {messageName ? messageName : 'NotFound'}   |  {m.created_at}  </span></div>
                </div>
              </div>
          )
        })

    }




  }

  handleClose = () => {
    this.props.resetMessages()
    this.props.closeChat()
  }

  handleInput = (e) => {
    this.setState({formInput: e.target.value})
  }

  handleMessageSubmit = () => {
    if(this.state.formInput){
      this.props.postNewMessage(this.props.currentUser,this.state.formInput,this.state.currentChat)
      this.setState({formInput: ''})
    }


  }

  addNewMessage = (r) => {
    let copy = [...this.state.messages, r]
    this.setState({messages: copy,formInput:''})

  }

  render(){
    // debugger
    return (
      <Fragment>
      <div id="chatbox">
      <h3 className=" text-center">{this.props.currentChat? this.props.currentChat.topic:null} Messaging</h3>
      <div className="messaging">
            <div className="inbox_msg">
              
              <FontAwesomeIcon 
                className="close-chat" 
                icon={faWindowClose}
                style={{
                  height: '30px',
                  width: '30px',
                  justifyContent: 'flex-end'
                }}
                onClick={() => this.handleClose()}
              />
              <div className="mesgs">
                <div className="msg_history">
                {this.renderMessages(this.props.messages)}
                </div>
                <div className="type_msg">
                  <div className="input_msg_write">
                    <input type="text" className="write_msg" placeholder="Type a message" value={this.state.formInput} onChange={(e) => this.handleInput(e)}/>
                    <button className="msg_send_btn" type="button" disabled={!this.state.formInput} onClick={() => this.handleMessageSubmit()}>
                      <FontAwesomeIcon style={{height:'13px',width:'13px'}}icon={faPaperPlane}/>
                      </button>
                  </div>
                </div>
              </div>
            </div>
            <p className="text-center top_spac"> Design by <a target="_blank" rel="noopener noreferrer" href="http://brianjmurillo.com">Brian Murillo</a></p>
          </div></div>
      </Fragment>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  fetchUsers:()=>dispatch(fetchUsers()),
  fetchForumMessages:(forum)=>dispatch(fetchForumMessages(forum)),
  postNewMessage:(user,forum,message)=>dispatch(postNewMessage(user,forum,message)),
  resetMessages:()=>dispatch(resetMessages()),

})

function mapStateToProps(state){
  const {user}= state;
  const {forums} = state

  return {
    users:user.users,
    messages:forums.messages

  }
}

export default connect (mapStateToProps,mapDispatchToProps)(ChatBox)
