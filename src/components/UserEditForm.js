/* eslint-disable default-case */
import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import * as modalActions from '../actions/modal';
import * as userActions from '../actions/user';
import * as fileUploadActions from '../actions/fileUpload';
import ErrorMessage from './ErrorMessage';
import FileUploader from './FileUploader';

const UserEditForm = ({ user: { currentUser: {displayName, photoURL} }, user, userActions, chosenFiles, modalActions, fileUploadActions }) => {
    const [name, setName] = React.useState(displayName);
    const [isSubmitting, setIsSubmitting] = React.useState(false);

    React.useEffect(() => {
        if (user.error) setIsSubmitting(false)
    }, [user.error])

    React.useEffect(() => {
        if ((chosenFiles && photoURL !== chosenFiles[0]) || displayName !== name) {
            
            fileUploadActions.clearFileUploader();
            modalActions.hideModal();
        }
    }, [isSubmitting, displayName, photoURL])

    function onSubmit() {
        if (isSubmitting) return null;

        setIsSubmitting(true);

        userActions.editUser(null, {
            displayName: name,
            photoURL: chosenFiles ? chosenFiles[0] : photoURL
        })
    }

    return (
        <>
            <ErrorMessage
                error={user.error}
            />
            <div className="form-group">
                <div className="custom-file mb-4">
                    <FileUploader />
                </div>
            </div>
            <div className="form-group">
                <label htmlFor="name">Enter new name</label>
                <input
                    type="text"
                    className="form-control"
                    id="name"
                    value={name}
                    onChange={evt => { setName(evt.target.value) }}
                />
            </div>

            <button
                type="button"
                className="btn btn-block btn-warning"
                onClick={() => { onSubmit() }}
                disabled={isSubmitting}
            >Edit</button>
        </>


    );
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