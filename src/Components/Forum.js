import React,{Fragment} from "react";

class Forum extends React.Component {

// id={this.props.forum.topic}
  render() {
    return (
      <Fragment >


          <tr  onClick={(e,topic)=>this.props.handleForumClick(e,this.props.forum.topic)}>
            <th scope="row">{this.props.idx}</th>
            <td>  {this.props.forum.topic} </td>
          </tr>

      </Fragment>
    )
  }
}
export default Forum
