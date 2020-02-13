import React from 'react';
import { connect } from 'react-redux';
import { withRouter, Route } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import * as userActions from '../actions/user';
import ShowPosts from './ShowPosts';
import '../css/Home.css';

class Home extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        console.log(this.props.articles)
        return (<>
            <div className="container-fluid home">
                <div className="row">
                    <div className="col-12 top"></div>
                </div>
                <div className="row">
                    {this.props.articles &&
                        <ShowPosts articles={this.props.articles} />
                    }
                </div>
            </div>
        </>)
    }
}

const mapStateToProps = state => ({
    articles: state.posts.collection,
});

const mapDispatchToProps = dispatch => ({
    userActions: bindActionCreators(userActions, dispatch),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Home));