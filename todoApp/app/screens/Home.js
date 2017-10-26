import React, { Component } from 'react';
import { Text, View,StyleSheet, Button } from 'react-native';
import {connect} from 'react-redux';

import Container from '../components/Container/Container';
import {addCounterAction} from '../redux/actions';

class Home extends Component {
  handleOnPress = () => {
    this.props.navigator.push({screen:'Login', title:'Login'})
  }


  render() {
    return (
      <Container>
        <View style={styles.container}>
          <Text style={styles.title} >
            Imagine-a-Task
          </Text>
          <Text style={styles.subTitle}>
            Do whatever you want when you want to.
          </Text>
          <Text style={{color:'white',fontSize:20}}>
            {0} - {this.props.counter}
          </Text>
          <Button title='Get Started' onPress={this.props.addCounterAction} />
          <Button title='Login' onPress={this.handleOnPress} />
        </View>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor:'rgba(0,0,0,.1)',
    flex:1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  title: {
    color:'white',
    fontSize:30,
    marginTop:10,
    marginBottom:10
  },
  subTitle: {
    color: 'white',
    fontSize:20,
    marginBottom:10,
    marginTop:10
  }
})

function mapStateToProps(state) {
  return {
    counter:state.counter
  }
}

export default connect(mapStateToProps,{addCounterAction})(Home);
