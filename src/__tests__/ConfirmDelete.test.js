import React from 'react';
import ReactDOM from 'react-dom';
import { act } from 'react-dom/test-utils';
import ConfirmDelete from '../components/ConfirmDelete';

let container;

beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
});

afterEach(() => {
    document.body.removeChild(container);
    container = null;
});

it('confirm action', () => {
    let test = "Test fails";

    const isTest = () => {
        test = "Test OK";
    }

    act(() => {
        ReactDOM.render(
            <ConfirmDelete action={isTest} />, container
        );
    });

    const button = container.querySelector('button');

    expect(container).not.toBeNull();
    expect(test).toBe('Test fails');

    act(() => {
        button.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    });

    expect(test).toBe('Test OK');
});
