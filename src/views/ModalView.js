import React from 'react';
import { connect } from 'react-redux'

const ModalView = ({modal}) => {
if (modal.length !== 0) {
    return (
        <>
          {modal.map((popap, idx) => ({...popap, key: idx}))}
        </>
    );
  }
  return null;
}

const mapStateToProps = state => ({
  modal: state.modal,
});

export default connect(mapStateToProps)(ModalView)