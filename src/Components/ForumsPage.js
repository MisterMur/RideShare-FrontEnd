import React from "react";
import ForumsList from './ForumsList.js'

class Forums extends React.Component {

  constructor(props){
    super(props)
  }
  handleForumClick=(e)=>{
    console.log('in handleforum click',e)

  }
  render() {
    console.log("hit forums route")
    console.log('forums props',this.props)

    return (
      <div>
        <ForumsList
          forums={this.props.forum}
          handleForumClick={this.handleForumClick}
        />
      </div>
    )
  }
}
export default Forums
