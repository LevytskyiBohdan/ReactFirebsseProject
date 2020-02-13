import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import * as userActions from './actions/user';
import * as postsActions from './actions/posts';
import PostDetails from './components/PostDetails';

import './App.css';

class App extends React.Component {
  componentDidMount() {
    this.props.userActions.getCurrentUser();
    this.props.postsActions.getPosts('posts');
  }

  render() {
    console.log(this.props)
    return (
      <>
        { this.props.children }
      </>
    );
  }
};

const mapStateToProps = state => ({
  state,
});

const mapDispatchToProps = dispatch => ({
  userActions: bindActionCreators(userActions, dispatch),
  postsActions: bindActionCreators(postsActions, dispatch),

});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
