import React from 'react';
import { View, Image, Text, StyleSheet} from 'react-native';

const Container = (props) => {
  return (
        <Image source={require('../../images/bg.jpg')}
                style={{
                  flex: 1,
                  alignSelf: 'stretch',
                  width: undefined,
                  height: undefined
                }}
              resizeMode="cover">
          {props.children}
        </Image>
  )
}



export default Container;
