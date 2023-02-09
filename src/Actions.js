import UUID from 'uuid';
import {ADD_FORUM_MESSAGE,SET_ALL_FOLLOWING,ADD_FOLLOWING,ADD_RIDE,
  REMOVE_FOLLOWING,FETCH_ALL_FRIENDSHIPS,AUTOLOGINURL,MESSAGEURL,
  SET_USER,FORUMSURL,COMPANYURL, RIDEURL,FRIENDSHIPURL ,
  FETCH_ALL_FORUM_MESSAGES,FETCH_CURRENT_USER,FETCH_ALL_COMPANIES,
  ADD_USER,USERURL ,LOGIN_USER,LOGINURL,
  LOGOUT_USER,FETCH_ALL_RIDES,FETCH_ALL_FORUMS,FETCH_ALL_USERS,
  RESET_MESSAGES,ADD_FRIENDSHIP,REMOVE_FRIENDSHIP,
} from './Constants';
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
export function addRide(src){
  return {
    type:ADD_RIDE,
    payload:src
  }
}
export function setAllRides(src) {
  return {
    type: FETCH_ALL_RIDES,
    payload: src
  }
}
export function setAllForums(src){
  return {
    type: FETCH_ALL_FORUMS,
    payload:src
  }
}
export function setAllUsers(src){
  return {
    type: FETCH_ALL_USERS,
    payload:src
  }
}
export function setUser(src){
  return {
    type: SET_USER,
    payload:src
  }
}
export function setAllCompanies(src){
  return {
    type: FETCH_ALL_COMPANIES,
    payload:src
  }
}
export function setAllForumMessages(src){
  return {
    type:FETCH_ALL_FORUM_MESSAGES,
    payload:src
  }
}
export function setAllFriendships(src){
  return {
    type:FETCH_ALL_FRIENDSHIPS,
    payload:src
  }
}
export function addFriendship(src){
  return {
    type:ADD_FRIENDSHIP,
    payload:src
  }
}
export function removeFriendship(src){
  return {
    type:REMOVE_FRIENDSHIP,
    payload:src
  }
}



export function setLoggedInUser(src) {
  return {
    type: LOGIN_USER,
    payload: src,
  }
}
export function setAllFollowing(src){
  return{
    type:SET_ALL_FOLLOWING,
    payload:src
  }
}
export function addForumMessage(src){
  return{
    type:ADD_FORUM_MESSAGE,
    payload:src
  }
}

export function addFollowing(src){
  return{
    type:ADD_FOLLOWING,
    payload:src
  }
}
export function resetMessages(src){
  return{
    type:RESET_MESSAGES,
    payload:src
  }
}

export function removeFollowing(src){
  return{
    type:REMOVE_FOLLOWING,
    payload:src
  }
}

export function patchEditProfile  ( data)  {

  return function (dispatch){

    let id = this.state.currentUser.id
 
    fetch(`${USERURL}/${id}`,{
      headers:{
        'accepts':'application/json',
        'content-type':'application/json'
      },
      method:'PATCH',
      body:JSON.stringify({
        name:data.nameValue,
        experience:data.experienceValue,
        car:data.carValue,
        companies:data.companiesValue,
        location:data.locationValue,
        rating:data.ratingValue,
      })
    }).then(handleErrors)
    .then(res => {
      dispatch(fetchUsers())

    })
  }
}

export function fetchCurrentUser(user) {
  return function(dispatch) {
    dispatch({ type: FETCH_CURRENT_USER });
    fetch(`${USERURL}/${user.id}`)
    .then(res=>res.json())
    .then(current=>{
        dispatch(setLoggedInUser(current))

    })
  }
}

export function fetchUsers() {
  return function(dispatch) {
    dispatch({ type: FETCH_ALL_USERS });
    fetch(USERURL).then(handleErrors)
    .then(res=>res.json())
    .then(users=>{
        dispatch(setAllUsers(users))

    })
  }
}
export function fetchUser(user){
  return function (dispatch){
    fetch(USERURL+user.id)
    .then(res=>res.json())
    .then(resUser=>{
      dispatch(setUser(resUser))

    })
  }
}
export function fetchCompanies() {
  return function(dispatch) {
    dispatch({ type: FETCH_ALL_COMPANIES });
    fetch(COMPANYURL)
    .then(res=>res.json())
    .then(companies=>{
        dispatch(setAllCompanies(companies))

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
export function fetchForumMessages(forum){
  return function (dispatch){
    fetch(FORUMSURL+forum.id)
    .then(res=>res.json())
    .then(f=>{dispatch(setAllForumMessages(f.messages))})
  }
}
export function fetchForums(){
  return function (dispatch){
    fetch(FORUMSURL)
    .then(res=>res.json())
    .then(forums=>{dispatch(setAllForums(forums))})
  }
}
export function fetchFollowing(user){
  return function (dispatch){
    fetch(USERURL+user.id+'/following')
    .then(res=>res.json())
    .then(following=>{dispatch(setAllFollowing(following))})
  }
}
export function fetchFriendships(){
  return function (dispatch){
    fetch(FRIENDSHIPURL)
    .then(res=>res.json())
    .then(friendships=>{dispatch(setAllFriendships(friendships))})
  }
}
export function postNewRide(ride){
  // debugger
  return dispatch=>{
    return fetch(RIDEURL,{
      method:'POST',
      headers:{
        'Content-Type':'application/json',
        "Accepts":'application/json'
      },
      body:JSON.stringify({
        ride
      })
    })
    .then(handleErrors).then(res=>res.json())
    .then(r=>dispatch(addRide(r)))
  }
}
export function postNewMessage(currentUser,content,forum){
  return dispatch=>{
    return fetch ( MESSAGEURL,{
      method:"POST",
      headers:{
        'Content-Type':'application/json',
        'Accepts':'application/json'
      },
      body:JSON.stringify({
        user_id: currentUser.id,
        forum_id: forum.id,
        content: content
      })
    }
  ).then(handleErrors).then(res=>res.json())
  .then(mes=>dispatch(addForumMessage(mes)))
  }
}

export function postNewFriendship(follower,followed){
  return dispatch=>{
    const friendship = {
      follower_id:follower.id,
      followed_id:followed.id
    }

    return fetch( FRIENDSHIPURL ,{
      method:"POST",
      headers:{
        'Content-Type':'application/json',
        'Accepts':'application/json'
      },
      body:JSON.stringify(friendship)
    })
    .then(handleErrors)
    .then(function(){
      dispatch(addFollowing(followed))
      dispatch(addFriendship(friendship))
    })
  }
}
export function findFriendship(currentUser,followed){
  return fetch(FRIENDSHIPURL)
  .then(res=>res.json())
  .then(friendships=>{
    friendships.find(
      f=>{
        return f.follower_id === currentUser.id && f.followed_id === followed.id
      }
    )
  })



}

export function unfollow(currentUser,followed,friendships){
  return dispatch=>{
 


    let friendship = friendships.find(f=>f.follower_id===currentUser.id && f.followed_id===followed.id)
    if(friendship){
      return fetch( FRIENDSHIPURL+friendship.id,{
        method:"DELETE",
        headers:{
          'Content-Type':'application/json',
          'Accepts':'application/json'
        },
        body:JSON.stringify(friendship)
      })
      .then(handleErrors)
      .then(function(){
        dispatch(removeFollowing(followed))
        dispatch(removeFriendship(friendship))
      })

    }
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
        localStorage.setItem('jwt', response.jwt)
        dispatch (setLoggedInUser(response.user))
      }
    })
  }
}
export function userLoginFetch  (user,callback) {
  return dispatch =>{
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
      } else {
        // we need to login at the top level where we are holding our current user!
        // setState in App to currentuse

        localStorage.setItem('jwt', response.jwt)
        dispatch(setLoggedInUser(response.user))

      }
    })

  }


}


export function getProfileFetch() {
  return dispatch => {
    const jwt = localStorage.getItem('jwt')

    if (jwt){
      fetch(AUTOLOGINURL, {
        headers: {
          "Authorization": `Bearer ${jwt}`
        }
      })
      .then(res => res.json())
      .then((response) => {
        if (response.errors) {
          alert(response.errors)
          localStorage.removeItem('jwt')
        } else {
          dispatch(setLoggedInUser(response))
        }
      })
    }

  }
}


export function setLogout ()  {
  return function(dispatch) {
    dispatch({ type: LOGOUT_USER });

    localStorage.removeItem("jwt")

    dispatch(logoutUser())
  }
}

function handleErrors(response) {
  if (!response.ok) {
    console.log(response)
    throw Error(response.statusText);
  }
  return response;
}
