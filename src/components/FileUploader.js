/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable default-case */
import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import * as modalActions from '../actions/modal';
import PreviewImg from './FileUploadForm';

const FileUploader = ({chosenFiles, modalActions}) => {
    return (
        <>

            <input
                multiple
                type="file"
                className="custom-file-input"
                id="file"
                onClick={evt => {
                    evt.preventDefault();
                    modalActions.showModal(<PreviewImg />)
                }}
            />
            <label className="custom-file-label" htmlFor="file">Choose file...</label>

            <div className="form-group mt-3">
                    {chosenFiles && chosenFiles.map((img, idx) => (
                        <img
                            key={idx}
                            src={img}
                            style={{ height: "40px", width: "40px" }}
                            className="img-thumbnail mr-3"
                        ></img>
                    ))}
            </div>
        </>
    );
}

const mapStateToProps = state => ({
    chosenFiles: state.fileUpload.chosenFiles,
});

const mapDispatchToProps = dispatch => ({
    modalActions: bindActionCreators(modalActions, dispatch),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(FileUploader));