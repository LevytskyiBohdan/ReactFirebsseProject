import {
    FILE_UPLOAD,
    FILE_UPLOAD_SUCCESS,
    FILE_UPLOAD_FAILURE,
    CLEAR_FILE_UPLOADER,
    CLEAR_ALL_ERROR,
    GET_UPLOADED_FILES,
    GET_UPLOADED_FILES_SUCCESS,
    GET_UPLOADED_FILES_FAILURE,
    SET_CHOSEN_FILES
} from '../constants';

import createReducer from '../utils/createReducer';

export const initialState = {
    isLoading: false,
    isLoaded: false,
    error: null,
    newFiles: null,
    filesURI: null,
    chosenFiles: null,
};

export default createReducer(initialState, {
    [FILE_UPLOAD]: state => {
        return { ...state, isLoading: true, isLoaded: false, error: null, };
    },
    [FILE_UPLOAD_SUCCESS]: (state, payload) => {
        return { ...state, newFiles: payload, isLoading: false, isLoaded: true,  };
    },
    [FILE_UPLOAD_FAILURE]: (state, err) => {
        return { ...state, isLoading: false, error: err, };
    },
    [GET_UPLOADED_FILES]: state => {
        return { ...state, isLoading: true, isLoaded: false, error: null, };
    },
    [GET_UPLOADED_FILES_SUCCESS]: (state, payload) => {
        return { ...state, filesURI: payload, isLoading: false, isLoaded: true, };
    },
    [GET_UPLOADED_FILES_FAILURE]: (state, err) => {
        return { ...state, isLoading: false, error: err, };
    },
    [SET_CHOSEN_FILES]: (state, payload) => {
        return { ...state, chosenFiles: payload };
    },
    [CLEAR_FILE_UPLOADER]: (state) => {
        return { ...state, isLoading: false, isLoaded: false, error: null, filesURI: null, chosenFiles: null, };
    },
    [CLEAR_ALL_ERROR]: (state) => {
        return { ...state, error: null, };
    },
});
