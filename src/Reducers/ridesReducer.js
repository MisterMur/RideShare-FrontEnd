
import {push} from 'react-router-redux';
import history from '../history.js'
import {SET_ALL_RIDES} from '../Constants';


const initialRidesState = {

  rides: [],


};

export default function ridesReducer(state = initialRidesState, action) {
  // console.log('userReducer');
  switch(action.type) {
    case SET_ALL_RIDES:
      console.log('setting rides',action.payload)
      return { ...state, rides: [...state.rides, action.payload] };



    default:
      // console.log('in default reducer case',state);
      return state;
  }
}
