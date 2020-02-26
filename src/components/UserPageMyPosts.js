import React from 'react';
import { connect } from 'react-redux';
import { withRouter, Route } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import * as userActions from '../actions/user';
import * as postsActions from '../actions/posts';
import * as modalActions from '../actions/modal';
import Modal from './Modal';
import ConfirmDelete from './ConfirmDelete';
import "../css/UserPageMyPosts.css";

class UserPageMyPosts extends React.Component {
    constructor(props) {
        super(props);

        this.query = {
            name: 'owner',
            symbol: '==',
            equal: this.props.user.uid,
        }
    }
    
    componentDidMount() { 
        this.props.userActions.getUserPosts('posts', this.query);
    }

    componentDidUpdate(nextProps) {
        if (this.props.posts !== nextProps.posts) {
            this.props.userActions.getUserPosts('posts', this.query);
            this.props.modalActions.hideModal();
        }
    }

    onDelete(article) {
        this.props.modalActions.showModal(
            <ConfirmDelete
                action={() => this.props.postsActions.deletePost("posts", article.id)}
            />);
    }

    render() {
        return (
            <div className="row userPosts">
                {this.props.userPosts && this.props.isLoaded &&
                    this.props.userPosts.map((article, idx) =>
                        (
                            <div key={idx} className="col-12 col-12 col-sm-6 col-md-4 mb-3 posts">
                                <div className="card pt-3">
                                    <img src={article.img} className="card-img-top" alt="..." />
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
                                            onClick={() => { this.onDelete(article) }}
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
}

const mapStateToProps = state => ({
    user: state.user.currentUser,
    isLoaded: state.user.isLoaded,
    userPosts: state.user.userPosts,
    posts: state.posts,
});

const mapDispatchToProps = dispatch => ({
    userActions: bindActionCreators(userActions, dispatch),
    postsActions: bindActionCreators(postsActions, dispatch),
    modalActions: bindActionCreators(modalActions, dispatch),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(UserPageMyPosts));