/* eslint-disable default-case */
import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import * as postsActions from '../actions/posts';
import * as postActions from '../actions/post';
import InfoMessage from './InfoMessage';
import '../css/LikePost.css';

const LikePost = ({ postId, posts, currentUser, postsActions }) => {
    const [isShowMessage, setIsShowMessage] = React.useState();
    const [message, setMessage] = React.useState();

    const post = posts.collection.find(post => post.id === postId)

    function onLike() {
        changeLikeStatus('like')
    }

    function onDislike() {
        changeLikeStatus('dislike')
    }

    function changeLikeStatus(status) {
        if (!status) {
            return;
        }

        if (!currentUser) {
            setIsShowMessage(true);
            setMessage('You should be authorized.');
            return;
        }

        if (status === 'like') {
            setIsShowMessage(false);

            if (post.likes.users.includes(currentUser.uid)) {
                setIsShowMessage(true);
                setMessage('You have already liked this.');
                return;
            }

            function changeStatusLike() {
                if (post.dislikes.users.includes(currentUser.uid)) {
                    const users = post.likes.users;
                    users.splice(users.indexOf(currentUser.uid), 1)

                    return {
                        dislikes: {
                            count: post.dislikes.count + 1,
                            users: users,
                        },
                    }
                }
            }

            return postsActions.likeCount('posts', postId,
                {
                    likes: {
                        count: post.likes.count + 1,
                        users: [...post.likes.users, currentUser.uid],
                    },
                    ...changeStatusLike(),
                }
            );
        }

        if (status === 'dislike') {
            setIsShowMessage(false);

            if (post.dislikes.users.includes(currentUser.uid)) {
                setIsShowMessage(true);
                setMessage('You have already disliked this.');
                return;
            }

            function changeStatusLike() {
                if (post.likes.users.includes(currentUser.uid)) {
                    const users = post.likes.users;
                    users.splice(users.indexOf(currentUser.uid), 1)
    
                    return {
                        likes: {
                            count: post.likes.count - 1,
                            users: users,
                        },
                    }
                }
            }

            const data = {
                dislikes: {
                    count: post.dislikes.count - 1,
                    users: [...post.likes.users, currentUser.uid],
                },
                ...changeStatusLike(),
            }

            return postsActions.likeCount('posts', postId,
            data
            );
        }
    }

    return (<>
        <form className="likeBlock">
            {isShowMessage &&
                <InfoMessage message={message} />
            }

            <div className="form-group">
                <button
                    type="button"
                    className="btn border-success like"
                    onClick={onLike}
                >{post.likes.count}</button>
                <button
                    type="button"
                    className="btn border-danger unlike"
                    onClick={onDislike}
                >{post.dislikes.count * -1}</button>
            </div>
        </form>
    </>)

}

LikePost.propTypes = {
    likes: PropTypes.object,
    postId: PropTypes.string,
}

const mapStateToProps = state => ({
    currentUser: state.user.currentUser,
    posts: state.posts,
});

const mapDispatchToProps = dispatch => ({
    postsActions: bindActionCreators(postsActions, dispatch),
    postActions: bindActionCreators(postActions, dispatch),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(LikePost));