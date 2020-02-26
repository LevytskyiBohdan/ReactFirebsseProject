/* eslint-disable default-case */
import React from 'react';
import { connect } from 'react-redux';
import { withRouter, Route } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { push } from 'connected-react-router';
import * as userActions from '../actions/user';
import * as postsActions from '../actions/posts';
import * as postActions from '../actions/post';
import * as modalActions from '../actions/modal';
import * as fileUploadActions from '../actions/fileUpload';
import FileUploader from './FileUploader';
import InfoMessage from './InfoMessage';
import ErrorMessage from './ErrorMessage';
import { CREATE_POST_SUCCESS, CREATE_POST_FAILURE } from '../constants';

class UserPageEditPost extends React.Component {
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

    componentDidMount() {
        const id = this.props.pathname.split("/")[3];
        this.props.postActions.getPost("posts", id)
    }

    componentDidUpdate(prevProps) {
        const post = this.props.post.postById;

        if (post && post !== prevProps.post.postById) {
            this.setState({
                title: post.title,
                article: post.article,
                publish: post.publish,
                img: post.img || [],
            })

            this.props.fileUploadActions.setChosenFiles(post.img)
        }

        if (!this.props.posts.error &&
            this.props.posts !== prevProps.posts &&
            this.props.posts.isLoaded) {
                
            this.props.fileUploadActions.clearFileUploader();

            this.props.push('/user/myPosts')
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
            title: this.state.title,
            img: this.props.chosenFiles,
            article: this.state.article,
            publish: this.state.publish,
        }

        this.props.postsActions.editPost('posts', this.props.pathname.split("/")[3], date);

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
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <h3 className="mt-3">Edit post</h3>
                        {this.props.post.postById ?
                            (
                                <form className="mt-4">
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
                                            <FileUploader />
                                        </div>
                                    </div>

                                    <div className="form-group form-check">
                                        <input
                                            type="checkbox"
                                            className="form-check-input"
                                            checked={this.state.publish}
                                            id="publish"
                                            onChange={() => {
                                                this.setState({
                                                    publish: !this.state.publish,
                                                })
                                            }}
                                        />
                                        <label className="form-check-label" htmlFor="publish">Publish post</label>
                                    </div>

                                    <div className="form-group">
                                        <button
                                            type="button"
                                            className="btn btn-block mt-3 btn-success"
                                            disabled={this.state.isCreating}
                                            onClick={() => { this.onSubmit() }}
                                        >Save</button>
                                    </div>
                                </form>

                            ) :
                            (<h6>Loading...</h6>)
                        }

                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    state,
    pathname: state.router.location.pathname,
    post: state.post,
    user: state.user.currentUser,
    posts: state.posts,
    chosenFiles: state.fileUpload.chosenFiles,
});

const mapDispatchToProps = dispatch => ({
    push: path => dispatch(push(path)),
    userActions: bindActionCreators(userActions, dispatch),
    postsActions: bindActionCreators(postsActions, dispatch),
    postActions: bindActionCreators(postActions, dispatch),
    fileUploadActions: bindActionCreators(fileUploadActions, dispatch),
    modalActions: bindActionCreators(modalActions, dispatch),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(UserPageEditPost));