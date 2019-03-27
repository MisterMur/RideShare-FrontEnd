import React,{Fragment} from "react"


class Leaderboard extends React.Component {

  constructor(props){
    super(props)
  }
  getTotalMiles=(user)=>{
    let totalMiles=0
    if(user.rides){
      user.rides.map(r=>totalMiles+=r.distance)
      return totalMiles
    }
  }
  getTotalEarned=(user)=>{
    let totalEarned=0
    if(user.rides){
      user.rides.map(r=>totalEarned+=r.price)
      return totalEarned
    }
  }

  getTotalTimeDriving=(user)=>{
    let totalTime =0
    if(user.rides){
      user.rides.map(r=>{
        let rideTime = r.end_at-r.started_at
        totalTime+=rideTime
      })
      return totalTime
    }
  }
  getMileLeader=(users)=>{
    let newUsers=[...users]
    if(newUsers!==[]){
      newUsers.sort((usera,userb)=>{
        return this.getTotalMiles(usera)-this.getTotalMiles(userb)
      })
      console.log('mile leaders',users.reverse()[0])

      return newUsers.reverse()[0]
    }
  }

  getTimeLeader=(users)=>{
    if(users!==[]){
      return users.sort((usera,userb)=>{
        return this.getTimeLeader(usera)-this.getTimeLeader(userb)
      })
    }

  }
  getEarnerLeader=(users)=>{
    let newUsers=[...users]
    if(newUsers!==[]){
      newUsers.sort((usera,userb)=>{
        // console.log('user a',usera)
        // console.log('user b',userb)

        console.log('user a  earned',this.getTotalEarned(usera))
        console.log('user b earned',this.getTotalEarned(userb))

        return this.getTotalEarned(usera)-this.getTotalEarned(userb)
      })

      return newUsers.reverse()[0]
    }
  }
  renderUserTotals=()=>{
    if(this.props.leaders){
      return this.props.leaders.map((leader,idx)=>{

        return (
          <div key={idx}>

            <h1>User:{leader.name}</h1>
            <p>Miles: {this.getTotalMiles(leader)}</p>
            <p>Total Earned:{this.getTotalEarned(leader)}</p>
            <p>Total Time:{this.getTotalTimeDriving(leader)}</p>
          </div>
        )

      })
    }
  }
  renderLeaderBoard=()=>{
    // console.log('mile leader',this.getMileLeader(this.props.leaders))
    // console.log('Miles:',this.getTotalMiles())

    return (
      <Fragment>
        <div className="card-header">
          <h1>Overall Leaderboard</h1>
        </div>

        <ul className="list-group list-group-flush">Most Miles: {this.getMileLeader(this.props.leaders)?
          this.getMileLeader(this.props.leaders).name:null}</ul>
        <ul className="list-group list-group-flush">Most Earned:{this.getEarnerLeader(this.props.leaders)?
          this.getEarnerLeader(this.props.leaders).name:null}</ul>
        {/*
          <ul className="list-group list-group-flush">Most Earned:{this.getTimeLeader(this.props.leaders)?
          this.getTimeLeader(this.props.leaders).name:null}</p>
        */}
      </Fragment>
    )

  }

  render() {
    return (
      <div className="leaderboard-card" className="card">
        <ul className="list-group list-group-flush">

        {this.renderLeaderBoard()}
        {/*this.renderUserTotals()*/}
        </ul>

      </div>
    )
  }
}
export default Leaderboard
