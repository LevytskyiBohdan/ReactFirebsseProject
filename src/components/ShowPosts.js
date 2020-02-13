import React from 'react';
import { connect } from 'react-redux';
import { withRouter, Route } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import * as userActions from '../actions/user';
import * as postsActions from '../actions/posts';
import * as postActions from '../actions/post';
import { Link } from 'react-router-dom';
import '../css/showPosts.css';

class ShowPosts extends React.Component {
    onClick(id) {
        this.props.postActions.getPost("posts", id)
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
                                        onClick={() => { this.onClick(article.id)}}
                                    >read more...</Link>
                                </div>
                            </div>
                        </div>
                    )
                    )}
            </>
        )
    }
}

const mapStateToProps = state => ({
    state,
});

const mapDispatchToProps = dispatch => ({
    userActions: bindActionCreators(userActions, dispatch),
    postsActions: bindActionCreators(postsActions, dispatch),
    postActions: bindActionCreators(postActions, dispatch),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ShowPosts));