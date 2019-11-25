import React,{Fragment} from "react"
import  Route from 'react-router-dom'
import Profile from './Profile.js'
import Leader from './Leader.js'

import { connect } from 'react-redux';
import {fetchUsers,fetchRides} from '../Actions';



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
    let totalMiles=0;
    if(user.rides){
      user.rides.map(r=>totalMiles+=r.distance)
      // console.log('in get total miles user:',user)

      return totalMiles
    }
  }
  getTotalEarned=(user)=>{
    let totalEarned=0
    // console.log('get total earnd',user)
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
      // console.log('mile leaders',newUsers.reverse()[0])

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
    // console.log('experience leaders', newUsers)
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
    let newUsers=[...users]
    if(newUsers!==[]){
      newUsers.sort((usera,userb)=>{
        // console.log('user a',usera)
        // console.log('user b',userb)

        // console.log('user a  earned',this.getTotalEarned(usera))
        // console.log('user b earned',this.getTotalEarned(userb))

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
    if (!user===this.props.currentUser){
      return (
        <Profile
          user={user}
          rides={this.props.rides}
          forum={this.props.forums}
          isCurrentUserProfile={false}
          currentUser={this.props.currentUser}
          allCompanies={this.props.allCompanies}
          />
      )
    }
    else{
      return (
        <Profile
          user={user}
          rides={this.props.rides}
          forum={this.props.forums}
          isCurrentUserProfile={true}
          currentUser={this.props.currentUser}
          allCompanies={this.props.allCompanies}
          />
      )

    }
  }
  renderLeaderBoard=()=>{
    console.log("in render leaderboard")
    // console.log('mile leader',this.getMileLeader(this.props.leaders))
    console.log('Miles:',this.getTotalMiles(this.props.leaders))
    if(this.props.leaders){

      return (
        <Fragment>
        <div class="container">
        <div class="row">
        <div class="col-md-9">
        <div class="list-group" >
        <Leader
        title={'Highest Rating: '}
        design={'list-group-item google-plus'}
        icon={'icon glyphicon glyphicon-star'}
        getUser={this.getRatingLeader(this.props.leaders)}
        handleClick={this.handleUserClick}
        superlative={'rating'}
        />

      {/*  <Leader
        title={'Longest Duration: '}
        design={'list-group-item facebook-like'}
        icon={'icon glyphicon glyphicon-hourglass'}
        getUser={this.getRatingLeader(this.props.leaders)}
        handleClick={this.handleUserClick}
        />*/}
        <Leader
        title={'Most Miles: '}
        design={'list-group-item twitter'}
        icon={'icon glyphicon glyphicon-road'}
        getUser={this.getMileLeader(this.props.leaders)}
        handleClick={this.handleUserClick}
        getStat={this.getTotalMiles}
        />
        <Leader
        title={'Highest Earner: '}
        design={'list-group-item youtube'}
        icon={'icon glyphicon glyphicon-usd'}
        getUser={this.getEarnerLeader(this.props.leaders)}
        handleClick={this.handleUserClick}
        superlative={'money'}
        getStat={this.getTotalEarned}
        />
        <Leader
        title={'Most Experience: '}
        design={'list-group-item tumblr'}
        icon={'icon glyphicon glyphicon-hourglass'}
        getUser={this.getExperienceLeader(this.props.leaders)}
        handleClick={this.handleUserClick}
        superlative={'experience'}
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
const mapDispatchToProps = dispatch => ({

	fetchRides:() => dispatch(fetchRides()),
	fetchUsers:()=>dispatch(fetchUsers())
})
function mapStateToProps(state) {
  // maps the state from the store to the props
	// debugger
  // debugger
	const { user } = state;
  const { rides} = state.rides;
	console.log('mapping state in rides',user)
  // debugger
  return {
    allCompanies:user.allCompanies,
    rides: rides[0],
    users:user.users[2],
    currentUser:user.currentUser
  }
}
export default connect(mapStateToProps,mapDispatchToProps) (Leaderboard)
