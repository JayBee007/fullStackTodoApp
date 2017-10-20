import { Navigation } from 'react-native-navigation';

import Home from './screens/Home';
import Login from './screens/Login';

export default function (store, Provider) {
  Navigation.registerComponent('Home', () => Home,store, Provider);
  Navigation.registerComponent('Login', () => Login,store, Provider);

  Navigation.startSingleScreenApp({
    screen: {
      screen: 'Home',
      title: 'Home'
    }
  })
};
