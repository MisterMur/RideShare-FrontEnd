// import {push} from 'react-router-redux';

import {
   SET_ALL_FOLLOWING,ADD_FOLLOWING,
  REMOVE_FOLLOWING,FETCH_ALL_FRIENDSHIPS,ADD_USER,
  LOGIN_USER,ADD_FOLLOWER,REMOVE_FOLLOWER,SET_USER,
  FETCH_ALL_USERS,FETCH_ALL_COMPANIES,LOGOUT_USER,
  ADD_FRIENDSHIP,REMOVE_FRIENDSHIP} from '../Constants';


const initialUserState = {
  users: [],
  allCompanies:[],
  forums:[],
  rides: [],
  allForums:[],
  friendships: [],
  followers:[],
  following:[],
  userProfile:null,
  currentUser: null

};

export default function userReducer(state = initialUserState, action) {
  switch(action.type) {
    case ADD_USER:
      return { ...state, users: [...state.users, action.payload] };
    case "RESET":
      return initialUserState;
    case FETCH_ALL_COMPANIES:
      return {...state,allCompanies:action.payload}
    case LOGIN_USER:

      return {...state,currentUser:action.payload};
    case FETCH_ALL_USERS:
      return{...state,users:action.payload}

    case ADD_FOLLOWER:
      return {...state,
        currentUser:{
          ...state.currentUser,
          followers:[...state.currentUser.followers,
            action.payload]
          }
        }

    case REMOVE_FOLLOWER:
    let removeFollowers = state.currentUser.followers.filter(val => val.id !== action.payload.id);
    return {...state,currentUser:{...state.currentUser,followers:removeFollowers}}

    case SET_ALL_FOLLOWING:
      return {...state,following:action.payload}
    case ADD_FOLLOWING:

      return {...state,
        currentUser:{
          ...state.currentUser,
          following:[...state.currentUser.following,
            action.payload]
          }
        }

    case REMOVE_FOLLOWING:
      let removeFollowing = state.currentUser.following.filter(val => val.id !== action.payload.id);
      return {...state,currentUser:{...state.currentUser,following:removeFollowing}}
    case LOGOUT_USER:
      return {...state, currentUser: null }
    case SET_USER:

      return {...state,userProfile:action.payload}
    case FETCH_ALL_FRIENDSHIPS:
      return {...state,friendships:action.payload}
    case ADD_FRIENDSHIP:
      return {...state,friendships:[...state.friendships,action.payload]}
    case REMOVE_FRIENDSHIP:
      let removeFriendship = state.friendships.filter(val=>val.id!==action.payload.id)
      return {...state,friendships:removeFriendship}

    default:
      return state;
  }
}
