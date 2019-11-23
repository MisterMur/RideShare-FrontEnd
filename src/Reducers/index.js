import userReducer from './userReducer';
import { combineReducers } from 'redux';
import { syncHistoryWithStore, routerReducer } from 'react-router-redux'

export default combineReducers({
  user: userReducer,
   routing: routerReducer,
})
