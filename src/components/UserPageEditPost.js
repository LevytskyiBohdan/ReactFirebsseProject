/* eslint-disable default-case */
import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { push } from 'connected-react-router';
import * as postsActions from '../actions/posts';
import * as postActions from '../actions/post';
import * as fileUploadActions from '../actions/fileUpload';
import InfoMessage from './InfoMessage';
import FileUploader from './FileUploader';
import { EDIT_POST_SUCCESS, GET_POST_SUCCESS, EDIT_POST_FAILURE } from '../constants/index';

const UserPageEditPost = ({ currentStoreStatus, post, postActions, postsActions, postId, chosenFiles, fileUploadActions }) => {
    const [title, setTitle] = React.useState();
    const [article, setArticle] = React.useState('');
    const [publish, setPublish] = React.useState('');
    const [isCreating, setIsCreating] = React.useState(false);
    const [isMessage, setIsMessage] = React.useState(false);

    React.useEffect(() => {
        postActions.getPost("posts", postId)
    }, [])

    React.useEffect(() => {
        if (currentStoreStatus === EDIT_POST_SUCCESS) {
            fileUploadActions.clearFileUploader();
            setIsCreating(false);
            setIsMessage(true);
        }

        if (currentStoreStatus === GET_POST_SUCCESS) {
            setTitle(post.postById.title);
            setArticle(post.postById.article);
            setPublish(post.postById.publish);
            fileUploadActions.setChosenFiles(post.postById.img || []);
        }

        if (currentStoreStatus === EDIT_POST_FAILURE) setIsCreating(false);
    }, [currentStoreStatus, fileUploadActions, post.postById])


    function onSubmit() {
        if (isCreating) return null;

        setIsCreating(true);

        const date = {
            title,
            img: chosenFiles,
            article,
            publish,
        }
        postsActions.editPost('posts', postId, date)

    }

    return (
        <div className="container">
            <div className="row">
                <div className="col-12">
                    <h3 className="mt-3">Edit post</h3>

                    {isMessage && <InfoMessage message="Post was edited." />}
                    
                    {post.postById ?
                        (
                            <form className="mt-4">
                                <div className="form-group">
                                    <label htmlFor="title">Title</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="title"
                                        value={title}
                                        onChange={evt => { setTitle(evt.target.value) }}
                                    />
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="validationTextarea">Article</label>
                                    <textarea
                                        className="form-control"
                                        placeholder="text..."
                                        value={article}
                                        onChange={evt => { setArticle(evt.target.value) }}
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
                                        checked={publish}
                                        id="publish"
                                        onChange={() => { setPublish(!publish) }}
                                    />
                                    <label className="form-check-label" htmlFor="publish">Publish post</label>
                                </div>

                                <div className="form-group">
                                    <button
                                        type="button"
                                        className="btn btn-block mt-3 btn-success"
                                        disabled={isCreating}
                                        onClick={() => { onSubmit() }}
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

const mapStateToProps = (state, ownProps) => ({
    currentStoreStatus: state.currentStoreStatus,
    postId: ownProps.match.params.id,
    post: state.post,
    user: state.user.currentUser,
    posts: state.posts,
    chosenFiles: state.fileUpload.chosenFiles,
});

const mapDispatchToProps = dispatch => ({
    postsActions: bindActionCreators(postsActions, dispatch),
    postActions: bindActionCreators(postActions, dispatch),
    fileUploadActions: bindActionCreators(fileUploadActions, dispatch),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(UserPageEditPost));