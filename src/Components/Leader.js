import React from "react";
import {Link} from 'react-router-dom'

class Leader extends React.Component {

  render() {
    // console.log(`/profile/${this.props.getUser.id}`)
    if(this.props.getUser){
      // debugger
      return (
        <div onClick={(e,)=>this.props.handleClick(e,this.props.getUser)}
        name={this.props.superlative}>

          <Link to={`/user/${this.props.getUser.id}`}>

          <div className={this.props.design}>
            <h3 className="pull-right">
            <i className={this.props.icon}> </i>
            </h3>
            <h4 className="list-group-item-heading count">{this.props.title}

              {(this.props.getUser.name)}

              </h4>

              <p className="list-group-item-text">
                {this.props.getStat?this.props.getStat(this.props.getUser):null}
                {this.props.superlative==='rating'?this.props.getUser.rating:null}
                {this.props.superlative==='experience'?this.props.getUser.experience:null}</p>
                </div>
                </Link>

            </div>
            )
    }else{
      return (<h4>YOU ARE NOT LOGGED IN</h4>)
    }
  }
}
export default Leader
