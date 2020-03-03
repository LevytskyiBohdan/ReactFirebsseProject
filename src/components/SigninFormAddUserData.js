import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import * as userActions from '../actions/user';
import FileUploader from './FileUploader';

const SigninFormAddUserData = ({ user, chosenFiles, userActions }) => {
    const [name, setName] = React.useState('');

    const [isSubmitting, setIsSubmitting] = React.useState(false);
    const [isInvalidInputs, setIsInvalidInputs] = React.useState([]);

    const inputsToValidate = { name, chosenFiles };

    React.useEffect(() => {
        if (user.error) setIsSubmitting(false)
    }, [user.error])

    function isValidInput(name) {
        return isInvalidInputs.indexOf(name) !== -1;
    }

    function validate() {
        let isValid = true;
        const invalidsinput = [];

        for (let key in inputsToValidate) {
            let isInputValid = true;

            const input = inputsToValidate[key];

            if (String(key) === 'chosenFiles') {
                isInputValid = input && input !== null && input !== [];
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

        userActions.editUser(null, { displayName: name, photoURL: chosenFiles[0]});
    }

    return (user.currentUser &&
        <>
            <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                    type="text"
                    className={`form-control ${isValidInput('name') ? "is-invalid" : ""}`}
                    id="name"
                    onChange={evt => { setName(evt.target.value) }}
                />
            </div>
            <div className="form-group">
                <div className="custom-file mb-4" style={{boxShadow: isValidInput('chosenFiles') ? "0 0 0 1px red" : "none"}}>
                    <FileUploader />
                </div>
            </div>
            <div className="form-group">
                <button
                    type="button"
                    className="btn btn-block btn-primary"
                    onClick={() => { onSubmit() }}
                    disabled={ isSubmitting }
                >Finish</button>
            </div>
        </>
    ) || null;
}


const mapStateToProps = state => ({
    user: state.user,
    chosenFiles: state.fileUpload.chosenFiles,
});

const mapDispatchToProps = dispatch => ({
    userActions: bindActionCreators(userActions, dispatch),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SigninFormAddUserData));