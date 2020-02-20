import {
    FILE_UPLOAD,
    FILE_UPLOAD_SUCCESS,
    FILE_UPLOAD_FAILURE,
    CLEAR_FILE_UPLOADER,
    DELETE_FILE_FROM_UPLOADED,
    CLEAR_ALL_ERROR,
} from '../constants';

import { firebaseFileUpload } from '../utils/firebaseStorage';

const fileUploadAction = () => ({ type: FILE_UPLOAD });
const fileUploadSuccessAction = response => ({ type: FILE_UPLOAD_SUCCESS, payload: response });
const fileUploadErrorAction = err => ({ type: FILE_UPLOAD_FAILURE, payload: err });

export function fileUpload(files, path) {
    return dispatch => {
        dispatch(fileUploadAction());
        firebaseFileUpload(files, path)
        .then(response => {
            dispatch(fileUploadSuccessAction(response));
        }).catch(err => {
            dispatch(fileUploadErrorAction(err));
        });

    }
}

export const clearFileUploader = () => ({ type: CLEAR_FILE_UPLOADER });

export const deleteFileFromUploaded = idx => ({ type: DELETE_FILE_FROM_UPLOADED, payload: idx });

