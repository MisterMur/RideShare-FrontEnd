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
            <td class="col">{this.props.idx}</td>
            <td class="col-6">{this.props.forum.topic}</td>
          </tr>
        </Fragment>

      </div>
    )
  }
}
export default Forum
