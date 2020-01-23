

import {RESET_MESSAGES,FETCH_ALL_FORUMS,FETCH_ALL_FORUM_MESSAGES,ADD_FORUM_MESSAGE} from '../Constants';


const initialForumsState = {

  forums: [],
  messages:[]


};

export default function forumsReducer(state = initialForumsState, action) {
  // console.log('userReducer');
  switch(action.type) {
    case FETCH_ALL_FORUMS:
      return { ...state, forums: [...state.forums, action.payload] };
    case ADD_FORUM_MESSAGE:
      // console.log('add forum messages',action.payload)
      return {...state,messages:[...state.messages,action.payload]};
    case FETCH_ALL_FORUM_MESSAGES:
      // console.log('fetch all forum messages',action.payload);
      return {...state,messages:action.payload}
    case RESET_MESSAGES:
      return {...state,messages:[]}




    default:
      // console.log('in default reducer case',state);
      return state;
  }
}
