import React,{Fragment} from "react";

class Forum extends React.Component {


  render() {
    return (
      <Fragment>


          <tr onClick={(e)=>this.props.handleForumClick(e)}>
            <th scope="row">{this.props.idx}</th>
            <td id={this.props.forum.topic}>  {this.props.forum.topic} </td>
          </tr>

      </Fragment>
    )
  }
}
export default Forum
