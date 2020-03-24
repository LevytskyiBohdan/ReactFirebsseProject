import React from 'react';
import ReactDOM from 'react-dom';
import { act, Simulate } from 'react-dom/test-utils';
import UserPageEditPost from '../components/UserPageEditPost';
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
        post: {
            postById: {
                article: "dfssdfds111wqd",
                author: "Admin3",
                dislikes: {
                    count: 0,
                    users: [

                    ]
                },
                img: [
                    "https://firebasestorage.googleapis.com/v0/b/react-firebase-project-f71c4.appspot.com/o/usersUploadedFiles%2FGjLq3MQjI1eF1KJymeuema1lxNv2%2Fj5mt47udam?alt=media&token=341431b7-08ff-4c42-a4aa-f218de707c16"
                ],
                likes: {
                    count: 1,
                    users: [
                        "GjLq3MQjI1eF1KJymeuema1lxNv2"
                    ]
                },
                owner: "GjLq3MQjI1eF1KJymeuema1lxNv2",
                publish: true,
                title: "dffddqwd"
            }
        }
    }

    const store = mockStore(mockData);

    store.dispatch = jest.fn();

    act(() => {
        ReactDOM.render(
            <Provider store={store}>
                <BrowserRouter>
                    <UserPageEditPost postId="test_id_1" />
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


    // input.value = "test_name";

    // Simulate.change(input);

    // act(() => {
    //     button.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    // });

    expect(store.dispatch).toHaveBeenCalledTimes(1);;
});

it('render with post', () => {
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
        post: {
            postById: {
                article: "dfssdfds111wqd",
                author: "Admin3",
                dislikes: {
                    count: 0,
                    users: [

                    ]
                },
                img: [
                    "https://firebasestorage.googleapis.com/v0/b/react-firebase-project-f71c4.appspot.com/o/usersUploadedFiles%2FGjLq3MQjI1eF1KJymeuema1lxNv2%2Fj5mt47udam?alt=media&token=341431b7-08ff-4c42-a4aa-f218de707c16"
                ],
                likes: {
                    count: 1,
                    users: [
                        "GjLq3MQjI1eF1KJymeuema1lxNv2"
                    ]
                },
                owner: "GjLq3MQjI1eF1KJymeuema1lxNv2",
                publish: true,
                title: "dffddqwd"
            }
        },
        currentStoreStatus: 'GET_POST_SUCCESS',
    }

    const store = mockStore(mockData);

    store.dispatch = jest.fn();

    act(() => {
        ReactDOM.render(
            <Provider store={store}>
                <BrowserRouter>
                    <UserPageEditPost postId="test_id_1" />
                </BrowserRouter>
            </Provider>
            , container);
    });

    const title = container.querySelector('#title');
    const article = container.querySelector('#article');
    const publish = container.querySelector('#publish');
    const button = container.querySelector('button');

    expect(title).not.toBeNull();
    expect(title.value).toBe(mockData.post.postById.title);
    
    expect(article).not.toBeNull();
    expect(article.value).toBe(mockData.post.postById.article);
    expect(publish).not.toBeNull();
    expect(publish.checked).toBe(mockData.post.postById.publish);
    expect(button).not.toBeNull();

    expect(store.dispatch).toHaveBeenCalledTimes(2);

    act(() => {
        button.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    });

    expect(store.dispatch).toHaveBeenCalledTimes(3);
});

it('render with EDIT_SUCCESS', () => {
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
        post: {
            postById: {
                article: "dfssdfds111wqd",
                author: "Admin3",
                dislikes: {
                    count: 0,
                    users: [

                    ]
                },
                img: [
                    "https://firebasestorage.googleapis.com/v0/b/react-firebase-project-f71c4.appspot.com/o/usersUploadedFiles%2FGjLq3MQjI1eF1KJymeuema1lxNv2%2Fj5mt47udam?alt=media&token=341431b7-08ff-4c42-a4aa-f218de707c16"
                ],
                likes: {
                    count: 1,
                    users: [
                        "GjLq3MQjI1eF1KJymeuema1lxNv2"
                    ]
                },
                owner: "GjLq3MQjI1eF1KJymeuema1lxNv2",
                publish: true,
                title: "dffddqwd"
            }
        },
        currentStoreStatus: 'EDIT_POST_SUCCESS',
    }

    const store = mockStore(mockData);

    store.dispatch = jest.fn();

    act(() => {
        ReactDOM.render(
            <Provider store={store}>
                <BrowserRouter>
                    <UserPageEditPost postId="test_id_1" />
                </BrowserRouter>
            </Provider>
            , container);
    });

    const title = container.querySelector('#title');
    const article = container.querySelector('#article');
    const publish = container.querySelector('#publish');
    const button = container.querySelector('button');

    expect(title).not.toBeNull();
    expect(title.value).toBe('');
    
    expect(article).not.toBeNull();
    expect(article.value).toBe('');
    expect(publish).not.toBeNull();
    expect(publish.checked).toBe(false);
    expect(button).not.toBeNull();

    expect(store.dispatch).toHaveBeenCalledTimes(2);
});
