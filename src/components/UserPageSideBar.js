import React from 'react';
import { withRouter } from 'react-router-dom';
import { NavLink } from 'react-router-dom';

const UserPageSideBar = () => {
    return (
        <div className="col-3">
            <div className="nav flex-column nav-pills" id="v-pills-tab" role="tablist" aria-orientation="vertical">
                <NavLink exact activeClassName='active' className='nav-link' to="/user" >My Info</NavLink>
                <NavLink activeClassName='active' className='nav-link' to="/user/createPost">Create Post</NavLink>
                <NavLink activeClassName='active' className='nav-link' to="/user/myPosts" >My Posts</NavLink>
            </div>
        </div>
    )
}

export default withRouter(UserPageSideBar);