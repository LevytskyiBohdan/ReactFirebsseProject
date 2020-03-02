/* eslint-disable default-case */
import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import * as userActions from '../actions/user';
import * as usersActions from '../actions/users';
import * as postsActions from '../actions/posts';
import * as postActions from '../actions/post';
import * as modalActions from '../actions/modal';
import * as fileUploadActions from '../actions/fileUpload';
import FileUploader from './FileUploader';
import InfoMessage from './InfoMessage';

class UserPageCreatePost extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            title: '',
            article: '',
            publish: false,
            isCreating: false,
            createSaccess: false,
        }
    }

    componentDidUpdate(prevProps) {
        if (!this.props.posts.error &&
            this.props.posts.collection !== prevProps.posts.collection &&
            this.props.posts.isLoaded) {
                
            this.props.fileUploadActions.clearFileUploader();

            this.setState({
                title: '',
                article: '',
                publish: false,
                isCreating: false,
                createSaccess: true,
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
            owner: this.props.user.uid,
            author: this.props.user.displayName,
            title: this.state.title,
            img: this.props.chosenFiles,
            article: this.state.article,
            publish: this.state.publish,
            likes: {
                count: 0,
                users: [],
            }
        }

        this.props.postsActions.createPost('posts', date);

    }

    render() {
        return (
            <form>
                {this.state.createSaccess && (
                    <InfoMessage message="Post was created." />
                )}

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
    chosenFiles: state.fileUpload.chosenFiles,
});

const mapDispatchToProps = dispatch => ({
    userActions: bindActionCreators(userActions, dispatch),
    usersActions: bindActionCreators(usersActions, dispatch),
    postsActions: bindActionCreators(postsActions, dispatch),
    postActions: bindActionCreators(postActions, dispatch),
    fileUploadActions: bindActionCreators(fileUploadActions, dispatch),
    modalActions: bindActionCreators(modalActions, dispatch),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(UserPageCreatePost));