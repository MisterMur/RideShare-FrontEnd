import rootReducer from './Reducers'; // trick with imports
import thunk from 'redux-thunk';

import { createStore, combineReducers, applyMiddleware } from 'redux';
import { routerMiddleware, push } from 'react-router-redux'
import {  browserHistory } from 'react-router'
// Apply the middleware to the store
const middleware = routerMiddleware(browserHistory)
// const store = createStore(
//   rootReducer,
//   applyMiddleware(middleware)
// )

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
