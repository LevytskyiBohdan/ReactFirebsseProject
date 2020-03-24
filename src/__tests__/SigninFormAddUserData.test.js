import React from 'react';
import ReactDOM from 'react-dom';
import { act, Simulate } from 'react-dom/test-utils';
import SigninFormAddUserData from '../components/SigninFormAddUserData';
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
            chosenFiles: ['1', '2'],
        }
    }

    const store = mockStore(mockData);

    store.dispatch = jest.fn();

    act(() => {
        ReactDOM.render(
            <Provider store={store}>
                <BrowserRouter>
                    <SigninFormAddUserData />
                </BrowserRouter>
            </Provider>
            , container);
    });
    console.log(container.innerHTML)

    const labels = container.querySelectorAll('label');
    const name = container.querySelector('input[type="text"]')
    const inputs = container.querySelectorAll('input');
    const button = container.querySelector('button');

    expect(labels).not.toBeNull();
    expect(labels).toHaveLength(2)
    expect(inputs).not.toBeNull();
    expect(inputs).toHaveLength(2)
    expect(button).not.toBeNull();

    name.value = "Some value>>>"
    Simulate.change(name);

    act(() => {
        button.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    });

    expect(store.dispatch).toHaveBeenCalledTimes(1);
});
