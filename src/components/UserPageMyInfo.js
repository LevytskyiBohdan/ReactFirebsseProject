import React from 'react';
import { connect } from 'react-redux';
import { withRouter, Route } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import * as usersActions from '../actions/users';
import * as userActions from '../actions/user';
import * as postsActions from '../actions/posts';
import * as modalActions from '../actions/modal';
import ConfirmDeleteUser from './ConfirmDeleteUser';
import UserEditForm from './UserEditForm';

class UserPageMyInfo extends React.Component {
    componentDidMount() {
        this.props.userActions.getCurrentUser();
    }

    deleteUser() {
        this.props.modalActions.showModal(<ConfirmDeleteUser />);
    }

    editUser() {
        this.props.modalActions.showModal(
            <UserEditForm
                title="Do you want delete your account?"
                button="Delete"
                actionData={null}
                action={this.props.userActions.deleteUser} />
        );
    }

    render() {
        return (
            <div className="row">
                <div className="col-6">
                    <img src={this.props.user.photoURL} alt="..." className="img-thumbnail"></img>
                </div>

                <div className="col-6">
                    <h3>{this.props.user.displayName}</h3>
                    <h5>Last sign-in time: <small className="text-muted">{this.props.user.metadata.lastSignInTime}</small></h5>
                    <h6>Email: {this.props.user.email}</h6>
                    <div className="form-group">
                        <button
                            type="button"
                            className="btn btn-warning mt-3"
                            onClick={() => { this.editUser() }}
                        >Edit user</button>
                    </div>

                    <div className="form-group">
                        <button
                            type="button"
                            className="btn btn-danger mt-3"
                            onClick={() => { this.deleteUser() }}
                        >Delete my account</button>
                    </div>

                </div>

            </div>
        )
    }
}

const mapStateToProps = state => ({
    user: state.user.currentUser,
    articles: state.posts.collection,
});

const mapDispatchToProps = dispatch => ({
    userActions: bindActionCreators(userActions, dispatch),
    postsActions: bindActionCreators(postsActions, dispatch),
    modalActions: bindActionCreators(modalActions, dispatch),
    usersActions: bindActionCreators(usersActions, dispatch),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(UserPageMyInfo));