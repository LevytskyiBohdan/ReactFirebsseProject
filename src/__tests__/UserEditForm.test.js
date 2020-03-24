import React from 'react';
import ReactDOM from 'react-dom';
import { act, Simulate } from 'react-dom/test-utils';
import UserEditForm from '../components/UserEditForm';
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
            currentUser: {
                uid: 'test_uid',
            },
        },
        fileUpload: {
            chosenFiles: [1],
        }
    }

    const store = mockStore(mockData);

    store.dispatch = jest.fn();

    act(() => {
        ReactDOM.render(
            <Provider store={store}>
                <BrowserRouter>
                    <UserEditForm />
                </BrowserRouter>
            </Provider>
            , container);
    });

    const label = container.querySelector('.form-group label')
    const input = container.querySelectorAll('input[id="name"]');
    const button = container.querySelector('button');

    expect(label).not.toBeNull();
    expect(input).not.toBeNull();
    expect(button).not.toBeNull();

    expect(store.dispatch).toHaveBeenCalledTimes(2);


});

it('render with add user name', () => {
    const mockStore = configureStore();
    const mockData = {
        user: {
            error: "Some error>>>",
            currentUser: {
                uid: 'test_uid',
            },
        },
        fileUpload: {
            chosenFiles: [1],
        }
    }

    const store = mockStore(mockData);

    store.dispatch = jest.fn();

    act(() => {
        ReactDOM.render(
            <Provider store={store}>
                <BrowserRouter>
                    <UserEditForm />
                </BrowserRouter>
            </Provider>
            , container);
    });

    const input = container.querySelectorAll('input[id="name"]');
    const button = container.querySelector('button');

    input.value = "test_name";

    Simulate.change(input);

    act(() => {
        button.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    });

    expect(store.dispatch).toHaveBeenCalledTimes(5);
});
