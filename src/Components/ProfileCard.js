import React, {Component} from 'react'

const ProfileCard = (props) => {
  // console.log(props);

  let handleCompnaies = () => {
    // debugger
    //make these logos
    // return props.user.companies? props.user.companies.map(company => `${company.name} `) : "nope"
    return props.companies? props.companies.map(company => `${company.name} `) : "nope"
  }

  let handleHover = (e) => {
    // console.log(e.target)
  }

  console.log("rendering profile card")
  // "https://cdn-images-1.medium.com/max/1200/1*kfM2czy7JbViNrmS4kcmFQ.jpeg"
  // <img src="https://i.pinimg.com/originals/11/b0/bd/11b0bdd4216a2ff4918f93439860d471.jpg" alt="No Profile Image" className="card-img-top"/>
  return(

      <div className="profile-card"  >
        <img src={props.user.image_url} alt="No Profile Image" className="card-img-top"/>

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


  )
}


export default ProfileCard
// <p>Companies: {props.user.companies.map(company => company.name)} </p>
