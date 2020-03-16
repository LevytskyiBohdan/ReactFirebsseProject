import React from 'react';
import ReactDOM from 'react-dom';
import { act } from 'react-dom/test-utils';
import ConfirmDeleteUser from '../components/ConfirmDeleteUser';
import { Provider } from 'react-redux';
import { BrowserRouter } from "react-router-dom";
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as userActions from '../actions/user';

// jest.mock('../actions/user');

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
    const mockStore = configureStore([thunk]);

    const mockData = {
        user: {
            error: null,
            currentUser: null,
        }
    }

    const store = mockStore(mockData)

    act(() => {
        ReactDOM.render(
            <Provider store={store}>
                <BrowserRouter>
                    <ConfirmDeleteUser />
                </BrowserRouter>
            </Provider>
            , container);
    });

    const expectedElements = ['Login', 'Password']
    const elements = container.querySelectorAll('.form-group>label');

    expect(container).not.toBeNull();
    expect(elements).not.toBeNull();

    elements.forEach((item, idx) => {
        expect(item.textContent).toBe(expectedElements[idx])
    })
});

it('with props', () => {
    const mockStore = configureStore();

    const mockData = {
        user: {
            error: "Custom error",
            currentUser: null,
        }
    }

    const store = mockStore(mockData);

    store.dispatch = jest.fn();
    // .mockImplementation(userActions.deleteUser())

    // const a = store.dispatch(0);
    act(() => {
        ReactDOM.render(
            <Provider store={store}>
                <BrowserRouter>
                    <ConfirmDeleteUser />
                </BrowserRouter>
            </Provider>
            , container);
    });

    const error = container.querySelector(".alert.alert-danger");

    const button = container.querySelector('button');

    act(() => {
        button.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    });

    expect(store.dispatch).toHaveBeenCalledTimes(1);

    expect(error).not.toBeNull();
    expect(error.textContent).toBe(mockData.user.error);
});