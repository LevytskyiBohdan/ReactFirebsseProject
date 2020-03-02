import React from 'react';
import { withRouter, Switch } from 'react-router-dom';
import UserPageSideBar from '../components/UserPageSideBar';
import UserPageCreatePost from '../components/UserPageCreatePost';
import UserPageMyPosts from '../components/UserPageMyPosts';
import UserPageMyInfo from '../components/UserPageMyInfo';

import ProtectedRoutes from '../utils/protectedRoutes';

class UserPageView extends React.Component {
    render() {
        return (<div className='container-fluid mt-4'>
            <div className="row">

                <UserPageSideBar />
                <div className="col-9">
                    <div className="tab-content">
                        <div className="tab-pane fade show active">
                            <Switch>
                                <ProtectedRoutes exact path="/user" render={UserPageMyInfo} />
                                <ProtectedRoutes path="/user/createPost" render={UserPageCreatePost} />
                                <ProtectedRoutes path="/user/myPosts" render={UserPageMyPosts} />
                            </Switch>
                        </div>
                    </div>
                </div>
            </div>

        </div>)
    }
}

export default withRouter(UserPageView);