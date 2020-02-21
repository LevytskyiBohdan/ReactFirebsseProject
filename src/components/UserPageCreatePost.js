/* eslint-disable default-case */
import React from 'react';
import { connect } from 'react-redux';
import { withRouter, Route } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import * as userActions from '../actions/user';
import * as postsActions from '../actions/posts';
import * as postActions from '../actions/post';
import * as modalActions from '../actions/modal';
import * as fileUploadActions from '../actions/fileUpload';
import FileUploader from './FileUploader/FileUploader';
import InfoMessage from './InfoMessage';
import ErrorMessage from './ErrorMessage';
import { CREATE_POST_SUCCESS, CREATE_POST_FAILURE } from '../constants';

class UserPageCreatePost extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            title: '',
            article: '',
            clearUploader: false,
            publish: false,
            isCreating: false,
        }
    }

    componentDidUpdate(prevProps) {
        if (this.props.posts.collection !== prevProps.posts.collection) {
            this.props.fileUploadActions.clearFileUploader();

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
            query: {
                name: 'userUid',
                symbol: '==',
                equal: this.props.user.uid,
            },
            author: this.props.user.displayName,
            title: this.state.title,
            img: this.props.filesURI,
            article: this.state.article,
            email: this.props.user.email,
            userUid: this.props.user.uid,
            publish: this.state.publish,
            likes: {
                count: 0,
                users: [],
            },
        }
        

        this.props.postsActions.createPost(date);

    }

    showStatusMessage() {
        switch (this.props.posts.status) {
            case CREATE_POST_SUCCESS:
                return <InfoMessage message="Post was created." />;
            case CREATE_POST_FAILURE:
                return <ErrorMessage error={this.props.posts.error} />

        }
    }

    render() {
        return (
            <form>
                {this.showStatusMessage()}
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
                        style={{ height: "35vh" }}
                    ></textarea>

                </div>

                <div className="form-group">
                    <div className="custom-file">
                        <FileUploader clear={this.state.clearUploader} path="posts" />
                    </div>
                </div>

                <div className="form-group form-check">
                    <input
                        type="checkbox"
                        className="form-check-input"
                        checked={this.state.publish}
                        id="publish"
                        onChange={()=> { this.setState({
                            publish: !this.state.publish,
                        })}}
                        />
                    <label className="form-check-label" htmlFor="publish">Publish post</label>
                </div>

                <div className="form-group">
                    <button
                        type="button"
                        className="btn btn-block mt-3 btn-success"
                        disabled={this.state.isCreating}
                        onClick={() => { this.onSubmit() }}
                    >Create</button>
                </div>
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
    postActions: bindActionCreators(postActions, dispatch),
    fileUploadActions: bindActionCreators(fileUploadActions, dispatch),
    modalActions: bindActionCreators(modalActions, dispatch),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(UserPageCreatePost));