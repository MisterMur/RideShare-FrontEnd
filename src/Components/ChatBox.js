import React, {Component, Fragment} from 'react'
import {connect} from 'react-redux'

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
  componentDidMount(){
    // this.props.fetchForumMessages(this.state.currentChat)
    // this.props.fetchForumMessages(this.state.currentChat)
    this.setState({messages:this.props.messages})



  }


  componentWillReceiveProps(newProps){
    // if(newProps.messages !== this.props.messages) {

      // nextProps.myProp has a different value than our current prop
      // so we can perform some calculations based on the new value
      this.setState({messages:newProps.messages})
      console.log('recieving props messages',newProps.messages)
    // }
  }

  renderMessages = (messages) => {
    if (this.props.users){
      console.log('rendering messages')
      // console.log('inrender messages', this.props.messages)
      // console.log('render messages, thistate users', this.props.users)
      // console.log('render messages',this.state.messages)
      return messages.map(m=>{
        // debugger
        // console.log('message',m)
        let messageName =this.props.users.find(user => user.id === m.user_id).name
        let messageDate = m.created_at
        return (
          <div>
            <div className="incoming_msg">
              <div className="incoming_msg_img"> <img src="https://ptetutorials.com/images/user-profile.png" alt="sunil"/> </div>
              <div className="received_msg">
                <div className="received_withd_msg">
                  <p>
                    {m.content}
                  </p>
                  <span className="time_date">  {messageName ? messageName : 'NotFound'}   |  {m.created_at}  </span></div>
                </div>
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
    this.setState({formInput: ''})
    // let copy = [...this.state.messages, this.state.formInput]
    // this.setState({messages: copy})
    // console.log('after post new message,props.messages',this.props.messages)
    // console.log('after post new message,state.messages',this.state.messages)


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
      <div className="container">
      <h3 className=" text-center">{this.props.currentChat? this.props.currentChat.topic:null} Messaging</h3>
      <div className="messaging">
            <div className="inbox_msg">
              <div >
              <button onClick={() => this.handleClose()}>Close Chat</button>
                <div class="headind_srch">
                </div>
              </div>
              <div className="mesgs">
                <div className="msg_history">
                {this.renderMessages(this.props.messages)}
                </div>
                <div className="type_msg">
                  <div className="input_msg_write">
                    <input type="text" class="write_msg" placeholder="Type a message" value={this.state.formInput} onChange={(e) => this.handleInput(e)}/>
                    <button className="msg_send_btn" type="button" onClick={() => this.handleMessageSubmit()}><i class="fa fa-paper-plane-o" aria-hidden="true"></i></button>
                  </div>
                </div>
              </div>
            </div>
            <p className="text-center top_spac"> Design by <a target="_blank" href="#">Brian Murillo</a></p>
          </div></div>
      </Fragment>
    )
  }
}
const mapDispatchToProps = dispatch => ({
  fetchUsers:()=>dispatch(fetchUsers()),
  fetchForumMessages:(forum)=>dispatch(fetchForumMessages(forum)),
  postNewMessage:(user,forum,message)=>dispatch(postNewMessage(user,forum,message)),
  resetMessages:()=>dispatch(resetMessages())


})
function mapStateToProps(state){
  const {user}= state;
  // debugger
  const {forums} = state
  // console.log('chatbox mapstateprops forum',forums.messages[0])
  // debugger
  return {
    users:user.users[2],
    messages:forums.messages
  //  messages:forum.messages

  }
}

export default connect (mapStateToProps,mapDispatchToProps)(ChatBox)
