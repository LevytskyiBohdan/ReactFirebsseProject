import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Route } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import * as userActions from './actions/user';
import * as postsActions from './actions/posts';
import Header from './components/Header';
import FileUploader from './components/FileUploader';


import './App.css';

class App extends React.Component {
  componentDidMount() {
    this.props.userActions.getCurrentUser();
    this.props.postsActions.getData('posts');
  }

  render() {
    console.log(this.props)
    return (<>
    {/* <FileUploader/> */}
      <button type="button" onClick={()=>{this.props.userActions.userLogin({email: "admin@gmail.com", password: "ytrewq21"})}}>login</button>
      <button type="button" onClick={()=>{this.props.userActions.userLogout({email: "admin@gmail.com", password: "ytrewq21"})}}>logout</button>
      <button type="button" onClick={()=>{this.props.userActions.getCurrentUser()}}>getUser</button>
      <button type="button" onClick={()=>{this.props.userActions.createUser({email: "admin@gmail.com", password: "ytrewq21"})}}>createUser</button>
      <button type="button" onClick={()=>{this.props.userActions.editUser({displayName: "Jane Q. User", photoURL: "https://example.com/jane-q-user/profile.jpg", myCustomField: "some text",})}}>editUser</button>
      <button type="button" onClick={()=>{this.props.userActions.deleteUser()}}>deleteUser</button>

      <button type="button" onClick={()=>{this.props.postsActions.getData('posts');}}>getData</button>
      <button type="button" onClick={()=>{this.props.postsActions.createData({
                                                                                  collection: 'posts',
                                                                                  email: "admin2@gmail.com",
                                                                                  author: "John Dou2133546789",
                                                                                  title: "Title",
                                                                                  img: "https://firebasestorage.googleapis.com/v0/b/react-firebase-project-f71c4.appspot.com/o/posts%2Fblog-home.jpg?alt=media&token=4670b468-67e7-44de-8f2f-b855304bdafb",
                                                                                  article: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
                                                                                });}}>setData</button>
      <button type="button" onClick={()=>{this.props.postsActions.getPost('posts', '7pU7CBzkOf0fVlgBk8n2');}}>getPOst</button>


      
      {this.props.children}
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
