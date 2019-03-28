import React,{Fragment} from "react"
import { Link, Route } from 'react-router-dom'
import Profile from './Profile.js'
import Leader from './Leader.js'


class Leaderboard extends React.Component {

  constructor(props){
    super(props)
    this.state={
      mostMiles:'',
      mostRating:'',
      mostEarned:'',
      mostTime:'',
      mostExperience:''
    }
  }
  componentWillReceiveProps(props){
    let rating = this.getRatingLeader(props.leaders)
    let miles = this.getMileLeader(props.leaders)
    let earner = this.getEarnerLeader(props.leaders)
    let experience= this.getExperienceLeader(props.leaders)
    this.setState({
      mostMiles:miles,
      mostRating:rating,
      mostEarned:earner,
      mostExperience:experience
    })

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
    console.log('get total earnd',user)
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
  getRatingLeader=(users)=>{
    let newUsers=[...users]
    if(newUsers!==[]){
      newUsers.sort((usera,userb)=>{
        return usera.rating-userb.rating
      })
    }
    return newUsers.reverse()[0]
  }
  getExperienceLeader=(users)=>{
    let newUsers=[...users]
    if(newUsers!==[]){
      newUsers.sort((usera,userb)=>{
        return usera.experience-userb.experience
      })
    }
    // this.setState({mostExperience:newUsers.reverse()[0]})
    return newUsers.reverse()[0]
  }

  getTimeLeader=(users)=>{
    if(users!==[]){
      return users.sort((usera,userb)=>{
        return this.getTimeLeader(usera)-this.getTimeLeader(userb)
      })

    }

  }
  getEarnerLeader=(users)=>{
    // debugger
    let newUsers=[...users]
    if(newUsers!==[]){
      newUsers.sort((usera,userb)=>{
        // console.log('user a',usera)
        // console.log('user b',userb)

        console.log('user a  earned',this.getTotalEarned(usera))
        console.log('user b earned',this.getTotalEarned(userb))

        return this.getTotalEarned(usera)-this.getTotalEarned(userb)
      })
      // this.setState({mostEarner:newUsers.reverse()[0]})

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
  handleUserClick=(e,user)=>{
    // debugger
    console.log('in handle user click ',user)
    return (
      // <Route path={`/profile/${user.id}`} exact render= {() => {
      //   return (
          <Profile
            user={user}
            rides={this.props.rides}
            forum={this.props.forums}
            allCompanies={this.props.allCompanies}
          />
        // )}
        // }/>
    )
  }

  renderLeaderBoard=()=>{
    // console.log('mile leader',this.getMileLeader(this.props.leaders))
    // console.log('Miles:',this.getTotalMiles())
    if(this.props.leaders){

      return (
        <Fragment>
          <div className="container">
          <div className="row">
          <div className="col-5">
          <div className="list-group" >
            <Leader
              title={'Highest Rating: '}
              design={'list-group-item google-plus'}
              icon={'icon glyphicon glyphicon-star'}
              getUser={this.getRatingLeader(this.props.leaders)}
              handleClick={this.handleUserClick}
            />
            <Leader
              title={'Longest Duration: '}
              design={'list-group-item facebook-like'}
              icon={'icon glyphicon glyphicon-hourglass'}
              getUser={this.getRatingLeader(this.props.leaders)}
              handleClick={this.handleUserClick}
            />
            <Leader
              title={'Most Miles: '}
              design={'list-group-item twitter'}
              icon={'icon glyphicon glyphicon-road'}
              getUser={this.getMileLeader(this.props.leaders)}
              handleClick={this.handleUserClick}
            />
            <Leader
              title={'Highest Earner: '}
              design={'list-group-item vimeo'}
              icon={'icon glyphicon glyphicon-usd'}
              getUser={this.getEarnerLeader(this.props.leaders)}
              handleClick={this.handleUserClick}
            />
            <Leader
              title={'Most Experience: '}
              design={'list-group-item tumblr'}
              icon={'icon glyphicon glyphicon-hourglass'}
              getUser={this.getRatingLeader(this.props.leaders)}
              handleClick={this.handleUserClick}
            />
          </div>
          </div>
          </div>
          </div>
        </Fragment>
      )
    }

  }

  render() {
    return (
      <div>
        {this.renderLeaderBoard()}
        {/*this.renderUserTotals()*/}
      </div>
    )
  }
}
export default Leaderboard
