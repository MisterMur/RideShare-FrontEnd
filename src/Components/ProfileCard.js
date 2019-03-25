import React, {Component} from 'react'

const ProfileCard = (props) => {
  console.log(props);

  let handleCompnaies = () => {
    //make these logos
    return props.user.companies? props.user.companies.map(company => `${company.name} `) : "nope"
  }

  return(
    <div>
      <div className="profile-card" class="card" style={{width: "18rem", paddingBottom: "1px"}} >
        <h5 class="card-title">{props.user.name}</h5>
        <ul class="list-group list-group-flush">
          <li class="list-group-item">Name: {props.user.name} </li>
          <li class="list-group-item">Car: {props.user.car} </li>
          <li class="list-group-item">Experience: {props.user.experience} </li>
          <li class="list-group-item">Rating: {props.user.rating} </li>
          <li class="list-group-item">Companies: {handleCompnaies()} </li>
          <li class="list-group-item">Base Locaion: {props.user.location}</li>
          </ul>
      </div>

    </div>
  )
}


export default ProfileCard
// <p>Companies: {props.user.companies.map(company => company.name)} </p>
