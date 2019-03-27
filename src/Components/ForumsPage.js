import React, {Fragment} from "react";
import ForumsList from './ForumsList.js'
import RideList from './RideList'

class Forums extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      allRides: this.props.rides,
      filteredRides: this.props.rides,
      textInput: ''
    }
  }

  componentWillReceiveProps(){
    this.setState({
      allRides: this.props.rides,
      filteredRides: this.props.rides

    })
  }

  handleForumClick=(e)=>{
    console.log('in handleforum click',e)
  }

  handleFilterChange = () => {
  }

  returnDropdown = () => {
    return (
      <div className="">
      <form action="/action_page.php">
      <select name="cars"
      onChange={this.handleSortSubmit}
      >
        <option value="recent">Most Recent</option>
        <option value="price">Price</option>
        <option value="distance">Distance</option>
      </select>
      <select name="cars"
      onChange={this.handleFilterSubmit}
      >
        <option value="all">All</option>
        <option value="uber">Uber</option>
        <option value="lyft">Lyft</option>
        ////////////////ADD ANOTHER COMPANY IF WE WANT
      </select>
        <input
         type="text"
         onChange={this.handleSearch}
         value={this.state.textInput}
         placeHolder="Search by location"
         />
         <form action="/action_page.php">
          <input type="radio" name="gender" value="friends" onChange={(e) =>this.handleFriendFilter(e)}/> Friends
          <input type="radio" name="gender" value="all" onChange={this.handleChangeBack}/> All
          <input type="submit" value="Submit"/>
        </form>
      </form>
      </div>
    )
  }

  handleChangeBack = () => {
    this.setState({filteredRides: this.state.allRides})
  }
//this function is super javascripty//
  handleFriendFilter = (e) => {
    e.preventDefault()
    let myFriends = this.props.user.followers.map(follower => follower.id)
    let filtered =[]
    this.state.allRides.map((ride) =>
      {
        for (let i = 0; i < myFriends.length; i ++){
          if (ride.user_id == myFriends[i] ){
          filtered.push(ride)
          }
        }
     }
   )
   this.setState({filteredRides: filtered})
  }

  handleSearch = (e) => {
    this.setState({textInput: e.target.value})
    let filtered = this.state.allRides.filter(ride => ride.end_location.includes(e.target.value) || ride.start_location.includes(e.target.value))
    this.setState({filteredRides: filtered})
  }

  handleSortSubmit = (e) => {
    e.preventDefault()
    if (e.target.value == "distance"){
      let filtered = this.state.filteredRides.sort((a, b) => (a.distance < b.distance)? 1 : -1)
      this.setState({filteredRides: filtered})
    }
    else if (e.target.value == "price"){
      let filtered = this.state.filteredRides.sort((a, b) => (a.price < b.price)? 1 : -1)
      this.setState({filteredRides: filtered})
    }
    //DID NOT TEST THIS YET
    else if (e.target.value == "recent"){
      let filtered = this.state.filteredRides.sort((a, b) => (a.end_at > b.end_at)? 1 : -1)
      this.setState({filteredRides: filtered})
    }
    ////////
  }

  handleFilterSubmit = (e) => {
    e.preventDefault()

    if (e.target.value == "all"){
      this.setState({filteredRides: this.state.allRides})
    }

    else if (e.target.value == "uber"){
      let filtered = this.state.allRides.filter(ride => ride.company_id === 1)
      this.setState({filteredRides: filtered})
    }

    else if (e.target.value == "lyft"){
      let filtered = this.state.allRides.filter(ride => ride.company_id === 2)
      this.setState({filteredRides: filtered})
    }

  }

  render() {
    console.log("hit forums route")
    console.log('forums props',this.props)
    return (
      <Fragment>
      <div>
        <ForumsList
          forums={this.props.forum}
          handleForumClick={this.handleForumClick}
        /></div>
        <div className="col" id="profile-rides-list">
        <RideList rides={this.state.filteredRides} displayDropdown={this.returnDropdown}/>
        </div>
      </Fragment>
    )
  }
}
export default Forums
