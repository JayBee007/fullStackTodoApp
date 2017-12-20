import React, {Component} from 'react';
import {connect} from 'react-redux';

export default function(ComposedComponent) {
  class Authenticaiton extends Component {
    componentDidMount() {
      if(!this.props.auth) {
        this.props.navigator.resetTo({
          screen: 'Home',
          title: 'Home'
        });
      }
    }

    componentWillUpdate(nextProps) {
      if (!nextProps.auth) {
        this.props.navigator.resetTo({
          screen: 'Home',
          title: 'Home'
        });
      }
    }

    render() {
      return <ComposedComponent {...this.props} />
    }
  }

  function mapStateToProps(state) {
    return {auth: state.auth};
  }

  return connect(mapStateToProps)(Authenticaiton);
}
