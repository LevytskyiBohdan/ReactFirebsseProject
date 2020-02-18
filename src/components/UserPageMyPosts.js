import React from 'react';
import { connect } from 'react-redux';
import { withRouter, Route } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import * as userActions from '../actions/user';
import * as postsActions from '../actions/posts';
import ShowPosts from './ShowPosts';

class UserPageMyPosts extends React.Component {
    componentDidMount() {
        const query = {
            name: 'userUid',
            symbol: '==',
            equal: this.props.user.uid,
        }

        this.props.userActions.getUserPosts('posts', query);
    }

    componentDidUpdate(nextProps) {
        if (this.props.user.userPosts !== nextProps.user.userPosts) {
            const query = {
                name: 'userUid',
                symbol: '==',
                equal: this.props.user.uid,
            }
    
            this.props.userActions.getUserPosts('posts', query);
        }
    }

    render() {
        return (
            <div className="row">
                {this.props.userPosts &&
                    <ShowPosts 
                    isShowEditBlock={true}
                    articles={this.props.userPosts} />
                }
            </div>
        )
    }
}

const mapStateToProps = state => ({
    user: state.user.currentUser,
    userPosts: state.user.userPosts,
});

const mapDispatchToProps = dispatch => ({
    userActions: bindActionCreators(userActions, dispatch),
    postsActions: bindActionCreators(postsActions, dispatch),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(UserPageMyPosts));