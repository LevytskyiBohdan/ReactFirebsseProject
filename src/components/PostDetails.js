import React from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import * as postActions from '../actions/post';
import * as usersActions from '../actions/users';
import { bindActionCreators } from 'redux';
import '../css/postDetails.css';

const setAuthor = (uid, users) => {
    return users.map(user => {
        return user.uid === uid ? user.displayName : null;
    })
}

const PostDetails = ({ post, user, postActions, usersActions, users, match: { params: { id: postId } } }) => {
    React.useEffect(() => {
        usersActions.getUsers()
        postActions.getPost("posts", postId)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [postId])

    return (post &&
        <>


            <div className="container postDetails">
                <div className="row">
                    <div className="col-12">
                        <div className="imgTop" style={{ background: `url(${post.img[0]})` }}></div>

                        {(user.currentUser && post.owner === user.currentUser.uid) ?
                            <Link to={`/user/editPost/${postId}`}>
                                <h1 className="editIcon">{post.title}</h1>
                            </Link>
                            :
                            <h1>{post.title}</h1>}


                        <p>{post.article}</p>

                        {users &&
                            <h6>Author: {setAuthor(user.currentUser.uid, users)}</h6>
                        }

                        <div className="row mt-5">

                            {
                                post.img.map((img, idx) => (
                                    <div key={idx} className="col-12 col-lg-6 mb-4">
                                        <img src={img} className="img-fluid rounded w-100" style={{ height: "25vh" }} alt="Responsive" />
                                    </div>
                                ))
                            }

                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}

const mapStateToProps = state => ({
    post: state.post.postById,
    user: state.user,
    users: state.users.users,
});

const mapDispatchToProps = dispatch => ({
    postActions: bindActionCreators(postActions, dispatch),
    usersActions: bindActionCreators(usersActions, dispatch),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PostDetails));