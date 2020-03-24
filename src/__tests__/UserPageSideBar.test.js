import React from 'react';
import ReactDOM from 'react-dom';
import { act } from 'react-dom/test-utils';
import UserPageSideBar from '../components/UserPageSideBar';
import { BrowserRouter } from "react-router-dom";

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
    act(() => {
        ReactDOM.render(
            <BrowserRouter>
                <UserPageSideBar />
            </BrowserRouter>
            , container);
    });

    const wrapper = container.querySelector('.col-3');
    const wrapperIn = container.querySelector('.nav');
    
    expect(container).not.toBeNull();
    expect(wrapper).not.toBeNull();
    expect(wrapperIn).not.toBeNull();

});

