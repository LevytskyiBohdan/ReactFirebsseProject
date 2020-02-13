import React from 'react';
import { connect } from 'react-redux';
import { withRouter, Route } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import * as userActions from '../actions/user';

class UserPageDelete extends React.Component {
    render() {
        return (
            <p>Delete</p>
        )
    }
}

const mapStateToProps = state => ({
    state,
});

const mapDispatchToProps = dispatch => ({
    userActions: bindActionCreators(userActions, dispatch),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(UserPageDelete));