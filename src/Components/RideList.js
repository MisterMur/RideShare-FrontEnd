import React from "react"
import Ride from "./Ride.js"

const RideList = (props) => {

  const renderRide=()=>{
    if(props.rides.length>0){
      
      return props.rides.map((ride,key)=>
        <Ride
          key={key}
          idx={key+1}
          ride={ride}
        />)
    }
    else{
      return(
        <>
        <tr>
          <td colSpan='7'>No completed rides yet</td>
        </tr></>
      )
    }
  }
  return (
    <div className='ridestable'>
    {props.displayDropdown? props.displayDropdown(): ''}
    <table className="table table-striped">
      <thead className="thead-dark">
        <tr>
          <th scope="col">Num</th>
          <th scope="col">Distance</th>
          <th scope="col">Started At</th>
          <th scope="col">Ended At</th>
          <th scope="col">Price</th>
          <th scope="col">Starting Location</th>
          <th scope="col">Ending Location</th>
        </tr>
      </thead>
      <tbody>
        {props.displayAddRide ? props.displayAddRide():
          null
        }
        {renderRide()}
      </tbody>
    </table>

  </div>
  )
}

export default RideList
