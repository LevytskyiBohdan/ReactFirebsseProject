import React from 'react';
import ReactDOM from 'react-dom';
import { act } from 'react-dom/test-utils';
import LoginForm from '../components/LoginForm';
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
            currentUser: {}
        },
    }

    const store = mockStore(mockData);

    store.dispatch = jest.fn();

    act(() => {
        ReactDOM.render(
            <Provider store={store}>
                <BrowserRouter>
                    <LoginForm />
                </BrowserRouter>
            </Provider>
            , container);
    });

    const error = container.querySelector('.alert.alert-danger');
    const emailInput = container.querySelector('#email');
    const passwordInput = container.querySelector('#password');
    const button = container.querySelector('button');

    expect(error).not.toBeNull();
    expect(error.textContent).toBe(mockData.user.error);
    expect(emailInput).not.toBeNull();
    expect(passwordInput).not.toBeNull();

    act(() => {
        button.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    });

    expect(store.dispatch).toHaveBeenCalledTimes(1);

});
