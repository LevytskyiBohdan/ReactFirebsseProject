import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { push } from 'connected-react-router';
import * as modalActions from '../actions/modal';
import * as userActions from '../actions/user';
import ErrorMessage from './ErrorMessage';

const ConfirmDeleteUser = (props) => {
    const [email, setEmail] = React.useState(null);
    const [password, setPassword] = React.useState(null);

    const mounted = React.useRef();

    React.useEffect(() => {
        if (!mounted.current) {
            mounted.current = true;
          } else {
            props.push('/');
            props.modalActions.hideModal();
          }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.user.currentUser])

    return(
        <form>
                <div className="form-group">
                <ErrorMessage error={props.user.error} />
                        <div className="form-group">
                            <label htmlFor="email">Login</label>
                            <input
                                type="email"
                                className="form-control"
                                id="email"
                                onChange={evt => {
                                    setEmail(evt.target.value)
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
                                    setPassword(evt.target.value)
                                }}
                                />
                        </div>

                        <button
                            type="button"
                            className="btn btn-block btn-danger"
                            onClick={()=> { props.userActions.deleteUser(email, password) }}
                            >Delete</button>
                </div>
            </form>
    );
}

const mapStateToProps = state => ({
    collection: state.posts.collection,
    user: state.user,
});

const mapDispatchToProps = dispatch => ({
    push: path => dispatch(push(path)),
    modalActions: bindActionCreators(modalActions, dispatch),
    userActions: bindActionCreators(userActions, dispatch),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ConfirmDeleteUser));