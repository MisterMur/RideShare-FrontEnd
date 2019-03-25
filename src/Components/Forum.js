import React,{Fragment} from "react";

class Forum extends React.Component {

  constructor(props){
    super(props)
  }

  render() {
    return (
      <div>
        <Fragment>
          <tr>
            <td >{this.props.idx}</td>
            <td >{this.props.forum.topic}</td>
          </tr>
        </Fragment>

      </div>
    )
  }
}
export default Forum
