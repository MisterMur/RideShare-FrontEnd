import React from 'react'

const ProfileCard = (props) => {

  let handleCompnaies = () => {
    
    //make these logos
    return props.companies? props.companies.map(company => `${company.name} `) : "nope"
  }

  let handleHover = (e) => {
  }

  return(

      <div id="profile-card"  >
        <div className="profile-img">
          <img style={{width: '300px'}} src={props.user.image_url} alt="No Profile" className="card-img-top"/>
          </div>
        <div className='profile-info'>
          <div className="card-header">
            <b>{props.user.name} </b>
          </div>
          <ul className="list-group list-group-flush">
            <li onMouseOver={handleHover} className="list-group-item">Car: {props.user.car} </li>
            <li onMouseOver={handleHover} className="list-group-item">Experience: {props.user.experience} </li>
            <li onMouseOver={handleHover} className="list-group-item">Rating: {props.user.rating} </li>
            <li onMouseOver={handleHover} className="list-group-item">Companies: {handleCompnaies()} </li>
            <li onMouseOver={handleHover} className="list-group-item">Base Location: {props.user.location}</li>
          </ul>
        </div>
      </div>


  )
}


export default ProfileCard
