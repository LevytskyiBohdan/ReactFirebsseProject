import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import * as userActions from '../actions/user';
import * as modalActions from '../actions/modal';
import ConfirmDeleteUser from './ConfirmDeleteUser';
import UserEditForm from './UserEditForm';

const UserPageMyInfo = ({ userActions, modalActions, user }) => {
    React.useEffect(() => {
       userActions.getCurrentUser();
    }, [])

    return (
        <div className="row">
            <div className="col-6">
                <img src={user.photoURL} alt="..." className="img-thumbnail"></img>
            </div>

            <div className="col-6">
                <h3>{user.displayName}</h3>
                <h5>Last sign-in time: <small className="text-muted">{user.metadata.lastSignInTime}</small></h5>
                <h6>Email: {user.email}</h6>
                <div className="form-group">
                    <button
                        type="button"
                        className="btn btn-warning mt-3"
                        onClick={() => { modalActions.showModal( <UserEditForm /> ); }}
                    >Edit user</button>
                </div>

                <div className="form-group">
                    <button
                        type="button"
                        className="btn btn-danger mt-3"
                        onClick={() => { modalActions.showModal(<ConfirmDeleteUser />); }}
                    >Delete my account</button>
                </div>

            </div>

        </div>
    )
}

const mapStateToProps = state => ({
    user: state.user.currentUser,
    articles: state.posts.collection,
});

const mapDispatchToProps = dispatch => ({
    userActions: bindActionCreators(userActions, dispatch),
    modalActions: bindActionCreators(modalActions, dispatch),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(UserPageMyInfo));