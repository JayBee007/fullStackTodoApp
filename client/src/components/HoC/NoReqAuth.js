import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

export default function(ComposedComponent) {
  class NoAuthentication extends Component {
    componentWillMount() {
      if(this.props.auth) {
        this.props.history.push('/todos');
      }
    }

    componentWillUpdate(nextProps) {
      if (nextProps.auth) {
        this.props.history.push('/todos');
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
    return {auth:state.auth.auth};
  }

  return connect(mapStateToProps)(NoAuthentication);
}
