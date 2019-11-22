import { ADD_USER,LOGIN_USER,ADD_FOLLOWER,REMOVE_FOLLOWER} from '../Constants';

const initialUserState = {
  users: [],
  currentUser: "key here",
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
    case LOGIN_USER:
      // console.log('in LOGIN_USER Reducer');
      return {...state,currentUser:action.payload};

    case ADD_FOLLOWER:
      return {...state,currentUser:action.payload     };
    case REMOVE_FOLLOWER:
      return {...state,currentUser:action.payload  };
    case 'LOGOUT_USER':
      return {...state, currentUser: {} }



    default:
      // console.log('in default reducer case',state);
      return state;
  }
}
