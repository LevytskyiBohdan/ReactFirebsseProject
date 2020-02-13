import React from 'react';
import { connect } from 'react-redux';
import { withRouter, Route } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import * as userActions from '../actions/user';
import { Link } from 'react-router-dom';

class UserPageSideBar extends React.Component {
    render() {
        const location = this.props.location;

        return (
                <div className="col-3">
                    <div className="nav flex-column nav-pills" id="v-pills-tab" role="tablist" aria-orientation="vertical">
                        <Link className={`nav-link ${location==='/user/createPost' ? 'active': null}`} to="/user/createPost">Create Post</Link>
                        <Link className={`nav-link ${location==='/user/deleteAccount' ? 'active': null}`} to="/user/deleteAccount" >Delete Account</Link>
                        <Link className={`nav-link ${location==='/user/myPosts' ? 'active': null}`} to="/user/myPosts" >My Posts</Link>
                    </div>
                </div>
            )
    }
}

const mapStateToProps = state => ({
    location: state.router.location.pathname
});

const mapDispatchToProps = dispatch => ({
    userActions: bindActionCreators(userActions, dispatch),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(UserPageSideBar));