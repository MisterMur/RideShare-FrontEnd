import UUID from 'uuid';
import {FORUMSURL, RIDEURL,FRIENDSHIPURL ,ADD_USER,USERURL ,LOGIN_USER,ADD_FOLLOWER,REMOVE_FOLLOWER,LOGINURL,LOGOUT_USER,SET_ALL_RIDES,SET_ALL_FURUMS} from './Constants';
// import AnimalAdapter from './apis/AnimalAdapter';

export function addUser(name, email) {
  return {
    type: ADD_USER,
    payload: { id: UUID(), name, email }
  }
}

export function logoutUser()  {
  return {

    type: LOGOUT_USER
  }
}
export function setAllRides(src) {
  console.log('setting all rides ',src)
  return {
    type: SET_ALL_RIDES,
    payload: src
  }
}
export function setAllForums(src){
  return {
    type: SET_ALL_FURUMS,
    payload:src
  }
}



export function setLoggedInUser(src) {
  console.log('setting logged in user',src)
  return {
    type: LOGIN_USER,
    payload: src,
  }
}
export function AddFollower(follower){
  return{
    type:ADD_FOLLOWER,
    payload:{follower}
  }
}

export function RemoveFollower(follower){
  return{
    type:REMOVE_FOLLOWER,
    payload:{follower}
  }
}

export function fetchUsers() {
  // does that seem cool? ehhhh
  return function(dispatch) {
    dispatch({ type: 'FETCH_USERS' });
    fetch(USERURL)
    .then(res=>res.json())
    .then(users=>{
        dispatch(setLoggedInUser(users=>users.name==="Brian"))
    })
  }
}
export function fetchRides(){
  return function (dispatch){

    fetch(RIDEURL)
    .then(res=>res.json())
    .then(rides=>{
      dispatch(setAllRides(rides))

    })
  }
}
export function fetchForums(){
  return function (dispatch){
    fetch(FORUMSURL)
    .then(res=>res.json())
    .then(forums=>{dispatch(setAllForums(forums))})
  }
}

export function postNewFriendship(currentUser,follower){
  return dispatch=>{
    return fetch( FRIENDSHIPURL ,{
      method:"POST",
      headers:{
        'Content-Type':'application/json',
        'Accepts':'application/json'
      },
      body:JSON.stringify({
        follower_id:currentUser.id,
        followee_id:follower.id
      })
    }).then(console.log)
    .then(handleErrors)
    .then(function(){
      dispatch(fetchUsers())
    })
  }
}


export function createUser (login_data) {
  return dispatch =>{

    fetch(USERURL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accepts": "application/json",
      },
      body: JSON.stringify(login_data)
    })
    .then(res => res.json())
    .then((response) => {

      if (response.error){
        alert(response.error)
      } else {
        // debugger
        // localStorage.setItem("token", response.jwt)

        this.props.setCurrentUser(response.user)
        localStorage.setItem('jwt', response.jwt)
        dispatch (setLoggedInUser(response.user))
        this.props.history.push(`/users/${response.user.id}`)
      }
    })
  }
}
export function userLoginFetch  (user,callback) {
  return dispatch =>{
    console.log('in userlogin fetch')
    fetch(LOGINURL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accepts": "application/json",
      },
      body: JSON.stringify(user)
    })
    .then(res => res.json())
    .then((response) => {
      if (response.errors) {
        alert(response.errors)
        console.log('response gotf error',response.error)
      } else {
        // we need to login at the top level where we are holding our current user!
        // setState in App to currentuse
        // debugger
        // debugger
        // this.props.setCurrentUser(response.user)
        // debugger
        localStorage.setItem('jwt', response.jwt)
        dispatch(setLoggedInUser(response.user))
        // this.props.history.push(`/profile/${response.user.id}`)

        // return <><Link to={`/profile/${this.props.currentUser.id}`}>Profile</Link></>


      }
    })

  }


}

export function getProfileFetch() {
  return dispatch => {
    console.log('in get profile fetch')
    const jwt = localStorage.getItem('jwt')

    if (jwt){
      fetch("http://localhost:3001/api/v1/auto_login", {
        headers: {
          "Authorization": jwt
        }
      })
      .then(res => res.json())
      .then((response) => {
        if (response.errors) {
          alert(response.errors)
          localStorage.removeItem('jwt')
        } else {
          console.log('setting user',response)
          dispatch(setLoggedInUser(response))
        }
      })
    }

  }
}


export function setLogout ()  {
  // we need to reset state and remove the current user and remove the token
  return function(dispatch) {
    dispatch({ type: LOGOUT_USER });

    localStorage.removeItem("jwt")

    dispatch(logoutUser())
    // this.props.history.push("/login")
  }
}

function handleErrors(response) {
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response;
}
