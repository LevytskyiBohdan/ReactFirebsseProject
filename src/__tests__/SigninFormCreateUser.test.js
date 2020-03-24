import React from 'react';
import ReactDOM from 'react-dom';
import { act, Simulate } from 'react-dom/test-utils';
import SigninFormCreateUser from '../components/SigninFormCreateUser';
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
            error: null,
            currentUser: null,
        },
    }

    const store = mockStore(mockData);

    store.dispatch = jest.fn();

    act(() => {
        ReactDOM.render(
            <Provider store={store}>
                <BrowserRouter>
                    <SigninFormCreateUser />
                </BrowserRouter>
            </Provider>
            , container);
    });
    console.log(container.innerHTML)

    const labels = container.querySelectorAll('label');
    const email = container.querySelector('input[type="email"]')
    const password = container.querySelector('input[id="password"]')
    const rePassword = container.querySelector('input[id="re-password"]')
    const inputs = container.querySelectorAll('input');
    const button = container.querySelector('button');

    expect(labels).not.toBeNull();
    expect(labels).toHaveLength(3)
    expect(inputs).not.toBeNull();
    expect(inputs).toHaveLength(3)
    expect(button).not.toBeNull();

    email.value = "email@email.com";
    password.value = "password";
    rePassword.value = "password";

    Simulate.change(email);
    Simulate.change(password);
    Simulate.change(rePassword);

    act(() => {
        button.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    });

    expect(store.dispatch).toHaveBeenCalledTimes(1);
});
