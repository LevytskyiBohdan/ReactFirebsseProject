/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable default-case */
import React from 'react';
import { connect } from 'react-redux';
import { withRouter, Route } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import * as userActions from '../actions/user';
import * as modalActions from '../actions/modal';
import * as postsActions from '../actions/posts';
import * as fileUploadActions from '../actions/fileUpload';
import { FILE_UPLOAD_SUCCESS, FILE_UPLOAD_FAILURE } from '../constants';
import PreviewImg from './FileUploadForm';

class FileUploader extends React.Component {
    openChoseImgModal(evt) {
        evt.preventDefault();

        this.props.modalActions.showModal(<PreviewImg />)
    }

    render() {
        return (<>

            <input
                multiple
                type="file"
                ref="fileUploader"
                className="custom-file-input"
                id="file"
                onClick={evt => this.openChoseImgModal(evt)}
            />
            <label className="custom-file-label" htmlFor="file">Choose file...</label>

            <div className="form-group mt-3">
                    {this.props.chosenFiles && this.props.chosenFiles.map((img, idx) => (
                        <img key={idx} src={img} style={{ height: "40px", width: "40px" }} className="img-thumbnail mr-3"></img>
                    ))}
            </div>
        </>
        )
    }
}

const mapStateToProps = state => ({
    userUid: state.user.currentUser.uid,
    filesURI: state.fileUpload.filesURI,
    chosenFiles: state.fileUpload.chosenFiles,
});

const mapDispatchToProps = dispatch => ({
    userActions: bindActionCreators(userActions, dispatch),
    modalActions: bindActionCreators(modalActions, dispatch),
    postsActions: bindActionCreators(postsActions, dispatch),
    fileUploadActions: bindActionCreators(fileUploadActions, dispatch),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(FileUploader));