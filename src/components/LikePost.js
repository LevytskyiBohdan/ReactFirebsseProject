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

class LikePost extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isShowMessage: false,
            message: ''
        }

        this.query = {
            name: 'publish',
            symbol: '==',
            equal: true,
        }

        this.onLike = this.onLike.bind(this);
        this.onDislike = this.onDislike.bind(this);
        this.changeLikeStatus = this.changeLikeStatus.bind(this);
    }

    onLike() {
        this.changeLikeStatus('like')
    }

    onDislike() {
        this.changeLikeStatus('dislike')
    }

    changeLikeStatus(status) {
        const {
            currentUser,
            likes: likesList,
            postId,
        } = this.props;

        if(!status) {
            return;
        } 

        if (!currentUser) {
            this.setState({
                isShowMessage: true,
                message: 'You should be authorized.'
            })

            return;
        }

        if (likesList.users.includes(currentUser.uid)) {
            this.setState({
                isShowMessage: true,
                message: 'You have already liked this.',
            })
            return;
        }

        if(status === 'like') {
            return this.props.postsActions.likeCount('posts', postId,
                {
                    likes: {
                        count: likesList.count + 1,
                        users: [...likesList.users, currentUser.uid],
                    },
                }
            );
        }

        if(status === 'dislike') {
            return this.props.postsActions.likeCount('posts', postId,
                {
                    likes: {
                        count: likesList.count - 1,
                        users: [...likesList.users, currentUser.uid],
                    }
                }
            );
        }
    }

    render() {
        return (<>
            <form className="likeBlock">
                {this.state.isShowMessage &&
                    <InfoMessage message={this.state.message} />
                }

                <div className="form-group">
                    <button
                        type="button"
                        className="btn btn-primary like"
                        onClick={this.onLike}
                    ></button>
                    <button
                        type="button"
                        className="btn btn-primary unlike"
                        onClick={this.onDislike}
                    ></button>
                    
                    <h6 className="text-muted mt-3">{this.props.likes.count} likes</h6>
                </div>
            </form>
        </>)
    }
}

LikePost.propTypes = {
    likes: PropTypes.object,
    postId: PropTypes.string,
}

const mapStateToProps = state => ({
    currentUser: state.user.currentUser,
    postById: state.post.postById,
    posts: state.posts,
});

const mapDispatchToProps = dispatch => ({
    postsActions: bindActionCreators(postsActions, dispatch),
    postActions: bindActionCreators(postActions, dispatch),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(LikePost));