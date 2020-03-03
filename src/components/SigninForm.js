import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import * as modalActions from '../actions/modal';
import * as fileUploadActions from '../actions/fileUpload';
import ErrorMessage from './ErrorMessage';
import SigninFormCreateUser from './SigninFormCreateUser';
import SigninFormAddUserData from './SigninFormAddUserData';

const SigninForm = ({user: { error, currentUser }, modalActions, fileUploadActions}) => {
    React.useEffect(() => {
        if (currentUser && currentUser.displayName) {
            modalActions.hideModal();
            fileUploadActions.clearFileUploader();
        }

    }, [currentUser, fileUploadActions, modalActions])

    return (<>
        <form>
            <ErrorMessage
                error={error}
            />

            <SigninFormCreateUser />

            <SigninFormAddUserData />

        </form>
    </>)
}

const mapStateToProps = state => ({
    user: state.user,
    chosenFiles: state.fileUpload.chosenFiles,
});

const mapDispatchToProps = dispatch => ({
    modalActions: bindActionCreators(modalActions, dispatch),
    fileUploadActions: bindActionCreators(fileUploadActions, dispatch),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SigninForm));