import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as fileUpload from '../fileUpload';
import {
    FILE_UPLOAD,
    FILE_UPLOAD_SUCCESS,
    FILE_UPLOAD_FAILURE,
    CLEAR_FILE_UPLOADER,
    GET_UPLOADED_FILES,
    GET_UPLOADED_FILES_SUCCESS,
    GET_UPLOADED_FILES_FAILURE,
    SET_CHOSEN_FILES
} from '../../constants';

it('test fileUploadSuccess', () => {
    const file = new File([''], 'newFile.png');

    const mockStore = configureStore([thunk]);

    const store = mockStore({});

    return store.dispatch(fileUpload.fileUpload([file], 'usersUploadedFiles/test'))
        .then(() => {
            const actions = store.getActions();
            console.log(actions[1])
            expect(actions[0].type).toEqual(FILE_UPLOAD);
            expect(actions[1].type).toEqual(FILE_UPLOAD_SUCCESS);
        })
})

it('test fileUploadFailure', () => {
    const mockStore = configureStore([thunk]);

    const store = mockStore({});

    return store.dispatch(fileUpload.fileUpload())
        .then(() => {
            const actions = store.getActions();

            expect(actions[0].type).toEqual(FILE_UPLOAD);
            expect(actions[1].type).toEqual(FILE_UPLOAD_FAILURE);
        })
})

// getUploadedFiles tests
it('test getUploadedFilesSuccess', () => {
    const mockStore = configureStore([thunk]);

    const store = mockStore({});

    return store.dispatch(fileUpload.getUploadedFiles('test'))
        .then(() => {
            const actions = store.getActions();

            expect(actions[0].type).toEqual(GET_UPLOADED_FILES);
            expect(actions[1].type).toEqual(GET_UPLOADED_FILES_SUCCESS);
            expect(actions[1].payload.length > 0).toBeTruthy();
        })
})

it('test getUploadedFilesFailure', () => {
    const mockStore = configureStore([thunk]);

    const store = mockStore({});

    return store.dispatch(fileUpload.getUploadedFiles())
        .then(() => {
            const actions = store.getActions();

            expect(actions[0].type).toEqual(GET_UPLOADED_FILES);
            expect(actions[1].type).toEqual(GET_UPLOADED_FILES_FAILURE);
        })
})

// setChosenFiles tests

it('test setChosenFiles', () => {
    const mockStore = configureStore([]);
    const initialState = {}
    const store = mockStore(initialState)
    const testPayload = [1,2,3,4,5]

    store.dispatch(fileUpload.setChosenFiles(testPayload))

    const actions = store.getActions()

    expect(actions).toEqual([{ type: SET_CHOSEN_FILES, payload: testPayload }])

})

// clearFileUploader tests

it('test setChosenFiles', () => {
    const mockStore = configureStore([]);
    const initialState = {}
    const store = mockStore(initialState)

    store.dispatch(fileUpload.clearFileUploader())

    const actions = store.getActions()

    expect(actions).toEqual([{ type: CLEAR_FILE_UPLOADER }])

})
