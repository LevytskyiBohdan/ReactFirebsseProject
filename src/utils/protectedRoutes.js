import React from 'react';
import { connect } from 'react-redux';
import { withRouter, Route } from 'react-router-dom';
import { push } from 'connected-react-router';
import { bindActionCreators } from 'redux';
import * as userActions from '../actions/user';

const protectedRoutes = (props) => {
    const { uid } = props.user.currentUser || false;
    if(!uid) {
        // props.push('/');
    }

    return (
        uid ?
            <Route exact render={props.render} /> :
            null
    )
}

const mapStateToProps = state => ({
    user: state.user,
});

const mapDispatchToProps = dispatch => ({
    push: path => dispatch(push(path)),
    userActions: bindActionCreators(userActions, dispatch),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(protectedRoutes));
