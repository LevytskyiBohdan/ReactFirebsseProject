import {
    GET_POST,
    GET_POST_SUCCESS,
    GET_POST_FAILURE,
} from '../constants';

import { getById } from '../utils/firebaseDB';

const getPostAction = () => ({ type: GET_POST });
const getPostSuccessAction = response => ({ type: GET_POST_SUCCESS, payload: response });
const getPostErrorAction = err => ({ type: GET_POST_FAILURE, payload: err });

export function getPost(collection, id) {
    // return {type: "Post>>>"}
    return dispatch => {
        dispatch(getPostAction());
        return getById(collection, id)
        .then(response => {
            dispatch(getPostSuccessAction(response));
        }).catch(err => {
            dispatch(getPostErrorAction(err));
        });

    }
}
