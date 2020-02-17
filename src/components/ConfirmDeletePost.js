import React from 'react';
import { connect } from 'react-redux';
import { withRouter, Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import * as postsActions from '../actions/posts';
import * as modalActions from '../actions/modal';

class ConfirmDeletePost extends React.Component {
    componentDidUpdate(nextProps, nextState) {
        if (nextProps.collection !== this.props.collection) {
            this.props.modalActions.hideModal();
        }
    }

    render() {
        return (
            <form>
                <div className="form-group">
                    <h6 className="mb-3">{this.props.title}</h6>
                    <button
                        type="button"
                        className="btn btn-block btn-danger"
                        onClick={ () => {
                            this.props.action(this.props.actionData)
                        }}
                    >{ this.props.button }</button>
                </div>
            </form>
        )
    }
}

ConfirmDeletePost.propTypes = {
    title: PropTypes.string,
    button: PropTypes.string,
    actionData: PropTypes.object,
    action: PropTypes.any,
}

const mapStateToProps = state => ({
    collection: state.posts.collection,
});

const mapDispatchToProps = dispatch => ({
    postsActions: bindActionCreators(postsActions, dispatch),
    modalActions: bindActionCreators(modalActions, dispatch),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ConfirmDeletePost));