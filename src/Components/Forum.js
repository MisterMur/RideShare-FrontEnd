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
            <th scope="row">{this.props.idx}</th>
            <td>{this.props.forum.topic}</td>
          </tr>
        </Fragment>

      </div>
    )
  }
}
export default Forum
