import React from 'react';
import { Route, Switch } from 'react-router';
import App from '../App'; // react-router v4/v5
import ProtectedRoutes from '../utils/protectedRoutes';
import Header from '../components/Header';
import ModalView from '../views/ModalView';
import Home from '../components/Home';
import About from '../components/About';
import PostDetails from '../components/PostDetails';
import UserPageView from '../views/UserPageView';

export default (
    <App>
        <>
            <ModalView />
            <Header />
            <Switch>
                <Route exact path="/" render={Home} />
                <Route exact path="/about" render={About} />
                <Route exact path="/post/:id" render={PostDetails} />
                <ProtectedRoutes path="/user" render={UserPageView} />
                <ProtectedRoutes path="/user/createPost" render={UserPageView} />
                <ProtectedRoutes path="/user/deleteAccount" render={UserPageView} />
                <ProtectedRoutes path="/user/myPosts" render={UserPageView} />
                <ProtectedRoutes path="user/post/:id" render={PostDetails} />
                <Route  render={() => (<div><h1>404</h1></div>)} />
            </Switch>
        </>
    </App>

)