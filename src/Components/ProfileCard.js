import React, {Component} from 'react'

const ProfileCard = (props) => {
  console.log(props);

  let handleCompnaies = () => {
    //make these logos
    return props.user.companies? props.user.companies.map(company => `${company.name} `) : "nope"
  }

  return(
    <div>
      <div className="profile-card">
      <p>Name: {props.user.name} </p>
      <p>Car: {props.user.car} </p>
      <p>Experience: {props.user.experience} </p>
      <p>Rating: {props.user.rating} </p>
      <p>Companies: {handleCompnaies()} </p>
      <p>Base Locaion: {props.user.location}</p>
      </div>
      Profile!
    </div>
  )
}


export default ProfileCard
// <p>Companies: {props.user.companies.map(company => company.name)} </p>
