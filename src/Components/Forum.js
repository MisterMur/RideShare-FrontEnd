import React,{Fragment} from "react";

class Forum extends React.Component {

  constructor(props){
    super(props)
  }

  render() {
    return (
      <div onClick={(e)=>this.props.handleForumClick(e)}>
          <tr>
            <td style={{width: ""}} scope="row">{this.props.idx}</td>
            <td scope="row" className="col">{this.props.forum.topic}</td>
          </tr>
      </div>
    )
  }
}
export default Forum
