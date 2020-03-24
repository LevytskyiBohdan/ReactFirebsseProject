import React from 'react';
import ReactDOM from 'react-dom';
import { act } from 'react-dom/test-utils';
import SinginForm from '../components/SigninForm';
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
        user: {
            error: "Some error>>>",
            currentUser: {},
        },
        fileUpload: {
            chosenFiles: [],
        }
    }

    const store = mockStore(mockData);

    store.dispatch = jest.fn();

    act(() => {
        ReactDOM.render(
            <Provider store={store}>
                <BrowserRouter>
                    <SinginForm />
                </BrowserRouter>
            </Provider>
            , container);
    });
    const error = container.querySelector('.alert.alert-danger');
    const inputs = container.querySelectorAll('input');
    const button = container.querySelector('button');

    expect(error).not.toBeNull();
    expect(inputs).not.toBeNull();
    expect(inputs).toHaveLength(2);
    expect(button).not.toBeNull();

});

it('render with add user name', () => {
    const mockStore = configureStore();
    const mockData = {
        user: {
            error: "Some error>>>",
            currentUser: {
                displayName: "Some name >>>>"
            },
        },
        fileUpload: {
            chosenFiles: [],
        }
    }

    const store = mockStore(mockData);

    store.dispatch = jest.fn();

    act(() => {
        ReactDOM.render(
            <Provider store={store}>
                <BrowserRouter>
                    <SinginForm />
                </BrowserRouter>
            </Provider>
            , container);
    });

    expect(store.dispatch).toHaveBeenCalledTimes(2);

});
