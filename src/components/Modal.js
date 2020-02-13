import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter, Route } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import * as userActions from '../actions/user';
import * as modalActions from '../actions/modal';

class Modal extends React.Component {
    close() {
        this.props.closeAction.forEach(fn => {fn()});
    }

    render() {
        return (<>
            <div className="modal fade show" style={{ background: "rgba(0,0,0,.5)", display: "block", }} aria-modal="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Login</h5>
                            <button
                                type="button"
                                className="close"
                                onClick={() => { this.close()}}>
                                <span aria-hidden="true">×</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            {this.props.content}
                        </div>
                    </div>
                </div>
            </div>
        </>)
    }
}

Modal.propTypes = {
    closeAction: PropTypes.any,
    content: PropTypes.object,
    title: PropTypes.string,
}

const mapStateToProps = state => ({
    state,
});

const mapDispatchToProps = dispatch => ({
    userActions: bindActionCreators(userActions, dispatch),
    modalActions: bindActionCreators(modalActions, dispatch),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Modal));