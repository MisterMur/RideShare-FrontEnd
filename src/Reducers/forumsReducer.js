
import {push} from 'react-router-redux';

import {FETCH_ALL_FORUMS,FETCH_ALL_FORUM_MESSAGES} from '../Constants';


const initialForumsState = {

  forums: [],
  messages:[]


};

export default function ridesReducer(state = initialForumsState, action) {
  // console.log('userReducer');
  switch(action.type) {
    case FETCH_ALL_FORUMS:
      return { ...state, forums: [...state.forums, action.payload] };
    case FETCH_ALL_FORUM_MESSAGES:
      return {...state,messages:[...state.messages,action.payload]};



    default:
      // console.log('in default reducer case',state);
      return state;
  }
}
