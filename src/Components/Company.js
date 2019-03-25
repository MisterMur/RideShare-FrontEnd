import React from "react";

class Company extends React.Component {

  constructor(props){
    super(props)
  }

  render() {
    console.log('company Props:', this.props)
    return (
      <div>
        <h1>{this.props.company.name}</h1>
      </div>
    )
  }
}
export default Company
