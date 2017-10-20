import {createStore, applyMiddleware} from 'redux';
// import reduxThunk from 'redux-thunk';

import state from './reducers';

// export default createStore(state,applyMiddleware(reduxThunk));

export default createStore(state);
