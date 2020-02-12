import React from "react"
import {Link} from 'react-router-dom'

const NotLoggedIn = () => {
  return (
  <div className="container">
    <div className='authBox'>
        <h1 className='headerText'>Must be Logged in To View</h1>
        <br/>
        <Link to='/login' id="authbutton" color='teal'>
          Click here to navigate to the login page
        </Link>
    </div>

  </div>
  )
}

export default NotLoggedIn
