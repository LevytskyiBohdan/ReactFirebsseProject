import React from 'react';
import ReactDOM from 'react-dom';
import { act } from 'react-dom/test-utils';
import InfoMessage from '../components/InfoMessage';

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
    const message = "Some message>>>";
    
    act(() => {
        ReactDOM.render(
                <InfoMessage message={message}/>
            , container);
    });

    const p = container.querySelector('p')

    expect(container).not.toBeNull();
    expect(p).not.toBeNull();
    expect(p.textContent).toBe(message);
});
