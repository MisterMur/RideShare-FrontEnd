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

  componentDidMount(){

    this.setState({messages:this.props.messages})



  }


  componentWillReceiveProps(newProps){


      // nextProps.myProp has a different value than our current prop
      // so we can perform some calculations based on the new value
      this.setState({messages:newProps.messages})
      console.log('recieving props messages',newProps.messages)

  }

  renderMessages = (messages) => {
    if (this.props.users){
      console.log('rendering messages')
      // console.log('inrender messages', this.props.messages)
      // console.log('render messages, thistate users', this.props.users)
      // console.log('render messages',this.state.messages)
      return messages.map(m=>{
      
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

    this.props.postNewMessage(this.props.currentUser,this.state.formInput,this.state.currentChat)
    this.setState({formInput: ''})

  }

  addNewMessage = (r) => {
    let copy = [...this.state.messages, r]
    this.setState({messages: copy,formInput:''})

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
  resetMessages:()=>dispatch(resetMessages()),

})

function mapStateToProps(state){
  const {user}= state;
  const {forums} = state

  return {
    users:user.users[2],
    messages:forums.messages

  }
}

export default connect (mapStateToProps,mapDispatchToProps)(ChatBox)
