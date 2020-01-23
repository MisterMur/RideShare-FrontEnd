import rootReducer from './Reducers'; // trick with imports
import thunk from 'redux-thunk';

import { createStore, applyMiddleware } from 'redux';
// import { routerMiddleware } from 'react-router-redux'
// import {  browserHistory } from 'react-router'

// const middleware = routerMiddleware(browserHistory)

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
