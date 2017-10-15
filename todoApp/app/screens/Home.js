import React, { Component } from 'react';
import { Text, View,StyleSheet, Button } from 'react-native';
import Container from '../components/Container/Container'

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
          <Button title='Get Started' onPress={this.handleOnPress} />
        </View>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor:'rgba(0,0,0,.1)',
    height:'auto',
    flexDirection: 'column',
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

export default Home;
