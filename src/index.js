import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter as Router} from 'react-router-dom'

// import {  Route,Switch } from 'react-router'
import { Provider } from 'react-redux';
// import { ConnectedRouter } from 'react-router-redux'
import store from './store'

// Create an enhanced history that syncs navigation events with the store
// const history = syncHistoryWithStore(browserHistory, store)
import history from './history.js'

// import store from './store';


ReactDOM.render(
    <Provider store={store}>
      <Router  history={history}>
        <App/>
      </Router>
    </Provider>,
  document.getElementById('root'));

// ReactDOM.render(
//     <Provider store={store}>
//       <Router history={history}>
//         <Route path="/" component={App}>
//           <Route path="login" component={LoginForm}/>
//         </Route>
//       </Router>
//     </Provider>,
//     document.querySelector('#root')
//   )
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
