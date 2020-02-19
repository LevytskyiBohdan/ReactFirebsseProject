import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter, Route } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import * as modalActions from '../actions/modal';
import ErrorMessage from './ErrorMessage';

class LoginForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            isSubmitting: false,
            invalidsinput: []
        }

        this.inputsToValidate = ['email', 'password'];
    }

    validate(field) {
        let isValid = true;
        const invalidsinput = [];

        this.inputsToValidate.forEach(input => {
            let isInputValid = true;

            isInputValid = this.state[input] && this.state[input] !== null && this.state[input].trim() !== '';

            if (!isInputValid) {
                invalidsinput.push(input);
                isValid = false;
            }
        });

        this.setState({
            invalidsinput,
        });

        return isValid;
    }

    isValidInput(name) {
        return this.state.invalidsinput.indexOf(name) !== -1;
    }

    componentDidUpdate(prevProps) {
        if (this.props.user.currentUser !== prevProps.user.currentUser) {
            this.props.modalActions.hideModal();
        }

        if (this.props.user.error && this.props.user.error !== prevProps.user.error) {
            this.setState({
                isSubmitting: false,
            })
        }
    }

    onSubmit() {
        if (this.state.isSubmitting || !this.validate()) return null;

        this.setState({
            isSubmitting: true,
        })

        this.props.confirmAction({ email: this.state.email, password: this.state.password })
    }

    render() {
        return (<>
            <form>
                <ErrorMessage 
                    error={this.props.user.error}
                />
                <div className="form-group">
                    <label htmlFor="email">Email address</label>
                    <input
                        type="email"
                        className={`form-control ${this.isValidInput('email') ? "is-invalid" : ""}`}
                        id="email"
                        onChange={evt => {
                            this.setState({ email: evt.target.value });
                        }}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        className={`form-control ${this.isValidInput('password') ? "is-invalid" : ""}`}
                        id="password"
                        onChange={evt => {
                            this.setState({ password: evt.target.value })
                        }}
                    />
                </div>
                <button
                    type="button"
                    className="btn btn-block btn-primary"
                    onClick={() => { this.onSubmit() }}
                    disabled={this.state.isSubmitting}
                >Login</button>
            </form>
        </>)
    }
}

LoginForm.propTypes = {
    confirmAction: PropTypes.any,
}

const mapStateToProps = state => ({
    user: state.user,
});

const mapDispatchToProps = dispatch => ({
    modalActions: bindActionCreators(modalActions, dispatch),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(LoginForm));