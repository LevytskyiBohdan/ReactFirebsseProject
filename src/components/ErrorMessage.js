import React from 'react';
import PropTypes from 'prop-types';

class ErrorMessage extends React.Component {
    render() {
        const error = this.props.error;
        console.log(!!error)
        return (error && error !== "GET_USER_FAILURE" &&
        <>
            <div className="alert alert-danger" role="alert">
                {(error.errorCode || error.errorMessage) ? 
                (<>
                    <p>{error.errorCode}</p>
                    <p>{error.errorMessage}</p>
                </>) : 
                (<p>
                    {error}
                </p>)
                }
            </div>
        </>) || null;
    }
}

ErrorMessage.propTypes = {
    error: PropTypes.any,
}


export default ErrorMessage;