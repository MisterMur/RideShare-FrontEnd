import React from "react";

class Header extends React.Component {

  constructor(props){
    super(props)
  }

  render() {
    return (
      <header className="header">
        <div class="container col-11" >
          <b>RideShare</b>
        </div>
      </header>
    )
  }
}
export default Header
