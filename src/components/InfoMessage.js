import React from 'react';
import PropTypes from 'prop-types';

class InfoMessage extends React.Component {
    render() {
        const message = this.props.message;
        return (message &&
            <>
                <div className="alert alert-success" role="alert">
                    <p>{message}</p>
                </div>
            </>) || null;
    }
}

InfoMessage.propTypes = {
    message: PropTypes.any,
}


export default InfoMessage;