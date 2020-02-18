import React from 'react';
import { connect } from 'react-redux';
import { withRouter, Route } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import * as userActions from '../actions/user';
import * as postsActions from '../actions/posts';
import * as postActions from '../actions/post';
import * as modalActions from '../actions/modal';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import LikePost from './LikePost';
import UserPagePost from './UserPagePost';
import ConfirmDeletePost from './ConfirmDeletePost';
import Modal from './Modal';
import '../css/showPosts.css';

class ShowPosts extends React.Component {
    onEdit(article) {
        this.props.modalActions.showModal(
            <Modal
                content={<UserPagePost
                    title={article.title}
                    article={article.article}
                    publish={article.publish}
                    id={article.id}
                    actionType="edit"
                />}
                title="Login" closeAction={[this.props.modalActions.hideModal]} />

        );
    }

    onDelete(article) {
        this.props.modalActions.showModal(
            <Modal
                content={<ConfirmDeletePost
                    title="Do you wont delete this article?"
                    button="Delete"
                    id={article.id}
                    actionData={{
                        collection: "posts",
                        id: article.id
                    }}
                    action={this.props.postsActions.deletePost}
                />}
                title="Login" closeAction={[this.props.modalActions.hideModal]} />

        );
    }

    showEditBlock(article) {
        if (this.props.isShowEditBlock) {
            return (
                <>
                    <button
                        type="button"
                        className="btn btn-block btn-warning"
                        onClick={() => { this.onEdit(article) }}
                    >Edit</button>
                    <button
                        type="button"
                        className="btn btn-block btn-danger"
                        onClick={() => { this.onDelete(article) }}
                    >Delete</button>
                    
                </>)
        }
        return null;
    }

    render() {

        return (
            <>
                {this.props.articles &&
                    this.props.articles.map((article, idx) =>
                        (
                            <div key={idx} className="col-12 col-12 col-sm-6 col-md-4 mb-3 posts">
                                <div className="card pt-3">
                                    <img src={article.img} className="card-img-top" alt="..." />
                                    <div className="card-body">
                                        <h5 className="card-title">{article.title}</h5>
                                        <p className="card-text">{article.article}</p>
                                        <h6 className="card-title">
                                            <span className="text-muted">Author: </span>
                                            {article.author}
                                        </h6>
                                        <Link
                                            className="btn btn-block btn-primary"
                                            to={`/post/${article.id}`}
                                        >read more...</Link>

                                        { this.showEditBlock(article) }

                                        <LikePost likes={article.likes} postId={article.id} />
                                    </div>
                                </div>
                            </div>
                        )
                    )}
            </>
        )
    }
}

ShowPosts.propTypes = {
    isShowEditBlock: PropTypes.bool,
}

const mapStateToProps = state => ({
    user: state.user,
    posts: state.posts,
});

const mapDispatchToProps = dispatch => ({
    userActions: bindActionCreators(userActions, dispatch),
    postsActions: bindActionCreators(postsActions, dispatch),
    postActions: bindActionCreators(postActions, dispatch),
    modalActions: bindActionCreators(modalActions, dispatch),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ShowPosts));