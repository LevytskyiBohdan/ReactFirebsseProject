import React from 'react';
import { connect } from 'react-redux';
import { withRouter, Route } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import * as userActions from '../actions/user';
import * as postsActions from '../actions/posts';
import * as modalActions from '../actions/modal';
import ConfirmDelete from './ConfirmDelete';
import { DELETE_POST_SUCCESS } from '../constants';
import "../css/UserPageMyPosts.css";

const UserPageMyPosts = ({currentStoreStatus, posts, user, userPosts, isLoaded, modalActions, postsActions, userActions}) => {
    const query = {
        name: 'owner',
        symbol: '==',
        equal: user.uid,
    }
    console.log(JSON.stringify(userPosts))
    React.useEffect(() => {
        userActions.getUserPosts('posts', query);
    }, [])

    React.useEffect(() => {
        if (currentStoreStatus === DELETE_POST_SUCCESS) {
            modalActions.hideModal();
            userActions.getUserPosts('posts', query);
        }
    }, [posts])



    return (
        <div className="row userPosts">
            {userPosts && isLoaded &&
                userPosts.map((article, idx) =>
                    (
                        <div key={idx} className="col-12 col-12 col-sm-6 col-md-4 mb-3 posts">
                            <div className="card pt-3">
                                <img src={article.img[0]} className="card-img-top" alt="..." />
                                <div className="card-body">
                                    <h5 className="card-title">{article.title}</h5>
                                    <p className="card-text">{article.article}</p>
                                    <Link
                                        className="btn btn-block btn-primary"
                                        to={`/post/${article.id}`}
                                    >read more...</Link>

                                    <Link
                                        className="btn btn-block btn-warning"
                                        to={`/user/editPost/${article.id}`}
                                    >Edit</Link>

                                    <button
                                        type="button"
                                        className="btn btn-block btn-danger"
                                        onClick={() => { 
                                            modalActions.showModal(
                                                <ConfirmDelete
                                                    action={() => postsActions.deletePost("posts", article.id)}
                                                />);
                                        }}
                                    >Delete</button>

                                </div>
                            </div>
                        </div>
                    )
                )
            }
        </div>
    )
}

const mapStateToProps = state => ({
    user: state.user.currentUser,
    isLoaded: state.user.isLoaded,
    userPosts: state.user.userPosts,
    posts: state.posts,
    currentStoreStatus: state.currentStoreStatus,
});

const mapDispatchToProps = dispatch => ({
    userActions: bindActionCreators(userActions, dispatch),
    postsActions: bindActionCreators(postsActions, dispatch),
    modalActions: bindActionCreators(modalActions, dispatch),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(UserPageMyPosts));