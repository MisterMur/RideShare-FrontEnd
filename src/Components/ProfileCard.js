import React, {Component} from 'react'

const ProfileCard = (props) => {
  console.log(props);

  let handleCompnaies = () => {
    //make these logos
    return props.user.companies? props.user.companies.map(company => `${company.name} `) : "nope"
  }

  let handleHover = (e) => {
    console.log(e.target)
  }

  return(
    <div>
      <div className="profile-card" className="card" >
        <img src="https://cdn-images-1.medium.com/max/1200/1*kfM2czy7JbViNrmS4kcmFQ.jpeg" alt="No Profile Image" className="card-img-top"/>
        <div className="card-header">
          <b>{props.user.name} </b>
        </div>
        <ul className="list-group list-group-flush">
          <li onMouseOver={handleHover} className="list-group-item">Car: {props.user.car} </li>
          <li onMouseOver={handleHover} className="list-group-item">Experience: {props.user.experience} </li>
          <li onMouseOver={handleHover} className="list-group-item">Rating: {props.user.rating} </li>
          <li onMouseOver={handleHover} className="list-group-item">Companies: {handleCompnaies()} </li>
          <li onMouseOver={handleHover} className="list-group-item">Base Locaion: {props.user.location}</li>
        </ul>
      </div>

    </div>
  )
}


export default ProfileCard
// <p>Companies: {props.user.companies.map(company => company.name)} </p>
