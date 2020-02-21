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
            img: [],
            clearUploader: false,
            publish: false,
            isCreating: false,
        }
    }

    componentDidMount() {
        const id = this.props.pathname.split("/")[3];
        this.props.postActions.getPost("posts", id)
    }

    deletePreviewImg(id) {
        const data = this.state.img;
        
        data.splice(id, 1)

        this.setState({
            img: [...data]
        })
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
        }

        if (this.props.posts.collection !== prevProps.posts.collection) {
            this.props.fileUploadActions.clearFileUploader();

            this.props.push('/user/myPosts')
        }

        if (this.props.filesURI !== prevProps.filesURI) {
            this.setState({
                img: [...this.state.img, ...this.props.filesURI]
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
            id: this.props.pathname.split("/")[3],
            title: this.state.title,
            img: this.state.img,
            article: this.state.article,
            publish: this.state.publish,
            query: {
                name: 'userUid',
                symbol: '==',
                equal: this.props.user.uid,
            },
        }

        this.props.postsActions.editPost(date);

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
                                            <FileUploader clear={this.state.clearUploader} path="posts" />
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <div className="col-12 d-flex flex-nowrap flex-row align-items-start previewImg">
                                            {this.state.img && this.state.img.map((img, idx) => (
                                                <img
                                                    key={idx}
                                                    src={img}
                                                    style={{height: "40px", width: "40px"}}
                                                    className="img-thumbnail mr-3"
                                                    onClick={() => { this.deletePreviewImg(idx) }}
                                                ></img>

                                            ))}
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
    filesURI: state.fileUpload.filesURI,
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