// import {push} from 'react-router-redux';

import { ADD_USER,LOGIN_USER,ADD_FOLLOWER,REMOVE_FOLLOWER,FETCH_ALL_USERS,FETCH_ALL_COMPANIES,LOGOUT_USER} from '../Constants';


const initialUserState = {
  users: [],
  allCompanies:[],
  forums:[],
  rides: [],
  allForums:[],
  friendships: [],
  currentUser: null
    // users: [],

};

export default function userReducer(state = initialUserState, action) {
  // console.log('userReducer');
  switch(action.type) {
    case ADD_USER:
      return { ...state, users: [...state.users, action.payload] };
    case "RESET":
      return initialUserState;
    case FETCH_ALL_COMPANIES:
      return {...state,allCompanies:[...state.allCompanies,action.payload]}
    case LOGIN_USER:

      return {...state,currentUser:action.payload};
    case FETCH_ALL_USERS:
      return{...state,users:[...state.users,action.payload]}

    case ADD_FOLLOWER:
      return {...state,currentUser:action.payload     };
    case REMOVE_FOLLOWER:
      return {...state,currentUser:action.payload  };
    case LOGOUT_USER:
      return {...state, currentUser: null }



    default:
      // console.log('in default reducer case',state);
      return state;
  }
}
