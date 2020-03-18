import {
    GET_USERS,
    GET_USERS_SUCCESS,
    GET_USERS_FAILURE,
} from '../constants';

const getUsersAction = () => ({ type: GET_USERS });
const getUsersSuccess = response => ({ type: GET_USERS_SUCCESS, payload: response });
const getUsersError = err => ({ type: GET_USERS_FAILURE, payload: err });

export function getUsers() {


    return dispatch => {
        dispatch(getUsersAction());
        return fetch('https://us-central1-react-firebase-project-f71c4.cloudfunctions.net/api')
            .then((response) => response.json())
            .then(response => {
                dispatch(getUsersSuccess(response));
            }).catch(err => {
                dispatch(getUsersError(err));
            });

    }
}