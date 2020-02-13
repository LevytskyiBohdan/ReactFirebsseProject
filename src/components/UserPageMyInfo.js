import React from 'react';
import { connect } from 'react-redux';
import { withRouter, Route } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import * as userActions from '../actions/user';
import * as postsActions from '../actions/posts';
import ShowPosts from './ShowPosts';

class UserPageMyInfo extends React.Component {
    renderPosts() {
        let newData = [];

        this.props.articles.map(article => {
            if (article.email === this.props.user.email) {
                newData.push(article);
            }
        })

        return <ShowPosts articles={newData} />
    }

    render() {
        return (
            <div className="row">
                <div className="col-6">
                    <img src={this.props.user.photoURL} alt="..." className="img-thumbnail"></img>
                </div>

                <div className="col-6">
                    <h3>{this.props.user.displayName}</h3>
                    <h5>Last sign-in time: <small className="text-muted">{this.props.user.metadata.lastSignInTime}</small></h5>
                    <h6>Email: {this.props.user.email}</h6>
                </div>

            </div>
        )
    }
}

const mapStateToProps = state => ({
    user: state.user.currentUser,
    articles: state.posts.collection,
});

const mapDispatchToProps = dispatch => ({
    userActions: bindActionCreators(userActions, dispatch),
    postsActions: bindActionCreators(postsActions, dispatch),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(UserPageMyInfo));