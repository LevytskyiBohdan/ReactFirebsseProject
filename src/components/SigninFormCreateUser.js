import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import * as userActions from '../actions/user';

const SigninFormCreateUser = ({ user, userActions }) => {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [rePassword, setRePassword] = React.useState('');
    const [isSubmitting, setIsSubmitting] = React.useState(false);
    const [isInvalidInputs, setIsInvalidInputs] = React.useState([]);

    const inputsToValidate = { email, password, rePassword };

    React.useEffect(() => {
        if (user.error) setIsSubmitting(false)
    }, [user.error])
    
    function isValidInput(name) {
        return isInvalidInputs.indexOf(name) !== -1;
    }

    function validate() {
        let isValid = true;
        const invalidsinput = [];

        for(let key in inputsToValidate) {
            let isInputValid = true;

            const input  = inputsToValidate[key];

            if (String(key) === 'rePassword') {
                isInputValid = input && input !== null && input.trim() !== '' && password === input;
            }
            else {
                isInputValid = input && input !== null && input.trim() !== '';
            }
    
            if (!isInputValid) {
                invalidsinput.push(String(key));
                isValid = false;
            }

        }

        setIsInvalidInputs(invalidsinput)

        return isValid;
    }

    function onSubmit() {
        if (isSubmitting || !validate()) return null;

        setIsSubmitting(true);

        userActions.createUser(email, password)
    }

    return (!user.currentUser &&
        <>
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
                <div className="form-group">
                    <label htmlFor="re-password">Re-Password</label>
                    <input
                        type="password"
                        className={`form-control ${isValidInput('rePassword') ? "is-invalid" : ""}`}
                        id="re-password"
                        onChange={evt => {
                            setRePassword(evt.target.value);
                        }}
                    />
                </div>

                <div className="form-group">
                    <button
                        type="button"
                        className="btn btn-block btn-primary"
                        onClick={() => { onSubmit() }}
                        disabled={isSubmitting}
                    >Singin</button>
                </div>
            </>
    ) || null;
}


const mapStateToProps = state => ({
    user: state.user,
});

const mapDispatchToProps = dispatch => ({
    userActions: bindActionCreators(userActions, dispatch),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SigninFormCreateUser));