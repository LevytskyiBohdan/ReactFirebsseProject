import React from 'react';
import ReactDOM from 'react-dom';
import { act } from 'react-dom/test-utils';
import FileUploader from '../components/FileUploader';
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
        }
    }

    const store = mockStore(mockData);

    act(() => {
        ReactDOM.render(
            <Provider store={store}>
                <BrowserRouter>
                    <FileUploader />
                </BrowserRouter>
                </Provider>
            , container);
    });

    const input = container.querySelector('input');
    const label = container.querySelector('.custom-file-label');
    const allImg = container.querySelectorAll('img');
    
    expect(container).not.toBeNull();
    
    expect(input).not.toBeNull();
    expect(input.nodeName).toBe('INPUT');
    expect(input.getAttribute('type')).toBe('file');

    expect(label).not.toBeNull();
    
    mockData.fileUpload.chosenFiles.forEach((element, idx) => {
        expect(allImg[idx].getAttribute('src')).toBe(String(element));

    })
});
