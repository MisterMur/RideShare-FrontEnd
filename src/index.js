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

serviceWorker.unregister();