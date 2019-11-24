
import {push} from 'react-router-redux';
import history from '../history.js'
import {SET_ALL_FURUMS} from '../Constants';


const initialForumsState = {

  forums: [],


};

export default function ridesReducer(state = initialForumsState, action) {
  // console.log('userReducer');
  switch(action.type) {
    case SET_ALL_FURUMS:
      return { ...state, forums: [...state.forums, action.payload] };



    default:
      // console.log('in default reducer case',state);
      return state;
  }
}
