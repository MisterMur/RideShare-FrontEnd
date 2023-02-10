import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import * as serviceWorker from './serviceWorker';

// import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import './index.css';

import App from './App';
import store from './store'


ReactDOM.render(
  <Provider store={store}>
    <Router>
      <Route path="/" component={App} />
    </Router>
  </Provider>, document.getElementById('root')
);


//
// ReactDOM.render(
//     <Provider store={store}>
//       <Router  history={history}>
//         <App/>
//       </Router>
//     </Provider>,
//   document.getElementById('root'));

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

    // "material-ui": "^0.20.2",
    // "react-images-upload": "^1.2.7",
    // "material-ui": "^0.20.2",
    // "react-bootstrap": "^1.0.0-beta.16",
    // "material-ui": "^0.20.2",
    //     "react-router": "^3.2.5",
    // "react-router-dom": "^5.0.0",
    // "react-router-redux": "^4.0.8",
    //    "semantic-ui-react": "^0.88.1",
    // "@material-ui/core": "^4.12.4",
    // "@material-ui/icons": "^4.11.3",





