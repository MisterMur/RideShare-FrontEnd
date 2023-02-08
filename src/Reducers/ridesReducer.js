

import {FETCH_ALL_RIDES,ADD_RIDE} from '../Constants';


const initialRidesState = {

  rides: [],


};

export default function ridesReducer(state = initialRidesState, action) {
  switch(action.type) {
    case FETCH_ALL_RIDES:
      return { ...state, rides:action.payload };

    case ADD_RIDE:
      return {...state, rides:[...state.rides,action.payload]}



    default:
      return state;
  }
}
