import React, {Component, Fragment} from 'react'
import {connect} from 'react-redux'

import {postNewMessage,fetchUsers,fetchForumMessages} from '../Actions.js'


class ChatBox extends Component{

  constructor(props){

    super(props)

    this.state = {
      formInput: '',
      currentUser: this.props.currentUser,
      currentChat: this.props.currentChat,
      messages:this.props.currentChat.messages
    }
  }
  // componentWillReceiveProps(newProps){
  //
  //
  //   this.setState({
  //     currentUser:newProps.currentUser,
  //     currentChat:newProps.currentChat,
  //     messages:newProps.currentChat.messages
  //   })
  //
  // }
  // componentDidMount(){
  //   this.props.fetchForumMessages(this.state.currentChat)
  //
  //
  // }

  componentWillReceiveProps(newProps){
    this.props.fetchForumMessages(newProps.currentChat)

  }

  renderMessages = () => {
    if (this.state.messages){
      // console.log('render messages, thistate users', this.props.users)
      // console.log('render messages',this.state.messages)
      return this.state.messages.map(message => {
        // debugger
        let messageName =this.props.users.find(user => user.id === message.user_id).name
        let messageDate = message.created_at
        return (
          <div>
            <div className="incoming_msg">
              <div className="incoming_msg_img"> <img src="https://ptetutorials.com/images/user-profile.png" alt="sunil"/> </div>
              <div className="received_msg">
                <div className="received_withd_msg">
                  <p>
                    {message.content}
                  </p>
                  <span className="time_date">  {messageName ? messageName : 'NotFound'}   |  {message.created_at}  </span></div>
                </div>
              </div>
            </div>
          )
        })

    }




  }

  handleClose = () => {
    this.props.closeChat()
  }

  handleInput = (e) => {
    this.setState({formInput: e.target.value})
  }

  handleMessageSubmit = () => {
    // debugger
    // console.log('submitting message')
    // fetch('https://ride-share-api.herokuapp.com/api/v1/messages',
    //   {
    //     method:"POST",
    //     headers: {
    //       'Content-Type': 'application/json',
    //       'Accepts': 'application/json'
    //     },
    //     body: JSON.stringify({
    //       forum_id: this.state.currentChat.id,
    //       user_id: this.props.currentUser.id,
    //       content: this.state.formInput
    //     })
    //   }
    // )
    // .then(r => r.json())
    this.props.postNewMessage(this.props.currentUser,this.state.formInput,this.state.currentChat)
    //.then(r => this.props.fetchForumMessages(this.state.currentChat)).then(console.log)
  }

  addNewMessage = (r) => {
    let copy = [...this.state.messages, r]
    this.setState({messages: copy})
    this.setState({formInput: ''})
  }

  render(){
    // debugger
    return (
      <Fragment>
      <div class="container">
      <h3 class=" text-center">Messaging</h3>
      <div class="messaging">
            <div class="inbox_msg">
              <div >
              <button onClick={() => this.handleClose()}>Close Chat</button>
                <div class="headind_srch">
                </div>
              </div>
              <div class="mesgs">
                <div class="msg_history">
                {this.renderMessages()}
                </div>
                <div class="type_msg">
                  <div class="input_msg_write">
                    <input type="text" class="write_msg" placeholder="Type a message" value={this.state.formInput} onChange={(e) => this.handleInput(e)}/>
                    <button class="msg_send_btn" type="button" onClick={() => this.handleMessageSubmit()}><i class="fa fa-paper-plane-o" aria-hidden="true"></i></button>
                  </div>
                </div>
              </div>
            </div>
            <p class="text-center top_spac"> Design by <a target="_blank" href="#">Brian Murillo</a></p>
          </div></div>
      </Fragment>
    )
  }
}
const mapDispatchToProps = dispatch => ({
  fetchUsers:()=>dispatch(fetchUsers()),
  fetchForumMessages:(forum)=>dispatch(fetchForumMessages(forum)),
  postNewMessage:(user,forum,message)=>dispatch(postNewMessage(user,forum,message))


})
function mapStateToProps(state){
  const {user}= state;
  // debugger
  const {forums} = state
  console.log('chatbox mapstateprops forum',forums.messages[0])

  return {
    users:user.users[2],
    messages:forums.messages
  //  messages:forum.messages

  }
}

export default connect (mapStateToProps,mapDispatchToProps)(ChatBox)
