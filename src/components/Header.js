import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as userActions from '../actions/user';
import * as modalActions from '../actions/modal';
import { Link } from 'react-router-dom';
import { push } from 'connected-react-router';
import Modal from './Modal';
import LoginForm from './LoginForm';
import SigninForm from './SigninForm';

class Header extends React.Component {
    componentDidMount() {
        this.props.userActions.getCurrentUser();
    }

    logOut() {
        this.props.push('/');
        this.props.userActions.userLogout()
    }

    render() {
        const user = this.props.user;
        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col-12">
                        <nav className="navbar navbar-expand-lg navbar-light bg-light">
                            <Link className="navbar-brand" to="/">Blog</Link>
                            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                                <span className="navbar-toggler-icon"></span>
                            </button>

                            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                                <ul className="navbar-nav mr-auto">
                                    <li className="nav-item active">
                                        <Link className="nav-link" to="/">Home</Link>
                                    </li>
                                    <li className="nav-item active">
                                        <Link className="nav-link" to="/about">About</Link>
                                    </li>
                                </ul>
                                <form className="form-inline my-2 my-lg-0">
                                    <ul className="navbar-nav">
                                        {!user.currentUser &&
                                            <>
                                                <li className="nav-item mr-3">
                                                    <button
                                                        type="button"
                                                        className="btn btn-secondary"
                                                        onClick={() => {
                                                            this.props.modalActions.showModal(<LoginForm />)
                                                        }}
                                                    >Login</button>
                                                </li>
                                                <li className="nav-item mr-3">
                                                    <button
                                                        type="button"
                                                        className="btn btn-secondary"
                                                        onClick={() => {
                                                            this.props.modalActions.showModal(<SigninForm/>)
                                                        }}
                                                    >Signin</button>
                                                </li>
                                            </>
                                        }
                                        {!user.error && user.currentUser &&
                                            <li className="nav-item mr-3">
                                                <button
                                                    type="button"
                                                    className="btn btn-secondary"
                                                    onClick={() => { this.logOut() }}
                                                >Logout</button>
                                            </li>
                                        }

                                    </ul>
                                </form>
                                {!user.error && user.currentUser &&
                                    (<>
                                        <form className="form-inline my-2 my-lg-0">
                                            <Link className="nav-link" to="/user">
                                                <img src={this.props.user.currentUser.photoURL} alt="..." className="img-thumbnail" style={{ width: "40px", height: "40px" }} />
                                            </Link>
                                        </form>
                                    </>)
                                }
                            </div>
                        </nav>
                    </div>
                </div>
            </div >)
    }
}

const mapStateToProps = state => ({
    user: state.user,
});

const mapDispatchToProps = dispatch => ({
    push: path => dispatch(push(path)),
    userActions: bindActionCreators(userActions, dispatch),
    modalActions: bindActionCreators(modalActions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);