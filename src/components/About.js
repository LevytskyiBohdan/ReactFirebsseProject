import React from 'react';
import { connect } from 'react-redux';
import { withRouter, Route } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import * as userActions from '../actions/user';

class About extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (<>
        <p>About</p>
        </>)
    }
}

const mapStateToProps = state => ({
    state,
  });
  
  const mapDispatchToProps = dispatch => ({
    userActions: bindActionCreators(userActions, dispatch),
  });
  
  export default withRouter(connect(mapStateToProps, mapDispatchToProps)(About));