import React,{Fragment} from "react";


class Ride extends React.Component {

  constructor(props){
    super(props)
  }

  render() {
    // console.log('Ride render props: ' ,this.props)
    return (
      <Fragment>
        <tr>
          <th scope="row">{this.props.idx}</th>
          <td>{this.props.ride.distance}</td>
          <td>{this.props.ride.started_at}</td>
          <td>{this.props.ride.end_at}</td>
          <td>{this.props.ride.price}</td>
          <td>{this.props.ride.start_location}</td>
          <td>{this.props.ride.end_location}</td>
        </tr>
      </Fragment>
    )
  }
}
export default Ride
