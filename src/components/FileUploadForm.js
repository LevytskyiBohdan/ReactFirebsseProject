/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable default-case */
import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import * as modalActions from '../actions/modal';
import * as fileUploadActions from '../actions/fileUpload';

const FileUploadForm = ({ chosenFiles, fileUploadActions, userUid, filesURI, newFiles, modalActions }) => {
    const [chosenFilesState, setChosenFiles] = React.useState(chosenFiles ? [...chosenFiles] : [])
    const [isDone, setIsDone] = React.useState();

    React.useEffect(() => {
        fileUploadActions.getUploadedFiles(userUid)
    }, [])

    React.useEffect(() => {

        if (newFiles)
            fileUploadActions.getUploadedFiles(userUid)

    }, [fileUploadActions, newFiles, userUid])

    React.useEffect(() => {
        if (isDone)
        modalActions.hideModal();
    }, [isDone, modalActions])

    return (
        <>
            <form>
                <div className="form-group">
                    {filesURI && filesURI.map((img, idx) => (
                        <img
                            key={idx}
                            src={img}
                            style={{ height: "100px", width: "100px" }}
                            className="img-thumbnail mr-3 mb-3"
                            onClick={() => {
                                setChosenFiles([...chosenFilesState, img])
                            }}
                        ></img>

                    ))}
                </div>

                <div className="custom-file">
                    <input
                        multiple
                        type="file"
                        className="custom-file-input"
                        id="fileUpload" required
                        onChange={evt => { fileUploadActions.fileUpload(evt.target.files, `usersUploadedFiles/${userUid}`); }}
                    />
                    <label className="custom-file-label" htmlFor="fileUpload">Choose file...</label>

                </div>

                <div className="form-group mt-3">
                    {!!chosenFilesState.length && chosenFilesState.map((img, idx) => (
                        <img
                            key={idx}
                            src={img}
                            style={{ height: "40px", width: "40px" }}
                            className="img-thumbnail mr-3"
                            onClick={() => {
                                const images = chosenFilesState;

                                images.splice(idx, 1);

                                setChosenFiles([...images])

                            }}
                        ></img>

                    ))}
                </div>

                <div className="form-group mt-4">
                    <button
                        type="button"
                        className="btn btn-block btn-primary"
                        onClick={() => {
                            setIsDone(true);
                            fileUploadActions.setChosenFiles(chosenFilesState)
                        }}
                    >Choose</button>
                </div>
            </form>
        </>
    );
}

const mapStateToProps = state => ({
    state,
    filesURI: state.fileUpload.filesURI,
    newFiles: state.fileUpload.newFiles,
    chosenFiles: state.fileUpload.chosenFiles,
    userUid: state.user.currentUser.uid,
});

const mapDispatchToProps = dispatch => ({
    modalActions: bindActionCreators(modalActions, dispatch),
    fileUploadActions: bindActionCreators(fileUploadActions, dispatch),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(FileUploadForm));