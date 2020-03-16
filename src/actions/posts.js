import {
    GET_POSTS,
    GET_POSTS_SUCCESS,
    GET_POSTS_FAILURE,
    CREATE_POST,
    CREATE_POST_SUCCESS,
    CREATE_POST_FAILURE,
    EDIT_POST,
    EDIT_POST_SUCCESS,
    EDIT_POST_FAILURE,
    DELETE_POST,
    DELETE_POST_SUCCESS,
    DELETE_POST_FAILURE,
    RATING_COUNT,
    RATING_COUNT_SUCCESS,
    RATING_COUNT_FAILURE,
    GET_RATING,
    GET_RATING_SUCCESS,
    GET_RATING_FAILURE,
} from '../constants';

import { editById, createDocument, deleteById, getCollectionWithQuery, getCollection } from '../utils/firebaseDB';

const getPostsAction = () => ({ type: GET_POSTS });
const getPostsSuccessAction = response => ({ type: GET_POSTS_SUCCESS, payload: response });
const getPostsErrorAction = err => ({ type: GET_POSTS_FAILURE, payload: err });

export function getPosts(collection, query) {
    return dispatch => {
        dispatch(getPostsAction());
        return getCollectionWithQuery(collection, query)
        .then(response => {
            dispatch(getPostsSuccessAction(response));
        }).catch(err => {
            dispatch(getPostsErrorAction(err));
        });

    }
}

const createPostAction = () => ({ type: CREATE_POST });
const createPostSuccessAction = response => ({ type: CREATE_POST_SUCCESS, payload: response });
const createPostErrorAction = err => ({ type: CREATE_POST_FAILURE, payload: err });

export function createPost(collection, date) {
    return dispatch => {
        dispatch(createPostAction());
        return createDocument(collection, date)
        .then(() => {
            dispatch(createPostSuccessAction());
        }).catch(err => {
            dispatch(createPostErrorAction(err));
        });

    }
}

const editPostAction = () => ({ type: EDIT_POST });
const editPostSuccessAction = response => ({ type: EDIT_POST_SUCCESS, payload: response });
const editPostErrorAction = err => ({ type: EDIT_POST_FAILURE, payload: err });

export function editPost(collection, id, data) {
    return dispatch => {
        dispatch(editPostAction());
        return editById(collection, id, data)
        .then(() => {
            dispatch(editPostSuccessAction());
        }).catch(err => {
            dispatch(editPostErrorAction(err));
        });

    }
}

const deletePostAction = () => ({ type: DELETE_POST });
const deletePostSuccessAction = response => ({ type: DELETE_POST_SUCCESS, payload: response });
const deletePostErrorAction = err => ({ type: DELETE_POST_FAILURE, payload: err });

export function deletePost(collection, id) {
    return dispatch => {
        dispatch(deletePostAction());
        return deleteById(collection, id)
        .then(() => {
            dispatch(deletePostSuccessAction());
        }).catch(err => {
            dispatch(deletePostErrorAction(err));
        });

    }
}

const ratingCountAction = () => ({ type: RATING_COUNT });
const ratingCountSuccessAction = response => ({ type: RATING_COUNT_SUCCESS, payload: response });
const ratingCountErrorAction = err => ({ type: RATING_COUNT_FAILURE, payload: err });

export function ratingCount(id, data) {
    return dispatch => {
        dispatch(ratingCountAction());
        return editById('rating', id, data)
        .then(() => {
            dispatch(ratingCountSuccessAction());
        }).catch(err => {
            dispatch(ratingCountErrorAction(err));
        });

    }
}

const getRatingAction = () => ({ type: GET_RATING });
const getRatingSuccessAction = response => ({ type: GET_RATING_SUCCESS, payload: response });
const getRatingErrorAction = err => ({ type: GET_RATING_FAILURE, payload: err });

export function getRating() {
    return dispatch => {
        dispatch(getRatingAction());
        return getCollection('rating')
        .then(response => {
            dispatch(getRatingSuccessAction(response));
        }).catch(err => {
            dispatch(getRatingErrorAction(err));
        });

    }
}
