import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

export default function(ComposedComponent) {
  class Authenticaiton extends Component {
    componentDidMount() {
      if(!this.props.auth) {
        this.props.history.push('/login');
      }
    }

    componentWillUpdate(nextProps) {
      if (!nextProps.auth) {
        this.props.history.push('/login');
      }
    }

    PropTypes = {
      router: PropTypes.object,
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
