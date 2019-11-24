import { combineReducers } from 'redux';
import { syncHistoryWithStore, routerReducer } from 'react-router-redux'
import userReducer from './userReducer';
import forumsReducer from './forumsReducer';
import ridesReducer from './ridesReducer';

export default combineReducers({
  currentUser:userReducer.currentUser,
  user: userReducer,
  rides: ridesReducer,
  forums: forumsReducer,
   routing: routerReducer,
})
