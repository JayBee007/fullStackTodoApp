import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import { BrowserRouter as Router } from 'react-router-dom';
import {composeWithDevTools} from 'redux-devtools-extension';
import reduxThunk from 'redux-thunk';

import 'semantic-ui-css/semantic.min.css';
import state from './redux/reducers';
import './index.css';
import App from './components/App/App';
import C from './redux/constants';
import {authAction} from './redux/actions';
import registerServiceWorker from './registerServiceWorker';

const createStoreWithMiddleware = composeWithDevTools(applyMiddleware(reduxThunk))(createStore);

export const store = createStoreWithMiddleware(state);

const x_auth = localStorage.getItem('x-auth');
const userEmail = localStorage.getItem('userEmail');
const userId = localStorage.getItem('userId');
if(x_auth) {
  store.dispatch({type: C.AUTHENTICATED});
  store.dispatch(authAction(userEmail,userId));
}

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>
  , document.getElementById('root'));
registerServiceWorker();
