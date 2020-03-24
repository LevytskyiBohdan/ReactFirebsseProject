import React from 'react';
import ReactDOM from 'react-dom';
import { act } from 'react-dom/test-utils';
import Loader from '../components/Loader';
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
        reduxLoader: {
            loaders: {
                loader: {

                }
            }
        }
    }

    const store = mockStore(mockData);

    store.dispatch = jest.fn();

    act(() => {
        ReactDOM.render(
            <Provider store={store}>
                <BrowserRouter>
                    <Loader />
                </BrowserRouter>
            </Provider>
            , container);
    });

    const preloader = container.querySelector('.preloader');
    const blur = container.querySelector('.blur');
    const spiner = container.querySelector('.spiner');
    
    expect(container).not.toBeNull();
    expect(preloader).not.toBeNull();
    expect(blur).not.toBeNull();
    expect(spiner).not.toBeNull();
    expect(spiner.textContent).toBe("Loading...Loading...");

    expect(store.dispatch).toHaveBeenCalledTimes(1);

});

it('render with content', () => {
    const mockStore = configureStore();
    const test = "Children component";
    const component = <div className="testClass">{test}</div>;

    const mockData = {
        reduxLoader: {
            loaders: {
                loader: false,
            }
        }
    }

    const store = mockStore(mockData);

    store.dispatch = jest.fn();

    act(() => {
        ReactDOM.render(
            <Provider store={store}>
                <BrowserRouter>
                    <Loader>
                        {component}
                    </Loader>
                </BrowserRouter>
            </Provider>
            , container);
    });

    const preloader = container.querySelector('.preloader');
    const blur = container.querySelector('.blur');
    const children = container.querySelector('.testClass');
    
    expect(container).not.toBeNull();
    expect(preloader).not.toBeNull();
    expect(blur).toBeNull();
    expect(children).not.toBeNull();
    expect(children.textContent).toBe(test);

    expect(store.dispatch).toHaveBeenCalledTimes(1);

});
