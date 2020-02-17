/* eslint-disable default-case */
import React from 'react';
import { connect } from 'react-redux';
import { withRouter, Route } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import * as postsActions from '../actions/posts';
import ShowPosts from './ShowPosts';
import InfoMessage from './InfoMessage';
import '../css/LikePost.css';

class LikePost extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isShowMessage: false,
            message: ''
        }
    }

    onClick(status) {
        if (!this.props.currentUser) {
            this.setState({
                isShowMessage: true,
                message: 'You should be authorized.'
            })
            return null;
        }

        const likes = this.props.likes;
        const currentEmail = this.props.currentUser.email;

        if (!likes.users.includes(currentEmail)) {
            switch (status) {
                case true:
                    this.props.postsActions.likeCount(
                        { 
                            collection: 'posts',
                            id: this.props.postId,
                            likes: {
                                count: likes.count + 1,
                                users: [ ...likes.users, currentEmail ],
                            }
                        }
                    );
                    break;
                case false:
                    this.props.postsActions.likeCount( 
                        {
                            collection: 'posts',
                            id: this.props.postId,
                            likes: {
                                count: likes.count - 1,
                                users: [ ...likes.users, currentEmail ],
                            }
                        }
                    );
                    break;
            }
        } else {
            this.setState({
                isShowMessage: true,
                message: 'You have liked this yet.',
            })
        }
    }

    render() {
        return (<>
            <form className="likeBlock">
                { this.state.isShowMessage &&
                    <InfoMessage message={ this.state.message }/>
                }
                
                <div className="form-group">
                    <button
                        type="button"
                        className="btn btn-primary like"
                        onClick={()=> { this.onClick(true)}}
                    ></button>
                    <button
                        type="button"
                        className="btn btn-primary unlike"
                        onClick={()=> { this.onClick(false)}}
                        ></button>
                    <h6 className="text-muted">{ this.props.likes.count } likes</h6>
                </div>
            </form>
        </>)
    }
}

LikePost.propTypes = {
    likes: PropTypes.object,
}

const mapStateToProps = state => ({
    currentUser: state.user.currentUser,
});

const mapDispatchToProps = dispatch => ({
    postsActions: bindActionCreators(postsActions, dispatch),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(LikePost));