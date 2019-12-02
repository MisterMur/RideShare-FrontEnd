
import {push} from 'react-router-redux';

import {FETCH_ALL_FORUMS} from '../Constants';


const initialForumsState = {

  forums: [],


};

export default function ridesReducer(state = initialForumsState, action) {
  // console.log('userReducer');
  switch(action.type) {
    case FETCH_ALL_FORUMS:
      return { ...state, forums: [...state.forums, action.payload] };



    default:
      // console.log('in default reducer case',state);
      return state;
  }
}
