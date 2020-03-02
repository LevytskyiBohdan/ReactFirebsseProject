import React from 'react';

const ConfirmDelete = props => {
    return (
        <form>
            <div className="form-group">
                <h6 className="mb-3">Do you want delete this one?</h6>
                <button
                    type="button"
                    className="btn btn-block btn-danger"
                    onClick={ props.action }
                >Delete</button>
            </div>
        </form>
    )
}

export default ConfirmDelete;