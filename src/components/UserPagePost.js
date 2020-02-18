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
import FileUploader from './FileUploader';
import InfoMessage from './InfoMessage';
import ErrorMessage from './ErrorMessage';
import { CREATE_POST_SUCCESS, CREATE_POST_FAILURE } from '../constants';

class UserPagePost extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            title: this.props.title || '',
            article: this.props.article || '',
            clearUploader: false,
            publish: this.props.publish,
            isCreating: false,
        }
    }

    componentDidUpdate(prevProps) {
        console.log(this.state.publish)
        if (this.props.posts.collection !== prevProps.posts.collection) {
            this.props.fileUploadActions.clearFileUploader();
            this.props.modalActions.hideModal();

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
            userUid: this.props.user.uid,
            publish: this.state.publish,
            likes: {
                count: 0,
                users: [],
            },
        }
        console.log(date)

        if (this.props.actionType === "create") {
            this.props.postsActions.createPost(date);
        }
        else if (this.props.actionType === "edit") {
            this.props.postsActions.editPost(Object.assign(
                date,
                {
                    collection: "posts",
                    id: this.props.id,
                }
            ));
        }
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
        console.log(this.state.publish)
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
                        className={`btn btn-block mt-3 ${this.props.actionType === "create" ? "btn-success" : "btn-warning"}`}
                        disabled={this.state.isCreating}
                        onClick={() => { this.onSubmit() }}
                    >{this.props.actionType === "create" ?
                        "Create post" :
                        "Edit"
                        }</button>
                </div>
            </form>
        )
    }
}

UserPagePost.propTypes = {
    actionType: PropTypes.string,
    id: PropTypes.string,
    title: PropTypes.string,
    article: PropTypes.string,
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(UserPagePost));