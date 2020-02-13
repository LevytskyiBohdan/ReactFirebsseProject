import React from 'react';
import { connect } from 'react-redux';
import { withRouter, Route } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import * as userActions from '../actions/user';
import * as postsActions from '../actions/posts';
import * as fileUploadActions from '../actions/fileUpload';
import FileUploader from './FileUploader';
import { CREATE_DATA_SUCCESS } from '../constants';

class UserPageCreatePost extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            title: '',
            article: '',
            clearUploader: false,
            isCreating: false,
        }
    }

    componentDidUpdate(prevProps) {
        if (this.props.postsActions.status === CREATE_DATA_SUCCESS) {
            this.props.fileUploadActions.clearFileUploader();
            this.props.postsActions.getData('posts');

            this.setState({
                title: '',
                article: '',
                clearUploader: true,
                isCreating: false,
            })

        }
    }

    onSubmit() {
        if (this.state.isCreating) {
            return null;
        }

        this.setState({
            isCreating: true,
        })

        const date = {
            collection: 'posts',
            author: this.props.user.displayName,
            title: this.state.title,
            img: this.props.filesURI,
            article: this.state.article,
            email: this.props.user.email,
        }

        this.props.postsActions.createData(date);
    }

    render() {
        return (
            <form>
                <div className="form-group">
                    <label htmlFor="title">Title</label>
                    <input
                        type="text"
                        className="form-control"
                        id="title"
                        value={this.state.title}
                        onChange={evt => { this.setState({ title: evt.target.value }) }}
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="validationTextarea">Article</label>
                    <textarea
                        className="form-control"
                        placeholder="text..."
                        value={this.state.article}
                        onChange={evt => { this.setState({ article: evt.target.value }) }}
                    ></textarea>

                </div>

                <div className="custom-file">
                    <FileUploader clear={this.state.clearUploader} path="posts" />
                </div>

                <button
                    type="button"
                    className="btn btn-block btn-primary mt-3"
                    disabled={ this.state.isCreating }
                    onClick={() => { this.onSubmit() }}
                >Create post</button>
            </form>
        )
    }
}

const mapStateToProps = state => ({
    user: state.user.currentUser,
    posts: state.posts,
    filesURI: state.fileUpload.filesURI,
});

const mapDispatchToProps = dispatch => ({
    userActions: bindActionCreators(userActions, dispatch),
    postsActions: bindActionCreators(postsActions, dispatch),
    fileUploadActions: bindActionCreators(fileUploadActions, dispatch),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(UserPageCreatePost));