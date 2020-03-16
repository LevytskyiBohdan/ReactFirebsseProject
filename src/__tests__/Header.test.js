import React from 'react';
import ReactDOM from 'react-dom';
import { act } from 'react-dom/test-utils';
import Header from '../components/Header';
import { Provider } from 'react-redux';
import { BrowserRouter } from "react-router-dom";
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

let container;

beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
});

afterEach(() => {
    document.body.removeChild(container);
    container = null;
});

it('without user', () => {
    const mockStore = configureStore([thunk]);

    const mockData = {
        user: {
            isLoading: false,
            isLoaded: true,
            error: null,
            currentUser: null,
        }
    }

    const store = mockStore(mockData)

    act(() => {
        ReactDOM.render(
            <Provider store={store}>
                <BrowserRouter>
                    <Header />
                </BrowserRouter>
            </Provider>
            , container);
    });

    const expectedElements = ['Home', 'About', 'Login', 'Signin']
    const elements = container.querySelectorAll('.nav-item');

    expect(container).not.toBeNull();

    elements.forEach((item, idx) => {
        expect(item.textContent).toBe(expectedElements[idx])
    })
});

it('with user', () => {
    const mockStore = configureStore([thunk]);

    const mockData = {
        user: {
            isLoading: false,
            isLoaded: true,
            error: null,
            currentUser: {
                uid: "GjLq3MQjI1eF1KJymeuema1lxNv2",
                displayName: "Admin3",
                photoURL: "https://firebasestorage.googleapis.com/v0/b/react-firebase-project-f71c4.appspot.com/o/usersUploadedFiles%2FGjLq3MQjI1eF1KJymeuema1lxNv2%2Fhhe2h7ijrru?alt=media&token=3fe286c2-38c3-4ffb-a470-1ed8b84704e6",
                email: "admin@gmail.com",
            }
        }
    }

    const store = mockStore(mockData)

    act(() => {
        ReactDOM.render(
            <Provider store={store}>
                <BrowserRouter>
                    <Header />
                </BrowserRouter>
            </Provider>
            , container);
    });

    const expectedElements = ['Home', 'About', 'Logout']
    const elements = container.querySelectorAll('.nav-item');
    const img = container.querySelector('img.img-thumbnail')



    expect(container).not.toBeNull();

    elements.forEach((item, idx) => {
        expect(item.textContent).toBe(expectedElements[idx])
    })

    expect(img).not.toBeNull();

    expect(img.getAttribute('src')).toBe(mockData.user.currentUser.photoURL);

    //   const button = container.querySelector('button');
    //   const label = container.querySelector('p');
    //   expect(label.textContent).toBe('You clicked 0 times');
    //   expect(document.title).toBe('You clicked 0 times');

    //   // Test second render and componentDidUpdate
    //   act(() => {
    //     button.dispatchEvent(new MouseEvent('click', {bubbles: true}));
    //   });
    //   expect(label.textContent).toBe('You clicked 1 times');
    //   expect(document.title).toBe('You clicked 1 times');
});