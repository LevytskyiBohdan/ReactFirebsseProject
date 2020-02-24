/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable default-case */
import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import * as modalActions from '../actions/modal';
import * as fileUploadActions from '../actions/fileUpload';

class FileUploadForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            chosenFiles: this.props.chosenFiles ? [...this.props.chosenFiles] : [],
        }
    }
    
    componentDidMount() {
        this.props.fileUploadActions.getUploadedFiles(this.props.userUid)
    }

    componentDidUpdate(nextProps) {
        if (this.props.newFiles !== nextProps.newFiles) {
            this.props.fileUploadActions.getUploadedFiles(this.props.userUid)
        }
        
        if (this.props.chosenFiles !== nextProps.chosenFiles) {
            this.props.modalActions.hideModal();
        }
    }

    deleteChosenImg(idx) {
        const images = this.state.chosenFiles;

        images.splice(idx, 1);

        this.setState({
            chosenFiles: images,
        })

    }

    render() {
        return (<>

            <form>
                <div className="form-group">
                    {this.props.filesURI && this.props.filesURI.map((img, idx) => (
                        <img
                            key={idx}
                            src={img}
                            style={{ height: "100px", width: "100px" }}
                            className="img-thumbnail mr-3 mb-3"
                            onClick={() => { this.setState({
                                chosenFiles: [...this.state.chosenFiles, img]
                            }) }}
                        ></img>

                    ))}
                </div>

                <div className="custom-file">
                    <input
                        multiple
                        type="file"
                        className="custom-file-input"
                        id="file" required
                        onChange={evt => { this.props.fileUploadActions.fileUpload(evt.target.files, `usersUploadedFiles/${this.props.userUid}`); }}
                    />
                    <label className="custom-file-label" htmlFor="file">Choose file...</label>

                </div>

                <div className="form-group mt-3">
                    {!!this.state.chosenFiles.length && this.state.chosenFiles.map((img, idx) => (
                        <img
                            key={idx}
                            src={img}
                            style={{ height: "40px", width: "40px" }}
                            className="img-thumbnail mr-3"
                            onClick={() => { this.deleteChosenImg(idx) }}
                        ></img>

                    ))}
                </div>

                <div className="form-group mt-4">
                    <button
                        type="button"
                        className="btn btn-block btn-primary"
                        onClick={() => {this.props.fileUploadActions.setChosenFiles(this.state.chosenFiles)}}
                    >Choose</button>
                </div>
            </form>
        </>
        )
    }
}

const mapStateToProps = state => ({
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