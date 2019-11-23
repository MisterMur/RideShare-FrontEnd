import UUID from 'uuid';
import { FRIENDSHIPURL ,ADD_USER,USERURL ,LOGIN_USER,ADD_FOLLOWER,REMOVE_FOLLOWER,LOGINURL,LOGOUT_USER} from './Constants';
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



export function setLoggedInUser(src) {
  console.log('set logged in user',src)
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
export function postNewFriendship(currentUser,follower){
  // const scheduleUrl='http://localhost:3000/api/v1/schedules'
  // console.log('in handle add schedule',e)
  // debugger

  // fetch( 'http://localhost:3000/api/v1/friendships' ,{
  //   method:"POST",
  //   headers:{
  //     'Content-Type':'application/json',
  //     'Accepts':'application/json'
  //   },
  //   body:JSON.stringify({
  //     followee_id:currentUser.id,
  //     follower_id:follower.id
  //   })
  // }).then(console.log)

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
  console.log('in userlogin fetch')
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
        // debugger
        // debugger
        // this.props.setCurrentUser(response.user)
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
    const token = localStorage.token;
    if (token) {
      return fetch("http://localhost:3000/api/v1/profile", {
        method: "GET",
        headers: {
          'Content-Type': 'application/json',
          "Accepts": 'application/json',
          'Authorization': `Bearer ${token}`
        }
      })
        .then(resp => resp.json())
        .then(data => {
          if (data.message) {
            // An error will occur if the token is invalid.
            // If this happens, you may want to remove the invalid token.
            localStorage.removeItem("token")
          } else {
            dispatch(setLoggedInUser(data.user))
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
    this.props.history.push("/login")
  }
}

function handleErrors(response) {
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response;
}
