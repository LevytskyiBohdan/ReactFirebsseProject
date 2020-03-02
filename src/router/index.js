import React from 'react';
import { Route, Switch } from 'react-router';
import ProtectedRoutes from '../utils/protectedRoutes';
import Home from '../components/Home';
import About from '../components/About';
import PostDetails from '../components/PostDetails';
import UserPageEditPost from '../components/UserPageEditPost';
import UserPageView from '../views/UserPageView';

export default (
    <Switch>
        <Route exact path="/" render={Home} />
        <Route exact path="/about" render={About} />
        <Route exact path="/post/:id" render={PostDetails} />
        <ProtectedRoutes exact path="/user" render={UserPageView} />
        <ProtectedRoutes path="/user/editPost/:id" render={UserPageEditPost} />>
        <ProtectedRoutes exact path="/user/createPost" render={UserPageView} />
        <ProtectedRoutes exact path="/user/myPosts" render={UserPageView} />
        <ProtectedRoutes path="/user/post/:id" render={PostDetails} />
        <Route render={() => (<div><h1>404</h1></div>)} />
    </Switch>
)