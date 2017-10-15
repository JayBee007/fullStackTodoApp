import { Navigation } from 'react-native-navigation';

import Home from './screens/Home';
import Login from './screens/Login';

export default () => {
  Navigation.registerComponent('Home', () => Home);
  Navigation.registerComponent('Login', () => Login);

  Navigation.startSingleScreenApp({
    screen: {
      screen: 'Home',
      title: 'Home'
    }
  })
};
