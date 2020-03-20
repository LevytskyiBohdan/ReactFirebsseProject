import React from 'react';
import ReactDOM from 'react-dom';
import { act } from 'react-dom/test-utils';
import Home from '../components/Home';
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
        posts: {
            isLoading: false,
            isLoaded: true,
            collection: [
                {
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
                },
                {
                    article: "Some text2>>>",
                    author: "Admin2",
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
                    title: "Some title2>>>",
                    img: [1, 2]
                }
            ]
        },
        user: {
            currentUser: {}
        }
    }

    const store = mockStore(mockData);

    store.dispatch = jest.fn();

    act(() => {
        ReactDOM.render(
            <Provider store={store}>
                <BrowserRouter>
                    <Home />
                </BrowserRouter>
            </Provider>
            , container);
    });

    const row = container.querySelectorAll('.row');
    const posts = container.querySelectorAll('.card');

    posts.forEach((item, idx) => {
        const { collection } = mockData.posts;
        const img = item.querySelector('img');
        const title = item.querySelector('h5');
        const article = item.querySelector('p');
        const author = item.querySelector('h6');
        const link = item.querySelector('a');

        expect(img.getAttribute('src')).toBe(String(collection[idx].img[0]));
        expect(title.textContent).toBe(collection[idx].title);
        expect(article.textContent).toBe(collection[idx].article);
        expect(author.textContent).toBe(`Author: ${collection[idx].author}`);
        expect(link.textContent).toBe('read more...');
    })

    expect(row).not.toBeNull();
    expect(row).toHaveLength(2);

    expect(store.dispatch).toHaveBeenCalledTimes(3);

});
