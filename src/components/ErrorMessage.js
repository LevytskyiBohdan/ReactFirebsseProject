import React from 'react';

const ErrorMessage = ({ error }) => {
    return (
        error &&
            <div className="alert alert-danger" role="alert">
                {(error.errorCode || error.errorMessage) ? 
                (<>
                    <p>{error.errorCode}</p>
                    <p>{error.errorMessage}</p>
                </>) : 
                (<p>
                    {String(error)}
                </p>)
                }
            </div>
    ) || null;
}

export default ErrorMessage;