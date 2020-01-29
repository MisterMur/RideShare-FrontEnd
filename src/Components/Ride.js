import React,{Fragment} from "react";


class Ride extends React.Component {
   formatDate=(date)=> {
     // debugger
    let year = date.slice(0,4);
    let month = date.slice(5,7);
    let day = date.slice(8,10);
    let hour = date.slice(11,13)
    let min = date.slice(14,16)
    let ampm =''
    parseInt(hour) < 12 ? ampm ='AM' : ampm = 'PM'

    if(hour >= 12){
      hour = hour-12;
    }
    if(hour<10){
      hour = parseInt(hour);
    }

    if(hour==0){
      hour = 12
    }

    let retDate = `${month}/${day}/${year}@${hour}:${min}${ampm}`
    return retDate;
    // var ampm = hours >= 12 ? 'pm' : 'am';
    // hours = hours % 12;
    // hours = hours ? hours : 12; // the hour '0' should be '12'
    // minutes = minutes < 10 ? '0'+minutes : minutes;
    // var strTime = hours + ':' + minutes + ' ' + ampm;
    // return date.getMonth()+1 + "/" + date.getDate() + "/" + date.getFullYear() + "  " + strTime;
}

// var d = new Date();
// var e = formatDate(d);

  render() {

    return (
      <Fragment>
        <tr>
          <th scope="row">{this.props.idx}</th>
          <td>{this.props.ride.distance}</td>
          <td>{this.formatDate(this.props.ride.started_at)}</td>
          <td>{this.formatDate(this.props.ride.end_at)}</td>
          <td>{this.props.ride.price}</td>
          <td>{this.props.ride.start_location}</td>
          <td>{this.props.ride.end_location}</td>
        </tr>
      </Fragment>
    )
  }
}
export default Ride
