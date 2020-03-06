/* eslint-disable default-case */
import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import * as postsActions from '../actions/posts';
import * as postActions from '../actions/post';
import InfoMessage from './InfoMessage';
import { RATING_COUNT_SUCCESS, GET_RATING_SUCCESS } from '../constants'
import '../css/LikePost.css';

const LikePost = ({ postId, rating, currentUser, postsActions, currentStoreStatus }) => {
    const [isShowMessage, setIsShowMessage] = React.useState();
    const [message, setMessage] = React.useState();
    const [isLoading, setIsLoading] = React.useState(true);

    React.useEffect(() => {
        postsActions.getRating();
    }, [])

    React.useEffect(() => {
        if (currentStoreStatus === RATING_COUNT_SUCCESS) postsActions.getRating();

        if (currentStoreStatus === GET_RATING_SUCCESS) setIsLoading(false);

    }, [currentStoreStatus])

    let rate = {
        likes: {
            count: 0,
            users: [],
        },
        dislikes: {
            count: 0,
            users: [],
        }
    }
    if (rating) {
        const element = rating.find(rate => rate.id === postId);

        if (element) rate = element
    }


    function onDislike() {
        changeLikeStatus('dislike')
    }

    function onLike() {
        changeLikeStatus('like')
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

            if (rate.likes.users.includes(currentUser.uid)) {
                setIsShowMessage(true);
                setMessage('You have already liked this.');
                return;
            }

            function changeStatusLike() {
                if (rate.dislikes.users.includes(currentUser.uid)) {
                    const users = rate.likes.users;
                    users.splice(users.indexOf(currentUser.uid), 1)

                    return {
                        dislikes: {
                            count: rate.dislikes.count + 1,
                            users: users,
                        },
                    }
                }
            }

            setIsLoading(true)

            return postsActions.ratingCount(postId,
                {
                    likes: {
                        count: rate.likes.count + 1,
                        users: [...rate.likes.users, currentUser.uid],
                    },
                    dislikes: {
                        count: rate.dislikes.count,
                        users: [...rate.likes.users],
                    },
                    ...changeStatusLike(),
                }
            );
        }

        if (status === 'dislike') {
            setIsShowMessage(false);

            if (rate.dislikes.users.includes(currentUser.uid)) {
                setIsShowMessage(true);
                setMessage('You have already disliked this.');
                return;
            }

            function changeStatusLike() {
                if (rate.likes.users.includes(currentUser.uid)) {
                    const users = rate.likes.users;
                    users.splice(users.indexOf(currentUser.uid), 1)

                    return {
                        likes: {
                            count: rate.likes.count - 1,
                            users: users,
                        },

                    }
                }
            }

            const data = {
                dislikes: {
                    count: rate.dislikes.count - 1,
                    users: [...rate.likes.users, currentUser.uid],
                },
                likes: {
                    count: rate.likes.count,
                    users: [...rate.likes.users],
                },
                ...changeStatusLike(),
            }

            setIsLoading(true)

            return postsActions.ratingCount(postId,
                data
            );
        }
    }

    return (<>
        <form className="likeBlock">
            {isShowMessage &&
                <InfoMessage message={message} />
            }
            {!isLoading && (
                <div className="form-group">
                    <button
                        type="button"
                        className="btn border-success like"
                        onClick={onLike}
                    >{rate.likes.count}</button>
                    <button
                        type="button"
                        className="btn border-danger unlike"
                        onClick={onDislike}
                    >{rate.dislikes.count * -1}</button>
                </div>
            ) || <div>Loading...</div>}
        </form>
    </>)

}

LikePost.propTypes = {
    likes: PropTypes.object,
    postId: PropTypes.string,
}

const mapStateToProps = state => ({
    currentUser: state.user.currentUser,
    rating: state.posts.rating,
    currentStoreStatus: state.currentStoreStatus,
});

const mapDispatchToProps = dispatch => ({
    postsActions: bindActionCreators(postsActions, dispatch),
    postActions: bindActionCreators(postActions, dispatch),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(LikePost));