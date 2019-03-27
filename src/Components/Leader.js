import React from "react";
import {Link,Route} from 'react-router-dom'

class Leader extends React.Component {

  constructor(props){
    super(props)
  }

  render() {
    // console.log(`/profile/${this.props.getUser.id}`)
    return (
      <div onClick={(e,)=>this.props.handleClick(e,this.props.getUser)}
      name="rating">
      {this.props.getUser?
      <Link to={`/profile/${this.props.getUser.id}`}>

        <div className={this.props.design}>
            <h3 class="pull-right">
                <i className={this.props.icon}> </i>
            </h3>
            <h4 class="list-group-item-heading count">{this.props.title}
            {this.props.getUser?
              (this.props.getUser.name):null}

            </h4>
            <p class="list-group-item-text"> {this.props.getUser?
              (this.props.getUser.rating):null}</p>
        </div>
        </Link>
        :null}
      </div>
    )
  }
}
export default Leader
