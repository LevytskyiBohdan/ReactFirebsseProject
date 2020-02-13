import React from 'react';
import { connect } from 'react-redux';
import { withRouter, Route } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { push } from 'connected-react-router';
import * as userActions from '../actions/user';
import UserPageSideBar from '../components/UserPageSideBar';
import UserPageDelete from '../components/UserPageDelete';
import UserPageCreatePost from '../components/UserPageCreatePost';
import UserPageMyPosts from '../components/UserPageMyPosts';
import UserPageMyInfo from '../components/UserPageMyInfo';

class UserPageView extends React.Component {

    // componentDidMount() {
    //     this.props.push('/user/createPost');
    // }

    getCurrentPage() {
        switch (this.props.location) {
            case "/user/createPost":
                return <UserPageCreatePost />;
            case "/user/deleteAccount":
                return <UserPageDelete />;
            case "/user/myPosts":
                return <UserPageMyPosts />;
            default:
                return <UserPageMyInfo />;
        }
    }

    render() {
        return (<div className='container-fluid mt-4'>
            <div className="row">

                <UserPageSideBar />
                <div className="col-9 userPageMyPosts">
                    <div className="tab-content">
                        <div className="tab-pane fade show active">
                            {
                                this.getCurrentPage()
                            }
                        </div>
                    </div>
                </div>
            </div>

        </div>)
    }
}

const mapStateToProps = state => ({
    location: state.router.location.pathname
});

const mapDispatchToProps = dispatch => ({
    push: path => dispatch(push(path)),
    userActions: bindActionCreators(userActions, dispatch),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(UserPageView));