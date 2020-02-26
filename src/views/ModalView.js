import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as modalActions from '../actions/modal';

const ModalView = ({ modal, modalActions }) => {
  if (modal.length !== 0) {
    return (
      <>
        <div className="modal fade show" style={{ background: "rgba(0,0,0,.5)", display: "block", }} aria-modal="true">
          <div className="modal-dialog modal-lg">

            {modal.map((popap, idx) => (
              <div key={idx} className="modal-content"
                style={{display: `${idx===modal.length-1 ? 'block' : 'none'}`}}
              >
                <div className="modal-header">
                  <button
                    type="button"
                    className="close"
                    onClick={() => { 
                      modalActions.clearError()
                      modalActions.hideModal()
                    }}>
                    <span aria-hidden="true">×</span>
                  </button>
                </div>
                <div className="modal-body">
                  { popap }
                </div>
              </div>
            ))}
          </div>
        </div>
      </>
    );
  }
  return null;
}

const mapStateToProps = state => ({
  modal: state.modal,
});

const mapDispatchToProps = dispatch => ({
  modalActions: bindActionCreators(modalActions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(ModalView)