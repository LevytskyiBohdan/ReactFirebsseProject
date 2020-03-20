import React from 'react';
import ReactDOM from 'react-dom';
import { act } from 'react-dom/test-utils';
import FileUploadForm from '../components/FileUploadForm';
import { Provider } from 'react-redux';
import { BrowserRouter } from "react-router-dom";
import configureStore from 'redux-mock-store';


let container;

beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
});

afterEach(() => {
    document.body.removeChild(container);
    container = null;
});

it('base render', () => {
    const mockStore = configureStore();

    
    const mockData = {
        fileUpload: {
            chosenFiles: [1,2,3],
            filesURI: [4,5,6,7]
        },
        user: {
            currentUser: {
                uid: "User_UID>>>"
            }
        },
    }
    
    const store = mockStore(mockData);
    
    store.dispatch = jest.fn();

    act(() => {
        ReactDOM.render(
            <Provider store={store}>
                <BrowserRouter>
                    <FileUploadForm />
                </BrowserRouter>
                </Provider>
            , container);
    });

    const allFormGroup = container.querySelectorAll('.form-group');
    const input = container.querySelector('input');
    const button = container.querySelector('button');

    const imgFileURI = allFormGroup[0].querySelectorAll('img');
    const imgChosenFile = allFormGroup[1].querySelectorAll('img');

    expect(store.dispatch).toHaveBeenCalledTimes(1);

    expect(container).not.toBeNull();
    expect(input).not.toBeNull();
    expect(input.getAttribute('class')).toBe('custom-file-input');

    expect(allFormGroup).toHaveLength(3)

    mockData.fileUpload.filesURI.forEach((item, idx) => {
        expect(imgFileURI[idx].getAttribute('src')).toBe(String(item))
    })

    mockData.fileUpload.chosenFiles.forEach((item, idx) => {
        expect(imgChosenFile[idx].getAttribute('src')).toBe(String(item))
    })

    act(() => {
        button.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    });

    expect(store.dispatch).toHaveBeenCalledTimes(3);

});
