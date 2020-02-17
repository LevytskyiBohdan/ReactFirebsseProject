import {
    FILE_UPLOAD,
    FILE_UPLOAD_SUCCESS,
    FILE_UPLOAD_FAILURE,
    CLEAR_FILE_UPLOADER,
    DELETE_FILE_FROM_UPLOADED
} from '../constants';

import createReducer from '../utils/createReducer';

export const initialState = {
    isLoading: false,
    isLoaded: false,
    error: null,
    filesURI: null,
    status: null,
};

export default createReducer(initialState, {
    [FILE_UPLOAD]: state => {
        return { ...state, isLoading: true, isLoaded: false, error: null, status: null, };
    },
    [FILE_UPLOAD_SUCCESS]: (state, payload) => {
        return { ...state, filesURI: [...payload], isLoading: false, isLoaded: true, status: FILE_UPLOAD_SUCCESS, };
    },
    [FILE_UPLOAD_FAILURE]: (state, err) => {
        return { ...state, isLoading: false, error: err, status: FILE_UPLOAD_FAILURE, };
    },
    [CLEAR_FILE_UPLOADER]: (state) => {
        return { ...state, isLoading: false, isLoaded: false, error: null, filesURI: null, status: null, };
    },
});
