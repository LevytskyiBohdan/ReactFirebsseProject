import React from 'react';
import { connect } from 'react-redux';
import { withRouter, Route } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import * as userActions from '../actions/user';
import * as postsActions from '../actions/posts';
import ShowPosts from './ShowPosts';

class UserPageMyPosts extends React.Component {
    componentDidMount() {
        this.props.postsActions.getPosts('posts');
    }
    
    renderPosts() {
        let newData = [];

        this.props.articles.map(article => {
            if (article.email === this.props.user.email) {
                newData.push(article);
            }
        })

        return <ShowPosts 
            isShowEditBlock={true}
            articles={newData} />
    }

    render() {
        return (
            <div className="row">
                {this.props.articles &&
                    this.renderPosts()
                }
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(UserPageMyPosts));