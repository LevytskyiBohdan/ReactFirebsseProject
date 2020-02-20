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
    LIKE_COUNT,
    LIKE_COUNT_SUCCESS,
    LIKE_COUNT_FAILURE,
    DELETE_POST,
    DELETE_POST_SUCCESS,
    DELETE_POST_FAILURE,
    CLEAR_ALL_ERROR,
} from '../constants';

import { editById, createDocument, deleteById, getCollectionWithQuery } from '../utils/firebaseDB';

const getPostsAction = () => ({ type: GET_POSTS });
const getPostsSuccessAction = response => ({ type: GET_POSTS_SUCCESS, payload: response });
const getPostsErrorAction = err => ({ type: GET_POSTS_FAILURE, payload: err });

export function getPosts(collection, query) {
    return dispatch => {
        dispatch(getPostsAction());
        getCollectionWithQuery(collection, query)
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

export function createPost(data) {
    return dispatch => {
        dispatch(createPostAction());
        createDocument(data)
        .then(response => {
            dispatch(createPostSuccessAction(response));
        }).catch(err => {
            dispatch(createPostErrorAction(err));
        });

    }
}

const editPostAction = () => ({ type: EDIT_POST });
const editPostSuccessAction = response => ({ type: EDIT_POST_SUCCESS, payload: response });
const editPostErrorAction = err => ({ type: EDIT_POST_FAILURE, payload: err });

export function editPost(data) {
    return dispatch => {
        dispatch(editPostAction());
        editById(data)
        .then(response => {
            dispatch(editPostSuccessAction(response));
        }).catch(err => {
            dispatch(editPostErrorAction(err));
        });

    }
}

const deletePostAction = () => ({ type: DELETE_POST });
const deletePostSuccessAction = response => ({ type: DELETE_POST_SUCCESS, payload: response });
const deletePostErrorAction = err => ({ type: DELETE_POST_FAILURE, payload: err });

export function deletePost(data) {
    return dispatch => {
        dispatch(deletePostAction());
        deleteById(data)
        .then(response => {
            dispatch(deletePostSuccessAction(response));
        }).catch(err => {
            dispatch(deletePostErrorAction(err));
        });

    }
}

const likeCountAction = () => ({ type: LIKE_COUNT });
const likeCountSuccessAction = response => ({ type: LIKE_COUNT_SUCCESS, payload: response });
const likeCountErrorAction = err => ({ type: LIKE_COUNT_FAILURE, payload: err });

export function likeCount(data) {
    return dispatch => {
        dispatch(likeCountAction());
        editById(data)
        .then(response => {
            dispatch(likeCountSuccessAction(response));
        }).catch(err => {
            dispatch(likeCountErrorAction(err));
        });

    }
}

