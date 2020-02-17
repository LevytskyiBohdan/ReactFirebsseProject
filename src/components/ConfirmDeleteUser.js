import React from 'react';
import { connect } from 'react-redux';
import { withRouter, Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { push } from 'connected-react-router';
import * as postsActions from '../actions/posts';
import * as modalActions from '../actions/modal';
import * as userActions from '../actions/user';
import ErrorMessage from './ErrorMessage';

class ConfirmDeleteUser extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            email: '',
            password: '',
        }
    }
    
    componentDidUpdate(nextProps, nextState) {
        if (nextProps.user.currentUser !== this.props.user.currentUser) {
            this.props.modalActions.hideModal();
            this.props.push('/');
        }
    }

    deleteUser() {
        this.props.userActions.deleteUser({
            email: this.state.email,
            password: this.state.password,
        })
    }

    render() {
        return (
            <form>
                <div className="form-group">
                <ErrorMessage error={this.props.user.error} />
                        <div className="form-group">
                            <label htmlFor="email">Login</label>
                            <input
                                type="email"
                                className="form-control"
                                id="email"
                                onChange={evt => {
                                    this.setState({
                                        email: evt.target.value,
                                    })
                                }}
                                />
                        </div>

                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input
                                type="password"
                                className="form-control"
                                id="password"
                                onChange={evt => {
                                    this.setState({
                                        password: evt.target.value,
                                    })
                                }}
                                />
                        </div>

                        <button
                            type="button"
                            className="btn btn-block btn-danger"
                            onClick={()=> { this.deleteUser() }}
                            >Delete</button>
                </div>
            </form>
        )
    }
}

ConfirmDeleteUser.propTypes = {
    title: PropTypes.string,
    button: PropTypes.string,
    actionData: PropTypes.object,
    action: PropTypes.any,
}

const mapStateToProps = state => ({
    collection: state.posts.collection,
    user: state.user,
});

const mapDispatchToProps = dispatch => ({
    push: path => dispatch(push(path)),
    postsActions: bindActionCreators(postsActions, dispatch),
    modalActions: bindActionCreators(modalActions, dispatch),
    userActions: bindActionCreators(userActions, dispatch),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ConfirmDeleteUser));