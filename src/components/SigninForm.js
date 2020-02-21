import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter, Route } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import * as modalActions from '../actions/modal';
import * as userActions from '../actions/user';
import * as fileUploadActions from '../actions/fileUpload';
import ErrorMessage from './ErrorMessage';
import FileUploader from './FileUploader/FileUploader';

class SigninForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            rePassword: "",
            name: "",
            photoURL: [''],
            isSubmitting: false,
            invalidsinput: [],
        }

        this.inputsToValidate = ['email', 'password', 'rePassword', 'name',];
    }

    validate() {
        let isValid = true;
        const invalidsinput = [];

        this.inputsToValidate.forEach(input => {
            let isInputValid = true;

            if (input === 'rePassword') {
                isInputValid = this.state[input] && this.state[input] !== null && this.state[input].trim() !== '' && this.state.password === this.state.rePassword;
            }
            else {
                isInputValid = this.state[input] && this.state[input] !== null && this.state[input].trim() !== '';
            }

            if (!isInputValid) {
                invalidsinput.push(input);
                isValid = false;
            }
        });

        this.setState({
            invalidsinput,
        });

        return isValid;
    }

    isValidInput(name) {
        return this.state.invalidsinput.indexOf(name) !== -1;
    }

    componentDidUpdate(nextProps) {
        if (this.props.user.currentUser !== nextProps.user.currentUser) {
            this.props.modalActions.hideModal();
            this.props.fileUploadActions.clearFileUploader();
        }

        if (this.props.user.error && this.props.user.error !== nextProps.user.error) {
            this.setState({
                isSubmitting: false,
            })
        }

        if (this.props.filesURI !== nextProps.filesURI) {
            this.validate();

            this.setState({
                photoURL: this.props.filesURI,
            })
        }
    }

    onSubmit() {
        if (this.state.isSubmitting || !this.validate()) return null;

        this.setState({
            isSubmitting: true,
        })


        const email = this.state.email;
        const password = this.state.password;

        const data = {
            displayName: this.state.name,
            photoURL: this.state.photoURL[0],
        }

        this.props.userActions.createUser(email, password, data)
    }

    render() {
        return (<>
            <form>
                <ErrorMessage
                    error={this.props.user.error}
                />
                <div className="form-group">
                    <label htmlFor="email">Email address</label>
                    <input
                        type="email"
                        className={`form-control ${this.isValidInput('email') ? "is-invalid" : ""}`}
                        id="email"
                        onChange={evt => {
                            this.setState({ email: evt.target.value })
                        }}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        className={`form-control ${this.isValidInput('password') ? "is-invalid" : ""}`}
                        id="password"
                        onChange={evt => {
                            this.setState({ password: evt.target.value })
                        }}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="re-password">Re-Password</label>
                    <input
                        type="password"
                        className={`form-control ${this.isValidInput('rePassword') ? "is-invalid" : ""}`}
                        id="re-password"
                        onChange={evt => {
                            this.setState({ rePassword: evt.target.value })
                        }}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input
                        type="text"
                        className={`form-control ${this.isValidInput('name') ? "is-invalid" : ""}`}
                        id="name"
                        onChange={evt => { this.setState({ name: evt.target.value }) }}
                    />
                </div>
                <div className="custom-file mb-4">
                    <FileUploader
                        path="usersIMG" />
                </div>

                <button
                    type="button"
                    className="btn btn-block btn-primary"
                    onClick={() => { this.onSubmit() }}
                    disabled={this.state.isSubmitting}
                >Singin</button>
            </form>
        </>)
    }
}

SigninForm.propTypes = {
    confirmAction: PropTypes.any,
}

const mapStateToProps = state => ({
    user: state.user,
    filesURI: state.fileUpload.filesURI,
});

const mapDispatchToProps = dispatch => ({
    modalActions: bindActionCreators(modalActions, dispatch),
    fileUploadActions: bindActionCreators(fileUploadActions, dispatch),
    userActions: bindActionCreators(userActions, dispatch),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SigninForm));