import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter, Route } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import * as modalActions from '../actions/modal';
import * as fileUploadActions from '../actions/fileUpload';
import ErrorMessage from './ErrorMessage';
import FileUploader from './FileUploader';

class SigninForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            rePassword: "",
            name: "",
            isSubmitting: false,
        }
    }

    componentDidUpdate(prevProps) {
        if (this.props.user.currentUser !== prevProps.user.currentUser) {
            this.props.modalActions.hideModal();
            this.props.fileUploadActions.clearFileUploader();
        }

        if (this.props.user.error && this.props.user.error !== prevProps.user.error) {
            this.setState({
                isSubmitting: false,
            })
        }
    }

    onSubmit() {
        if (this.state.isSubmitting) return null;

        this.setState({
            isSubmitting: true,
        })

        const date = {
            email: this.state.email,
            password: this.state.password,
            displayName: this.state.name,
            photoURL: this.props.filesURI[0],
        }

        this.props.confirmAction(date)
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
                        className="form-control"
                        id="email"
                        onChange={evt => { this.setState({ email: evt.target.value }) }}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        className="form-control"
                        id="password"
                        onChange={evt => { this.setState({ password: evt.target.value }) }}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="re-password">Re-Password</label>
                    <input
                        type="password"
                        className="form-control"
                        id="re-password"
                        onChange={evt => { this.setState({ rePassword: evt.target.value }) }}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input
                        type="text"
                        className="form-control"
                        id="name"
                        onChange={evt => { this.setState({ name: evt.target.value }) }}
                    />
                </div>
                <div className="form-group">
                    <label>Your photo</label>
                    <FileUploader path="usersIMG"/>
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
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SigninForm));