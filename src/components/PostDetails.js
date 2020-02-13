import React from 'react';
import { connect } from 'react-redux';
import { withRouter, Route } from 'react-router-dom';
import * as postActions from '../actions/post';
import { bindActionCreators } from 'redux';


class PostDetails extends React.Component {
    // componentDidMount() {
    //     const { collection, id } = this.props;

    //     this.props.postActions.getPost(collection, id)
    // }

    render() {
        console.log(this.props.post)
        return (this.props.post &&
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <div className="imgTop" style={{ background: `url(${this.props.post.img[0]})`, width: '100%', backgroundSize: '100%', height: '150px', }}></div>
                        {/* <img src={this.props.post.img[0]} className="img-fluid" alt="Responsive image" /> */}
                        <h1>{this.props.post.title}</h1>
                        <p>{this.props.post.article}</p>
                        <h6>Author: {this.props.post.author}</h6>
                        <div className="row mt-5">

                            {
                                this.props.post.img.map(img => (
                                    <div className="col-12 col-lg-6 mb-4">
                                        <img src={img} className="img-fluid rounded w-100" style={{height: "25vh"}} alt="Responsive image" />
                                    </div>
                                ))
                            }

                        </div>

                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    post: state.post.postById,
});

const mapDispatchToProps = dispatch => ({
    postActions: bindActionCreators(postActions, dispatch),
    // postsActions: bindActionCreators(postsActions, dispatch),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PostDetails));