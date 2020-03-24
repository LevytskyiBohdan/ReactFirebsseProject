import React from 'react';
import ReactDOM from 'react-dom';
import { act, Simulate } from 'react-dom/test-utils';
import UserPageCreatePost from '../components/UserPageCreatePost';
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
                uid: 'test_uid',
            },
        },
        fileUpload: {
            chosenFiles: [1],
        },
        posts: {
            collection: [],
        }
    }

    const store = mockStore(mockData);

    store.dispatch = jest.fn();

    act(() => {
        ReactDOM.render(
            <Provider store={store}>
                <BrowserRouter>
                    <UserPageCreatePost />
                </BrowserRouter>
            </Provider>
            , container);
    });

    const inputs = container.querySelectorAll('input');
    const labels = container.querySelectorAll('label');
    const button = container.querySelector('button');

    expect(inputs).not.toBeNull();
    expect(inputs).toHaveLength(3);
    expect(labels).not.toBeNull();
    expect(labels).toHaveLength(4);
    expect(button).not.toBeNull();

    expect(store.dispatch).toHaveBeenCalledTimes(0);
});

it('submit form', () => {
    const mockStore = configureStore();
    const mockData = {
        user: {
            error: null,
            currentUser: {
                uid: 'test_uid',
            },
        },
        fileUpload: {
            chosenFiles: [1],
        },
        posts: {
            collection: [],
        }
    }

    const store = mockStore(mockData);

    store.dispatch = jest.fn();

    act(() => {
        ReactDOM.render(
            <Provider store={store}>
                <BrowserRouter>
                    <UserPageCreatePost />
                </BrowserRouter>
            </Provider>
            , container);
    });

    console.log(container.innerHTML)

    const title = container.querySelector('#title');
    const article = container.querySelector('#article');
    const publish = container.querySelector('#publish');
    const button = container.querySelector('button');

    expect(title).not.toBeNull();
    expect(article).not.toBeNull();
    expect(publish).not.toBeNull();
    expect(button).not.toBeNull();


    title.value = "Some value";
    article.value = "Some value";

    Simulate.change(title);
    Simulate.change(article);
    Simulate.click(publish);


    act(() => {
        button.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    });

    expect(store.dispatch).toHaveBeenCalledTimes(1);
});

it('render with currentStoreStatus CREATE_POST_SUCCESS', () => {
    const mockStore = configureStore();
    const mockData = {
        user: {
            error: null,
            currentUser: {
                uid: 'test_uid',
            },
        },
        fileUpload: {
            chosenFiles: [1],
        },
        posts: {
            collection: [],
        },
        currentStoreStatus: 'CREATE_POST_SUCCESS',
    }

    const store = mockStore(mockData);

    store.dispatch = jest.fn();

    act(() => {
        ReactDOM.render(
            <Provider store={store}>
                <BrowserRouter>
                    <UserPageCreatePost />
                </BrowserRouter>
            </Provider>
            , container);
    });

    
    const infoMessage = container.querySelector('.alert');

    expect(infoMessage.textContent).toBe('Post was created.');

    expect(store.dispatch).toHaveBeenCalledTimes(1);
});

it('render with currentStoreStatus CREATE_POST_FAILURE', () => {
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
        },
        posts: {
            collection: [],
        },
        currentStoreStatus: 'CREATE_POST_FAILURE',
    }

    const store = mockStore(mockData);

    store.dispatch = jest.fn();

    act(() => {
        ReactDOM.render(
            <Provider store={store}>
                <BrowserRouter>
                    <UserPageCreatePost />
                </BrowserRouter>
            </Provider>
            , container);
    });

    expect(store.dispatch).toHaveBeenCalledTimes(0);
});
