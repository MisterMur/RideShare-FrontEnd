import React,{Fragment} from "react";

class Forum extends React.Component {

// id={this.props.forum.topic}
  render() {
    return (
      // <th scope="row">{this.props.idx}</th>
      <Fragment >


          <tr  onClick={(e,topic)=>this.props.handleForumClick(e,this.props.forum.topic)}>
            <td>  {this.props.forum.topic} </td>
          </tr>

      </Fragment>
    )
  }
}
export default Forum
