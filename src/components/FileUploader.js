import React from 'react';
import { connect } from 'react-redux';
import { withRouter, Route } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import * as userActions from '../actions/user';
import * as postsActions from '../actions/posts';
import * as fileUploadActions from '../actions/fileUpload';
import { FILE_UPLOAD_SUCCESS, FILE_UPLOAD_FAILURE } from '../constants';

class FileUploader extends React.Component {
    componentDidUpdate(prevProps) {
        if(prevProps.clear !== this.props.clear) {
            this.refs.fileUploader.value = '';
        }
    }
    
    onChange(files) {
        this.props.fileUploadActions.fileUpload(files, this.props.path)
    }

    setLabel() {
        switch (this.props.status) {
            case FILE_UPLOAD_SUCCESS:
                return "Files uploaded"
            case FILE_UPLOAD_FAILURE:
                return "Error"
            default:
                return "Choose file..."
        }
    }

    render() {
        return (
            <div className="custom-file">
                <input
                    multiple
                    type="file"
                    ref="fileUploader"
                    className="custom-file-input"
                    id="file"
                    onChange={evt => { this.onChange(evt.target.files) }}
                />
                <label className="custom-file-label" htmlFor="file">
                    {this.setLabel()}
                
                </label>
                
                { this.props.filesURI &&
                    <small className="form-text text-muted">All files were uploaded</small>
                }
            </div>
        )
    }
}

const mapStateToProps = state => ({
    filesURI: state.fileUpload.filesURI,
    status: state.fileUpload.status,
});

const mapDispatchToProps = dispatch => ({
    userActions: bindActionCreators(userActions, dispatch),
    postsActions: bindActionCreators(postsActions, dispatch),
    fileUploadActions: bindActionCreators(fileUploadActions, dispatch),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(FileUploader));