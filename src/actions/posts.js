import {
    GET_POSTS,
    GET_POSTS_SUCCESS,
    GET_POSTS_FAILURE,
} from '../constants';

import { getCollection, } from '../utils/firebaseDB';

const getDataAction = () => ({ type: GET_POSTS });
const getDataSuccessAction = response => ({ type: GET_POSTS_SUCCESS, payload: response });
const getDataErrorAction = err => ({ type: GET_POSTS_FAILURE, payload: err });

export function getPosts(data) {
    return dispatch => {
        dispatch(getDataAction());
        getCollection(data)
        .then(response => {
            dispatch(getDataSuccessAction(response));
        }).catch(err => {
            dispatch(getDataErrorAction(err));
        });

    }
}

