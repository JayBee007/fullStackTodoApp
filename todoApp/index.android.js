import {Provider} from 'react-redux';

import registerApp from './app/index';
import store from './app/redux/store';

registerApp(store,Provider);
