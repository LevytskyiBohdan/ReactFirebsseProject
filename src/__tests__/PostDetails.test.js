import React from 'react';
import ReactDOM from 'react-dom';
import { act } from 'react-dom/test-utils';
import PostDetails from '../components/PostDetails';
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
        post: {
            postById: {
                article: "Some text>>>",
                author: "Admin",
                dislikes: {
                    count: 2,
                    users: [1, 2]
                },
                likes: {
                    count: 3,
                    users: [1, 2]
                },
                owner: "GjLq3MQjI1eF1KJymeuema1lxNv2",
                publosh: true,
                title: "Some title>>>",
                img: [1, 2]

            }
        },
        user: {
            isLoading: false,
            isLoaded: false,
            currentUser: null,
            error: null,
        }
    }

    const store = mockStore(mockData);

    store.dispatch = jest.fn();

    act(() => {
        ReactDOM.render(
            <Provider store={store}>
                <BrowserRouter>
                    <PostDetails />
                </BrowserRouter>
            </Provider>
            , container);
    });

    const topBackgroundImg = container.querySelector('.imgTop');
    const title = container.querySelector('h1');
    const article = container.querySelector('p');
    const author = container.querySelector('h6');
    const postImg = container.querySelectorAll('.row.mt-5 img');

    expect(topBackgroundImg.getAttribute('style')).toBe(`background: url(${mockData.post.postById.img[0]});`)
    expect(title.textContent).toBe(mockData.post.postById.title);
    expect(article.textContent).toBe(mockData.post.postById.article);
    expect(author.textContent).toBe(`Author: ${mockData.post.postById.author}`);

    postImg.forEach((img, idx) => {
        expect(img.getAttribute('src')).toBe(String(mockData.post.postById.img[idx]))
    })

});

it('base render with user', () => {
    const mockStore = configureStore();
    const mockData = {
        post: {
            postById: {
                article: "Some text>>>",
                author: "Admin",
                dislikes: {
                    count: 2,
                    users: [1, 2]
                },
                likes: {
                    count: 3,
                    users: [1, 2]
                },
                owner: "GjLq3MQjI1eF1KJymeuema1lxNv2",
                publosh: true,
                title: "Some title>>>",
                img: [1, 2]

            }
        },
        user: {
            isLoading: false,
            isLoaded: false,
            currentUser: {
                uid: "GjLq3MQjI1eF1KJymeuema1lxNv2",
            },
            error: null,
        }
    }

    const store = mockStore(mockData);

    store.dispatch = jest.fn();

    act(() => {
        ReactDOM.render(
            <Provider store={store}>
                <BrowserRouter>
                    <PostDetails/>
                </BrowserRouter>
            </Provider>
            , container);
    });

    const linkToEdit = container.querySelector('a');

    expect(linkToEdit).not.toBeNull();
    expect(linkToEdit.getAttribute('href')).toBe("/user/editPost/undefined")
});
