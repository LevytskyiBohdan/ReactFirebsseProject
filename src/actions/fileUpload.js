import {
    FILE_UPLOAD,
    FILE_UPLOAD_SUCCESS,
    FILE_UPLOAD_FAILURE,
    CLEAR_FILE_UPLOADER,
    GET_UPLOADED_FILES,
    GET_UPLOADED_FILES_SUCCESS,
    GET_UPLOADED_FILES_FAILURE,
    SET_CHOSEN_FILES
} from '../constants';

import { firebaseFileUpload, firebaseGetUploadedFiles } from '../utils/firebaseStorage';

const fileUploadAction = () => ({ type: FILE_UPLOAD });
const fileUploadSuccessAction = response => ({ type: FILE_UPLOAD_SUCCESS, payload: response });
const fileUploadErrorAction = err => ({ type: FILE_UPLOAD_FAILURE, payload: err });

export function fileUpload(files, path) {
    return dispatch => {
        dispatch(fileUploadAction());
        return firebaseFileUpload(files, path)
            .then(response => {
                dispatch(fileUploadSuccessAction(response));
            }).catch(err => {
                dispatch(fileUploadErrorAction(err));
            });

    }
}

const getUploadedFilesAction = () => ({ type: GET_UPLOADED_FILES });
const getUploadedFilesSuccessAction = response => ({ type: GET_UPLOADED_FILES_SUCCESS, payload: response });
const getUploadedFilesErrorAction = err => ({ type: GET_UPLOADED_FILES_FAILURE, payload: err });

export function getUploadedFiles(userUid) {
    return dispatch => {
        dispatch(getUploadedFilesAction());
        return firebaseGetUploadedFiles(`usersUploadedFiles/${userUid}`)
            .then(response => {
                dispatch(getUploadedFilesSuccessAction(response));
            }).catch(err => {
                dispatch(getUploadedFilesErrorAction(err));
            });

    }
}

export const setChosenFiles = response => ({ type: SET_CHOSEN_FILES, payload: response });

export const clearFileUploader = () => ({ type: CLEAR_FILE_UPLOADER });
