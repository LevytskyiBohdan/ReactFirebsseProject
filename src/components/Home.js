import React from 'react';
import { connect } from 'react-redux';
import { withRouter, Route } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import * as userActions from '../actions/user';
import * as postsActions from '../actions/posts';
import ShowPosts from './ShowPosts';
import '../css/Home.css';

// class Home extends React.Component {
//     componentDidMount() {
//         this.props.postsActions.getPosts('posts');
//     }
    
//     render() {
//         return (<>
//             <div className="container-fluid home">
//                 <div className="row">
//                     <div className="col-12 top"></div>
//                 </div>
//                 <div className="row">
//                     {this.props.articles &&
//                         <ShowPosts />
//                     }
//                 </div>
//             </div>
//         </>)
//     }
// }

const Home = (props) => {
    const [posts, setPosts] = React.useState(null);

    React.useEffect(() => {
        props.postsActions.getPosts('posts');
        setPosts(props.articles)
    }, [])

    return (
        <div className="container-fluid home">
            <div className="row">
                <div className="col-12 top"></div>
            </div>
            <div className="row">
                {posts ? <ShowPosts /> : <div>Loading...</div>}
            </div>
        </div>
    )
}

const mapStateToProps = state => ({
    articles: state.posts.collection,
});

const mapDispatchToProps = dispatch => ({
    userActions: bindActionCreators(userActions, dispatch),
    postsActions: bindActionCreators(postsActions, dispatch),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Home));