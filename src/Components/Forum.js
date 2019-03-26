import React,{Fragment} from "react";

class Forum extends React.Component {

  constructor(props){
    super(props)
  }

  render() {
    return (
      <Fragment>
          <tr>
            <td style={{width: ""}} scope="row">{this.props.idx}</td>
            <td scope="row" className="col">{this.props.forum.topic}</td>
          </tr>
      </Fragment>
    )
  }
}
export default Forum
