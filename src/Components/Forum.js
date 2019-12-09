import React from "react";

class Forum extends React.Component {

  constructor(props){
    super(props)
  }

  render() {
    return (
      <div onClick={(e)=>this.props.handleForumClick(e)}>
          <tr>
            <th scope="row">{this.props.idx}</th>
            <td id={this.props.forum.topic}>  {this.props.forum.topic} </td>
          </tr>
      </div>
    )
  }
}
export default Forum


// render() {
//   return (
//     <div onClick={(e)=>this.props.handleForumClick(e)}>
//         <tr>
//           <th scope="row">{this.props.idx}</th>
//
//           <td style={{width: ""}} scope="row">{this.props.idx}</td>
//           <td id={this.props.forum.topic} scope="row" className="col">{this.props.forum.topic}</td>
//         </tr>
//     </div>
//   )
// }
