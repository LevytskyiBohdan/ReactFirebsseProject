import React from 'react';
import ReactDOM from 'react-dom';
import { act, Simulate } from 'react-dom/test-utils';
import UserPageMyPosts from '../components/UserPageMyPosts';
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
            isLoaded: false,
            isLoading: true,
            currentUser: {
                uid: 'test_uid',
            },
            userPosts: [

                {
                    id: "2aY8KEncPw5halwzihQj",
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
                },
                {
                    id: "WEhxucniRZQoDOoUlGVf",
                    article: "asdasd",
                    author: "Admin3",
                    dislikes: {
                        count: -1,
                        users: [
                            "GjLq3MQjI1eF1KJymeuema1lxNv2",
                            "GjLq3MQjI1eF1KJymeuema1lxNv2"
                        ]
                    },
                    img: [
                        "https://firebasestorage.googleapis.com/v0/b/react-firebase-project-f71c4.appspot.com/o/usersUploadedFiles%2FGjLq3MQjI1eF1KJymeuema1lxNv2%2Fgt0ralinnkn?alt=media&token=defe9b53-d4fe-4e72-a6fe-67351c0c893f"
                    ],
                    likes: {
                        "count": 0,
                        "users": [

                        ]
                    },
                    owner: "GjLq3MQjI1eF1KJymeuema1lxNv2",
                    publish: true,
                    title: "fasds"
                }

            ]
        },
    }

    const store = mockStore(mockData);

    store.dispatch = jest.fn();

    act(() => {
        ReactDOM.render(
            <Provider store={store}>
                <BrowserRouter>
                    <UserPageMyPosts />
                </BrowserRouter>
            </Provider>
            , container);
    });

    console.log(container.innerHTML)

    const wrapper = container.querySelector('.row.userPosts');

    expect(wrapper).not.toBeNull();


    // input.value = "test_name";

    // Simulate.change(input);

    // act(() => {
    //     button.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    // });

    expect(store.dispatch).toHaveBeenCalledTimes(1);
});

it('render with posts', () => {
    const mockStore = configureStore();
    const mockData = {
        user: {
            error: null,
            isLoaded: true,
            isLoading: true,
            currentUser: {
                uid: 'test_uid',
            },
            userPosts: [

                {
                    id: "2aY8KEncPw5halwzihQj",
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
                },
                {
                    id: "WEhxucniRZQoDOoUlGVf",
                    article: "asdasd",
                    author: "Admin3",
                    dislikes: {
                        count: -1,
                        users: [
                            "GjLq3MQjI1eF1KJymeuema1lxNv2",
                            "GjLq3MQjI1eF1KJymeuema1lxNv2"
                        ]
                    },
                    img: [
                        "https://firebasestorage.googleapis.com/v0/b/react-firebase-project-f71c4.appspot.com/o/usersUploadedFiles%2FGjLq3MQjI1eF1KJymeuema1lxNv2%2Fgt0ralinnkn?alt=media&token=defe9b53-d4fe-4e72-a6fe-67351c0c893f"
                    ],
                    likes: {
                        "count": 0,
                        "users": [

                        ]
                    },
                    owner: "GjLq3MQjI1eF1KJymeuema1lxNv2",
                    publish: true,
                    title: "fasds"
                }

            ]
        },
    }

    const store = mockStore(mockData);

    store.dispatch = jest.fn();

    act(() => {
        ReactDOM.render(
            <Provider store={store}>
                <BrowserRouter>
                    <UserPageMyPosts />
                </BrowserRouter>
            </Provider>
            , container);
    });

    console.log(container.innerHTML)

    const posts = container.querySelectorAll('.posts');

    posts.forEach((post, idx) => {
        const title = post.querySelector('h5');
        const article = post.querySelector('p');
        const button = post.querySelector('button');

        expect(title.textContent).toBe(mockData.user.userPosts[idx].title)
        expect(article.textContent).toBe(mockData.user.userPosts[idx].article)

        act(() => {
            button.dispatchEvent(new MouseEvent('click', { bubbles: true }));
        });
    })

    expect(store.dispatch).toHaveBeenCalledTimes(3);
});
