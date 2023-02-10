import React from "react";
import { connect } from 'react-redux';

import styled from 'styled-components'
import Dropdown from 'react-bootstrap/Dropdown';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Favorite from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';

import {fetchUsers,fetchRides} from '../Actions';

import Leaderboard from './Leaderboard.js'
import RideList from './RideList'

import {devicesMax } from '.././Globals/Breakpoints'



class Rides extends React.Component {


  state = {
      allRides: this.props.rides,
      filteredRides: this.props.rides,
      users:[],
      textInput: '',
      friendFilter:false,
      sortBy:'Recent',
      filterByCompany:'All Companies'
    }

  componentDidMount(){
    this.props.fetchRides();
    this.props.fetchUsers();
  }

  UNSAFE_componentWillReceiveProps(){
    this.setState({
      users: this.props.users,
      allRides: this.props.rides,
      filteredRides: this.props.rides
    })
  }

  returnDropdown = () => {
    const {sortBy,filterByCompany} = this.state;
    return (
      <div className="">
        <form>
          <SearchRideInput
            type="text"
            onChange={this.handleSearch}
            value={this.state.textInput}
            placeholder="Search by location"
          />
          {/* <div class='max-w-md mx-auto'>
            <div class="relative flex items-center w-full h-12 rounded-lg focus-within:shadow-lg bg-white overflow-hidden">
              <div class="grid place-items-center h-full w-12 text-gray-300">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input
                class="peer h-full w-full outline-none text-sm text-gray-700 pr-2"
                type="text"
                id="search"
                placeholder="Search something.." /> 
            </div>
          </div> */}
          
      
          <SearchOptions>
            <FilterDropdownGroup radioBtn={this.props.currentUser}>
              <Dropdown>
                <Dropdown.Toggle style={{width: this.props.currentUser? '200px':'100%'}} variant="primary" id="dropdown-sort-rides">
                  Sort By {sortBy}
                </Dropdown.Toggle>
                <Dropdown.Menu name="sort-rides"  >
                  <Dropdown.Item onClick={ ()=>this.handleSortSubmit('Recent')} value="Recent">Most Recent</Dropdown.Item>
                  <Dropdown.Item onClick={()=>this.handleSortSubmit('Price')} value="Price">Price</Dropdown.Item>
                  <Dropdown.Item onClick={()=>this.handleSortSubmit('Distance')} value="Distance">Distance</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
              <Dropdown>
                <Dropdown.Toggle style={{width: this.props.currentUser? '200px':'100%'}}variant="primary" id="dropdown-filter-company">
                  Filter By {filterByCompany}
                </Dropdown.Toggle>
                <Dropdown.Menu name="filter-company"  >
                  <Dropdown.Item onClick={ ()=>this.handleFilterSubmit('All Companies')} value="All">All Companies</Dropdown.Item>
                  <Dropdown.Item onClick={()=>this.handleFilterSubmit('Uber')} value="Uber">Uber</Dropdown.Item>
                  <Dropdown.Item onClick={()=>this.handleFilterSubmit('Lyft')} value="Lyft">Lyft</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </FilterDropdownGroup>
            {this.props.currentUser? (
            <RadioBtnSearchGroup>
              <FormGroup row>
                <FormControlLabel
                  control={<Checkbox
                      icon={<FavoriteBorder />}
                      checkedIcon={<Favorite />}
                      checked={this.state.friendFilter}
                      onChange={this.handleFriendFilter}
                      name="checkedA" />}
                  id="rides-radio-btn"
                  label="Friends"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={!this.state.friendFilter}
                      onChange={this.handleChangeBack}
                      name="NoFilter"
                      color="primary"
                    />
                  }
                  id="rides-radio-btn"
                  label="All"
                />

              </FormGroup>
                
            </RadioBtnSearchGroup>
            ): null}


          </SearchOptions>
       

      </form>
      </div>
    )
  }

  handleChangeBack = () => {
    this.setState({filteredRides: this.state.allRides,friendFilter:false})
  };

  handleFriendFilter = () => {
    const {currentUser} = this.props;
    const { allRides} = this.state;

    if(currentUser){

        let myFriends = currentUser.followers.map(follower => follower.id)
        let filtered =[]
        allRides.map((ride) =>{
          return myFriends.map((friend)=>ride.user_id === friend ? filtered.push(ride) : null)
        })
        this.setState({filteredRides:filtered, friendFilter:true})

    }
  };

  handleSearch = (e) => {
    this.setState({textInput: e.target.value})
    let filtered = this.state.allRides.filter(ride =>
       ride.start_location.toLowerCase().includes(e.target.value.toLowerCase())
    || ride.end_location.toLowerCase().includes(e.target.value.toLowerCase()) )
    this.setState({filteredRides: filtered})
  }

  handleSortSubmit = (sortBy) => {
    console.log('in handle sort')
    if(sortBy !== this.state.sortBy){
      this.setState({sortBy})
      if (sortBy === "Distance"){
        let filtered = this.state.filteredRides.sort((a, b) => (a.distance < b.distance)? 1 : -1)
        this.setState({filteredRides: filtered})
      }
      else if (sortBy === "Price"){
        let filtered = this.state.filteredRides.sort((a, b) => (a.price < b.price)? 1 : -1)
        this.setState({filteredRides: filtered})
      }
      else if (sortBy === "Recent"){
        let filtered = this.state.filteredRides.sort((a, b) => (a.end_at < b.end_at)? 1 : -1)
        this.setState({filteredRides: filtered})
      }
    }
  };

  handleFilterSubmit = (filterByCompany) => {
    if(filterByCompany !== this.state.filterByCompany){
      this.setState({filterByCompany})
      if (filterByCompany === "All Companies"){
        this.setState({filteredRides: this.state.allRides})
      }
      else if (filterByCompany === "Uber"){
        let filtered = this.state.allRides.filter(ride => ride.company.name === filterByCompany)
        this.setState({filteredRides: filtered})
      }
      else if (filterByCompany === "Lyft"){
        let filtered = this.state.allRides.filter(ride => ride.company.name === filterByCompany)
        this.setState({filteredRides: filtered})
      }
    }
  };

  render() {

    return (
      <>

      <div className = "container col-11" id="rides-page">
        {this.props.users?

        <Leaderboard
          leaders={this.props.users}
          allUsers={this.props.users}
          user={this.props.currentUser}
          forum={this.props.forums}
          rides={this.props.rides}
          allCompanies={this.props.allCompanies}
          />
        :     <h4>LOADING</h4>}

        <RideList rides={this.state.filteredRides} displayDropdown={this.returnDropdown}/>
        
      </div>
      </>
    )
  }
}
const mapDispatchToProps = dispatch => ({

	fetchRides:() => dispatch(fetchRides()),
	fetchUsers:()=>dispatch(fetchUsers())
})
function mapStateToProps(state) {
	const { user } = state;
  const { rides} = state.rides;
  const {forums}= state.forums;
  return {
    allCompanies:user.allCompanies,
    rides: rides,
    forums:user.forums,
    allForums: forums[0],
    users:user.users,
    currentUser:user.currentUser
  }
}
export default connect(mapStateToProps,mapDispatchToProps) (Rides)

const FilterDropdownGroup = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: ${props => props.radioBtn ? "space-evenly" : "space-between"};

  @media only screen and ${devicesMax.mobileL} {
    flex-direction: ${props => props.radioBtn ? "column" : "row"};

  }
`;

const RadioBtnSearchGroup = styled.div`
  display: flex;
  flex-direction: row;
  width:100%;
  justify-content: flex-end;

  @media only screen and ${devicesMax.mobileL} {
    flex-direction: row;
    justify-content: flex-end;

  }
`;

const SearchOptions = styled.div`
  display: flex;
  flex-direction: row;
  margin: 15px 0;

  @media only screen and ${devicesMax.mobileL} {
    flex-direction: row;
  }
`;

const SearchRideInput = styled.input`
  width: 100%;
  padding: 0.5em 0;
  margin-top: 0.5em;
  align-items: center;
  color: black;
  font-weight:200px;
  background-color: #ecf0f1;
  border-radius: 100px;
  border-color: #007bff;
  box-sizing: border-box;
  display: flex;
  max-height: none;
  min-height: 48px;
  padding-left: 17px;
  padding-right: 17px;
  position: relative;
`;
