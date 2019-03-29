import React, {Component, Fragment} from 'react'

class ChatBox extends Component{

  constructor(props){
    super(props)
    this.state = {
      formInput: '',
      currentUser: this.props.currentUser,
      currentChat: this.props.currentChat,
      messages: this.props.currentChat.messages
    }
  }

  renderMessages = () => {
    return this.state.messages.map(message => {

      return (
        <div>
        <div class="incoming_msg">
          <div class="incoming_msg_img"> <img src="https://ptetutorials.com/images/user-profile.png" alt="sunil"/> </div>
          <div class="received_msg">
            <div class="received_withd_msg">
              <p>
              {message.content}
              </p>
              <span class="time_date">  {this.props.users.find(user => user.id == message.user_id).name}   |  {message.created_at}  </span></div>
          </div>
        </div>
        </div>
      )
    })

  }

  handleClose = () => {
    this.props.closeChat()
  }

  handleInput = (e) => {
    this.setState({formInput: e.target.value})
  }

  handleMessageSubmit = () => {
    // debugger
    fetch('http://localhost:3000/api/v1/messages',
      {method:
        "POST",
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        },
        body: JSON.stringify({
          forum_id: this.state.currentChat.id,
          user_id: this.props.currentUser.id,
          content: this.state.formInput
        })
      }
    )
    .then(r => r.json())
    .then(r => this.addNewMessage(r))
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
            <p class="text-center top_spac"> Design by <a target="_blank" href="#">Jordan Ginor , Zev Spilman , Brian Murillo</a></p>
          </div></div>
      </Fragment>
    )
  }
}

export default ChatBox

// <div class="container">
// <h3 class=" text-center">Messaging</h3>
// <div class="messaging">
//       <div class="inbox_msg">
//         <div class="inbox_people">
//           <div class="headind_srch">
//           </div>
//         </div>
//         <div class="mesgs">
//           <div class="msg_history">
//             <div class="incoming_msg">
//               <div class="incoming_msg_img"> <img src="https://ptetutorials.com/images/user-profile.png" alt="sunil"/> </div>
//               <div class="received_msg">
//                 <div class="received_withd_msg">
//                   <p>Test which is a new approach to have all
//                     solutions</p>
//                   <span class="time_date"> 11:01 AM    |    June 9</span></div>
//               </div>
//             </div>
//           </div>
//           <div class="type_msg">
//             <div class="input_msg_write">
//               <input type="text" class="write_msg" placeholder="Type a message" />
//               <button class="msg_send_btn" type="button"><i class="fa fa-paper-plane-o" aria-hidden="true"></i></button>
//             </div>
//           </div>
//         </div>
//       </div>
//       <p class="text-center top_spac"> Design by <a target="_blank" href="#">Sunil Rajput</a></p>
//     </div></div>
