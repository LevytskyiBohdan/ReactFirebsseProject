/* eslint-disable default-case */
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter, Route } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import * as modalActions from '../actions/modal';
import * as userActions from '../actions/user';
import * as fileUploadActions from '../actions/fileUpload';
import ErrorMessage from './ErrorMessage';
import FileUploader from './FileUploader';

class UserEditForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            isChangeField: "",
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

        const date = {};

        switch (this.state.isChangeField) {
            case "name":
                Object.assign(date, {
                    displayName: this.state.name,
                })
                break;
            case "img":
                Object.assign(date, { 
                    photoURL: this.props.chosenFiles[0] 
                })
                break;
        }

        this.props.userActions.editUser(this.state.isChangeField==="name" ? this.props.user.currentUser.uid : null, date)
    }

    renderInputs() {
        switch (this.state.isChangeField) {
            case "img":
                return (
                    <div className="form-group">
                        <div className="custom-file mb-4">
                            <FileUploader />
                        </div>
                    </div>
                )
            case "name":
                return (
                    <div className="form-group">
                        <label htmlFor="name">Enter new name</label>
                        <input
                            type="text"
                            className="form-control"
                            id="name"
                            onChange={evt => { this.setState({ name: evt.target.value }) }}
                        />
                    </div>
                )
        }
    }

    render() {
        return (<>
            <form>
                <ErrorMessage
                    error={this.props.user.error}
                />

                <div className="form-group">
                    <label htmlFor="isChange">Select which data you want to change</label>
                    <select
                        className="custom-select"
                        id="isChange"
                        onChange={evt => {
                            this.setState({
                                isChangeField: evt.target.value,
                            })
                        }}
                    >   
                        <option disabled selected>Select...</option>
                        <option value="img">Change image</option>
                        <option value="name">Change name</option>
                    </select>

                </div>

                { this.renderInputs() }

                <button
                    type="button"
                    className="btn btn-block btn-warning"
                    onClick={() => { this.onSubmit() }}
                    disabled={this.state.isSubmitting}
                >Edit</button>
            </form>
        </>)
    }
}

const mapStateToProps = state => ({
    user: state.user,
    chosenFiles: state.fileUpload.chosenFiles,
});

const mapDispatchToProps = dispatch => ({
    modalActions: bindActionCreators(modalActions, dispatch),
    fileUploadActions: bindActionCreators(fileUploadActions, dispatch),
    userActions: bindActionCreators(userActions, dispatch),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(UserEditForm));