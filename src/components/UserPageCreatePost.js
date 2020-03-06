/* eslint-disable default-case */
import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import * as postsActions from '../actions/posts';
import * as fileUploadActions from '../actions/fileUpload';
import { CREATE_POST_SUCCESS, CREATE_POST_FAILURE } from '../constants';
import FileUploader from './FileUploader';
import InfoMessage from './InfoMessage';

const UserPageCreatePost = ({currentStoreStatus, user, postsActions, chosenFiles, posts, fileUploadActions }) => {
    const [title, setTitle] = React.useState('');
    const [article, setArticle] = React.useState('');
    const [publish, setPublish] = React.useState(false);
    const [isCreating, setIsCreating] = React.useState(false);
    const [createSaccess, setCreateSaccess] = React.useState(false);

    React.useEffect(() => {
        if (currentStoreStatus === CREATE_POST_SUCCESS) {

            fileUploadActions.clearFileUploader();
            
            setTitle('');
            setArticle('');
            setPublish(false);
            setIsCreating(false);
            setCreateSaccess(true);
        }

        if (currentStoreStatus === CREATE_POST_FAILURE)
            setIsCreating(false);

    }, [isCreating, posts.collection, posts.isLoaded])

    function onSubmit() {
        if (isCreating) {
            return null;
        }

        setIsCreating(true);

        const date = {
            owner: user.uid,
            author: user.displayName,
            title: title,
            img: chosenFiles,
            article: article,
            publish: publish,
        }

        postsActions.createPost('posts', date);

    }

    return (
        <form>
            {createSaccess && (
                <InfoMessage message="Post was created." />
            )}

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
                >Create</button>
            </div>
        </form>
    );
}

const mapStateToProps = state => ({
    user: state.user.currentUser,
    posts: state.posts,
    chosenFiles: state.fileUpload.chosenFiles,
    currentStoreStatus: state.currentStoreStatus,
});

const mapDispatchToProps = dispatch => ({
    postsActions: bindActionCreators(postsActions, dispatch),
    fileUploadActions: bindActionCreators(fileUploadActions, dispatch),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(UserPageCreatePost));