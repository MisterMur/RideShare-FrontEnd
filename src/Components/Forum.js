import React,{Fragment} from "react";

class Forum extends React.Component {

  constructor(props){
    super(props)
  }

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
