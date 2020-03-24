import React from 'react';
import ReactDOM from 'react-dom';
import { act } from 'react-dom/test-utils';
import LikePost from '../components/LikePost';
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
            currentUser: {}
        },
        currentStoreStatus: "GET_RATING_SUCCESS",
        posts: {
            rating: [
                {
                    id: "2aY8KEncPw5halwzihQj",
                    dislikes: {
                        count: -1,
                        users: [],
                    },
                    likes: {
                        count: 3,
                        users: [],
                    },
                },
            ],
        }
    }

    const store = mockStore(mockData);

    store.dispatch = jest.fn();

    act(() => {
        ReactDOM.render(
            <Provider store={store}>
                <BrowserRouter>
                    <LikePost postId="2aY8KEncPw5halwzihQj"/>
                </BrowserRouter>
            </Provider>
            , container);
    });

    const buttons = container.querySelectorAll('button');

    expect(container).not.toBeNull();

    expect(buttons[0].textContent).toBe(String(mockData.posts.rating[0].likes.count));
    expect(buttons[1].textContent).toBe(String(mockData.posts.rating[0].dislikes.count * -1));

    buttons.forEach(item => {
        act(() => {
            item.dispatchEvent(new MouseEvent('click', { bubbles: true }));
        });
    })

    expect(store.dispatch).toHaveBeenCalledTimes(2);

});
