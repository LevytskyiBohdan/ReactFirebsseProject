/* eslint-disable no-undef */
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import * as modalActions from '../actions/modal';
import * as userActions from '../actions/user';
import ErrorMessage from './ErrorMessage';

const LoginForm = ({ user, userActions, modalActions }) => {
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [isSubmitting, setIsSubmitting] = React.useState(false);
    const [isInvalidInputs, setIsInvalidInputs] = React.useState([]);

    const inputsToValidate = { email, password }

    
    React.useEffect(() => {
        if (user.currentUser) modalActions.hideModal();        
    }, [modalActions, user.currentUser])
    
    React.useEffect(() => {
        if (user.error) setIsSubmitting(false)
    }, [user.error])
    
    function onSubmit() {
        if (isSubmitting || !validate()) return null;
        setIsSubmitting(true);
        
        userActions.userLogin(email, password);
    }

    function isValidInput(name) {
        return isInvalidInputs.indexOf(name) !== -1;
    }
    
    function validate() {
        let isValid = true;
        const invalidsinput = [];
        
        for(let key in inputsToValidate){
            let isInputValid = true;
            const input = inputsToValidate[key];

            isInputValid = input && input !== null && input.trim() !== '';

            if (!isInputValid) {
                invalidsinput.push(String(key));
                isValid = false;
            }
        }

        setIsInvalidInputs(invalidsinput);

        return isValid;
    }

    return (
        <form>
            <ErrorMessage
                error={user.error}
            />
            <div className="form-group">
                <label htmlFor="email">Email address</label>
                <input
                    type="email"
                    className={`form-control ${isValidInput('email') ? "is-invalid" : ""}`}
                    id="email"
                    onChange={evt => {
                        setEmail(evt.target.value);
                    }}
                />
            </div>
            <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                    type="password"
                    className={`form-control ${isValidInput('password') ? "is-invalid" : ""}`}
                    id="password"
                    onChange={evt => {
                        setPassword(evt.target.value);
                    }}
                />
            </div>
            <button
                type="button"
                className="btn btn-block btn-primary"
                onClick={() => onSubmit()}
                disabled={isSubmitting}
            >Login</button>
        </form>
    );

}

LoginForm.propTypes = {
    confirmAction: PropTypes.any,
}

const mapStateToProps = state => ({
    user: state.user,
});

const mapDispatchToProps = dispatch => ({
    modalActions: bindActionCreators(modalActions, dispatch),
    userActions: bindActionCreators(userActions, dispatch),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(LoginForm));