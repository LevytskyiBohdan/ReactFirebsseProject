import React from 'react';
import ReactDOM from 'react-dom';
import { act, Simulate } from 'react-dom/test-utils';
import UserPageMyInfo from '../components/UserPageMyInfo';
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
            currentUser: {
                uid: "GjLq3MQjI1eF1KJymeuema1lxNv2",
                displayName: "Admin3",
                photoURL: "https://firebasestorage.googleapis.com/v0/b/react-firebase-project-f71c4.appspot.com/o/usersUploadedFiles%2FGjLq3MQjI1eF1KJymeuema1lxNv2%2Fhhe2h7ijrru?alt=media&token=3fe286c2-38c3-4ffb-a470-1ed8b84704e6",
                email: "admin@gmail.com",
                metadata: {
                    lastSignInTime: "Tue, 24 Mar 2020 09:09:44 GMT",
                }
            },
        },
    }

    const store = mockStore(mockData);

    store.dispatch = jest.fn();

    act(() => {
        ReactDOM.render(
            <Provider store={store}>
                <BrowserRouter>
                    <UserPageMyInfo />
                </BrowserRouter>
            </Provider>
            , container);
    });

    const img = container.querySelector('img');
    const name = container.querySelector('h3');
    const lastSingIn = container.querySelector('h5 small');
    const buttons = container.querySelectorAll('button');

    expect(img).not.toBeNull();
    expect(name).not.toBeNull();
    expect(lastSingIn).not.toBeNull();
    expect(buttons).not.toBeNull();
    expect(buttons).toHaveLength(2);

    expect(store.dispatch).toHaveBeenCalledTimes(1);
});

it('render with user', () => {
    const mockStore = configureStore();
    const mockData = {
        user: {
            error: null,
            currentUser: {
                uid: "GjLq3MQjI1eF1KJymeuema1lxNv2",
                displayName: "Admin3",
                photoURL: "https://firebasestorage.googleapis.com/v0/b/react-firebase-project-f71c4.appspot.com/o/usersUploadedFiles%2FGjLq3MQjI1eF1KJymeuema1lxNv2%2Fhhe2h7ijrru?alt=media&token=3fe286c2-38c3-4ffb-a470-1ed8b84704e6",
                email: "admin@gmail.com",
                metadata: {
                    lastSignInTime: "Tue, 24 Mar 2020 09:09:44 GMT",
                }
            },
        },
    }

    const store = mockStore(mockData);

    store.dispatch = jest.fn();

    act(() => {
        ReactDOM.render(
            <Provider store={store}>
                <BrowserRouter>
                    <UserPageMyInfo />
                </BrowserRouter>
            </Provider>
            , container);
    });

    const img = container.querySelector('img');
    const name = container.querySelector('h3');
    const lastSingIn = container.querySelector('h5 small');
    const buttons = container.querySelectorAll('button');

    expect(img).not.toBeNull();
    expect(img.getAttribute('src')).toBe(mockData.user.currentUser.photoURL);
    expect(name).not.toBeNull();
    expect(name.textContent).toBe(mockData.user.currentUser.displayName);
    expect(lastSingIn).not.toBeNull();
    expect(lastSingIn.textContent).toBe(mockData.user.currentUser.metadata.lastSignInTime);
    expect(buttons).not.toBeNull();
    expect(buttons).toHaveLength(2);

    buttons.forEach(button => {
        act(() => {
            button.dispatchEvent(new MouseEvent('click', { bubbles: true }));
        });
    })

    expect(store.dispatch).toHaveBeenCalledTimes(3);
});

