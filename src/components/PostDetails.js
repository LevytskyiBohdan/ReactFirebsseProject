import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import * as postActions from '../actions/post';
import { bindActionCreators } from 'redux';
import '../css/postDetails.css';


const PostDetails = ({post, postActions, match: { params: { id }}}) => {
    React.useEffect(() => {
        postActions.getPost("posts", id)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id])

        return (post &&
            <div className="container postDetails">
                <div className="row">
                    <div className="col-12">
                        <div className="imgTop" style={{ background: `url(${post.img[0]})` }}></div>
                        <h1>{post.title}</h1>
                        <p>{post.article}</p>
                        <h6>Author: {post.author}</h6>
                        <div className="row mt-5">

                            {
                                post.img.map((img, idx) => (
                                    <div key={idx} className="col-12 col-lg-6 mb-4">
                                        <img src={img} className="img-fluid rounded w-100" style={{height: "25vh"}} alt="Responsive" />
                                    </div>
                                ))
                            }

                        </div>

                    </div>
                </div>
            </div>
        )
}

const mapStateToProps = state => ({
    post: state.post.postById,
    location: state.router.location.pathname,
});

const mapDispatchToProps = dispatch => ({
    postActions: bindActionCreators(postActions, dispatch),
    // postsActions: bindActionCreators(postsActions, dispatch),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PostDetails));