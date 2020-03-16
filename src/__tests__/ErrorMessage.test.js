import React from 'react';
import ReactDOM from 'react-dom';
import { act } from 'react-dom/test-utils';
import ErrorMessage from '../components/ErrorMessage';

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

    const error = "Test error";

    act(() => {
        ReactDOM.render(
            <ErrorMessage error={error}/>
            , container);
    });

    const element = container.querySelector('.alert.alert-danger');

    expect(container).not.toBeNull();
    expect(element).not.toBeNull();
    expect(element.textContent).toBe(error);
});
