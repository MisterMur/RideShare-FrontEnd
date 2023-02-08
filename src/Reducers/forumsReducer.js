

import {RESET_MESSAGES,FETCH_ALL_FORUMS,FETCH_ALL_FORUM_MESSAGES,ADD_FORUM_MESSAGE} from '../Constants';


const initialForumsState = {

  forums: [],
  messages:[]


};

export default function forumsReducer(state = initialForumsState, action) {
  switch(action.type) {
    case FETCH_ALL_FORUMS:
      return { ...state, forums: [...state.forums, action.payload] };
    case ADD_FORUM_MESSAGE:
      return {...state,messages:[...state.messages,action.payload]};
    case FETCH_ALL_FORUM_MESSAGES:
   
      return {...state,messages:action.payload}
    case RESET_MESSAGES:
      return {...state,messages:[]}




    default:
      return state;
  }
}
