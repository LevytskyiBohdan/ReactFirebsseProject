import React from 'react';
import { connect } from 'react-redux';
import { withRouter, Route } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import LikePost from './LikePost';
import * as userActions from '../actions/user';
import * as usersActions from '../actions/users';
import * as postsActions from '../actions/posts';
import '../css/Home.css';

const Home = (props) => {
    const [posts, setPosts] = React.useState(null);

    const query = {
        name: 'publish',
        symbol: '==',
        equal: true,
    }

    React.useEffect(() => {
        props.postsActions.getPosts('posts', query)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    React.useEffect(() => {
        if (!props.posts.isLoading && props.posts.isLoaded) {
            setPosts(props.posts.collection)
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.posts])

    return (
        <div className="container-fluid home">
            <div className="row">
                <div className="col-12 top"></div>
            </div>
            <div className="row">
                {posts &&
                    posts.map((article, idx) =>(
                    <div key={idx} className="col-12 col-12 col-sm-6 col-md-4 mb-3 posts">
                                <div className="card pt-3">
                                    <img src={article.img} className="card-img-top" alt="..." />
                                    <div className="card-body">
                                        <h5 className="card-title">{article.title}</h5>
                                        <p className="card-text">{article.article}</p>
                                        <h6 className="card-title">
                                            <span className="text-muted">Author: </span>
                                            { article.author }
                                        </h6>
                                        <Link
                                            className="btn btn-block btn-primary"
                                            to={`/post/${article.id}`}
                                        >read more...</Link>
                                        
                                        <LikePost postId={article.id} likes={article.likes}/>
                                    </div>
                                </div>
                            </div>
                        )
                    )}
            </div>
        </div>
    )
}

const mapStateToProps = state => ({
    posts: state.posts,
    users: state.users,
});

const mapDispatchToProps = dispatch => ({
    userActions: bindActionCreators(userActions, dispatch),
    usersActions: bindActionCreators(usersActions, dispatch),
    postsActions: bindActionCreators(postsActions, dispatch),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Home));