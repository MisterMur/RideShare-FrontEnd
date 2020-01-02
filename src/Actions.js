import UUID from 'uuid';
import {ADD_FORUM_MESSAGE,SET_ALL_FOLLOWING,ADD_FOLLOWING,
  REMOVE_FOLLOWING,FETCH_ALL_FRIENDSHIPS,AUTOLOGINURL,MESSAGEURL,
  SET_USER,FORUMSURL,COMPANYURL, RIDEURL,FRIENDSHIPURL ,
  FETCH_ALL_FORUM_MESSAGES,FETCH_CURRENT_USER,FETCH_ALL_COMPANIES,
  ADD_USER,USERURL ,LOGIN_USER,ADD_FOLLOWER,REMOVE_FOLLOWER,LOGINURL,
  LOGOUT_USER,FETCH_ALL_RIDES,FETCH_ALL_FORUMS,FETCH_ALL_USERS,
  RESET_MESSAGES,
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
export function setAllRides(src) {
  // console.log('setting all rides ',src)
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
  // console.log('in set User', src)
  return {
    type: SET_USER,
    payload:src
  }
}
export function setAllCompanies(src){
  // console.log('setting all companies')
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



export function setLoggedInUser(src) {
  // console.log('setting logged in user',src)
  return {
    type: LOGIN_USER,
    payload: src,
  }
}
export function setAllFollowing(src){
  // console.log('in setall following',src)
  return{
    type:SET_ALL_FOLLOWING,
    payload:src
  }
}
export function addForumMessage(src){
  // console.log('in add froum message',src)
  return{
    type:ADD_FORUM_MESSAGE,
    payload:src
  }
}

export function addFollowing(src){
  // console.log('in add following',src)
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
  // debugger
  // let userUrl = 'https://ride-share-api.herokuapp.com/api/v1/users'
  return function (dispatch){

    let id = this.state.currentUser.id
    // let id = parseInt(this.match.params.id)
    // debugger
    // e.preventDefault()
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
  // does that seem cool? ehhhh
  return function(dispatch) {
    // console.log('fetching current user',user)
    dispatch({ type: FETCH_CURRENT_USER });
    fetch(`${USERURL}/${user.id}`)
    .then(res=>res.json())
    .then(current=>{
        // console.log('fetched current user',current)
        dispatch(setLoggedInUser(current))

    })
  }
}

export function fetchUsers() {
  // does that seem cool? ehhhh
  return function(dispatch) {
    dispatch({ type: FETCH_ALL_USERS });
    fetch(USERURL)
    .then(res=>res.json())
    .then(users=>{
        // console.log('fetched users',users)
        dispatch(setAllUsers(users))

    })
  }
}
export function fetchUser(user){
  return function (dispatch){
    fetch(USERURL+user.id)
    .then(res=>res.json())
    .then(resUser=>{
      // console.log('in fetch user',resUser)
      dispatch(setUser(resUser))
      // dispatch(addFollowing(user.following))

    })
  }
}
export function fetchCompanies() {
  // does that seem cool? ehhhh
  return function(dispatch) {
    dispatch({ type: FETCH_ALL_COMPANIES });
    fetch(COMPANYURL)
    .then(res=>res.json())
    .then(companies=>{
        // console.log('fetched companies',companies)
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
export function postNewMessage(currentUser,content,forum){
  return dispatch=>{
    // console.log('in postnew message reducer',currentUser)
    // console.log('inpost new message reducer forum:',forum)
    console.log('inpost new message reducer content:',content)
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
    // console.log('in postNewFriendship action, currentUser:',follower)
    // console.log('in postNewFriendship action, follower:',followed)
    // debugger
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
    })
  }
}
export function findFriendship(currentUser,followed){
  return fetch(FRIENDSHIPURL)
  .then(res=>res.json())
  .then(friendships=>{
    friendships.find(
      f=>{
        console.log('in find friendship',f);
        return f.follower_id == currentUser.id && f.followed_id == followed.id
      }
    )
  })
  // console.log('in unfollow friendship : ',friendship)



}

export function unfollow(currentUser,followed,friendships){
  return dispatch=>{
    // console.log('in postNewFriendship action, currentUser:',currentUser)
    // console.log('in postNewFriendship action, follower:',follower)
    // debugger
    // let friendship = findFriendship(currentUser,followed)
    console.log('in unfollow',friendships)
    let friendship = friendships.find(f=>f.follower_id==currentUser.id && f.followed_id==followed.id)
    console.log('in unfollow ',friendship)
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
        // console.log('creat user',response)
        // this.props.setCurrentUser(response.user)
        localStorage.setItem('jwt', response.jwt)
        dispatch (setLoggedInUser(response.user))
        // this.props.history.push(`/users/${response.user.id}`)
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
        // console.log('response gotf error',response)
      } else {
        // we need to login at the top level where we are holding our current user!
        // setState in App to currentuse
        // debugger
        // debugger
        // this.props.setCurrentUser(response.user)
        // debugger
        // console.log('set jwt toeken')
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
    // console.log('in get profile fetchauto login')
    const jwt = localStorage.getItem('jwt')

    if (jwt){
      // console.log('jwt exists in auto login')
      fetch(AUTOLOGINURL, {
        headers: {
          "Authorization": `Bearer ${jwt}`
        }
      })
      .then(res => res.json())
      .then((response) => {
        // debugger
        if (response.errors) {
          alert(response.errors)
          localStorage.removeItem('jwt')
        } else {
          // console.log('setting userfrom auto login',response)
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
