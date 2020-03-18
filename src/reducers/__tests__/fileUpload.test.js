
import reducer, { initialState } from '../fileUpload';
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
} from '../../constants';

describe('post reducer', () => {
    it('should return the initial state', () => {
        expect(reducer(undefined, {})).toEqual(initialState);
    });

    it('should handle FILE_UPLOAD', () => {
        const startAction = {
            type: FILE_UPLOAD,
        };

        expect(reducer({}, startAction)).toEqual({
            isLoading: true,
            isLoaded: false,
            error: null,
        })
    });

    it('should handle FILE_UPLOAD_SUCCESS', () => {
        const startAction = {
            type: FILE_UPLOAD_SUCCESS,
            payload: ['Some payload>>>']
        };

        expect(reducer({}, startAction)).toEqual({
            newFiles: startAction.payload,
            isLoading: false,
            isLoaded: true,
        })
    });

    it('should handle FILE_UPLOAD_FAILURE', () => {
        const startAction = {
            type: FILE_UPLOAD_FAILURE,
            payload: ['Some payload>>>']
        };

        expect(reducer({}, startAction)).toEqual({
            isLoading: false,
            error: startAction.payload,
        })
    });

    it('should handle GET_UPLOADED_FILES', () => {
        const startAction = {
            type: GET_UPLOADED_FILES,
        };

        expect(reducer({}, startAction)).toEqual({
            isLoading: true,
            isLoaded: false,
            error: null,
        })
    });

    it('should handle GET_UPLOADED_FILES_SUCCESS', () => {
        const startAction = {
            type: GET_UPLOADED_FILES_SUCCESS,
            payload: ['Some payload>>>']
        };

        expect(reducer({}, startAction)).toEqual({
            filesURI: startAction.payload,
            isLoading: false,
            isLoaded: true,
        })
    });

    it('should handle GET_UPLOADED_FILES_FAILURE', () => {
        const startAction = {
            type: GET_UPLOADED_FILES_FAILURE,
            payload: ['Some payload>>>']
        };

        expect(reducer({}, startAction)).toEqual({
            isLoading: false,
            error: startAction.payload,
        })
    });

    it('should handle SET_CHOSEN_FILES', () => {
        const startAction = {
            type: SET_CHOSEN_FILES,
            payload: ['Some payload>>>']
        };

        expect(reducer({}, startAction)).toEqual({
            chosenFiles: startAction.payload,
        })
    });

    it('should handle CLEAR_ALL_ERROR', () => {
        const startAction = {
            type: CLEAR_ALL_ERROR,
        };

        expect(reducer({}, startAction)).toEqual({
            error: null,
        })
    });

    it('should handle CLEAR_FILE_UPLOADER', () => {
        const startAction = {
            type: CLEAR_FILE_UPLOADER,
        };

        expect(reducer({}, startAction)).toEqual({
            isLoading: false,
            isLoaded: false,
            error: null,
            filesURI: null,
            chosenFiles: null,
        })
    });
});