import UUID from 'uuid';
import { FRIENDSHIPURL ,ADD_USER,USERURL ,LOGIN_USER,ADD_FOLLOWER,REMOVE_FOLLOWER} from './Constants';
// import AnimalAdapter from './apis/AnimalAdapter';

export function addUser(name, email) {
  return {
    type: ADD_USER,
    payload: { id: UUID(), name, email }
  }
}



export function setLoggedInUser(src) {
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



function handleErrors(response) {
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response;
}
