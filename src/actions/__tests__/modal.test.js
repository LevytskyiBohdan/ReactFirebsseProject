import React from 'react';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as modalActions from '../modal';
import { SHOW_MODAL, HIDE_MODAL, CLEAR_ALL_ERROR } from '../../constants';

const mockStore = configureStore([]);

it('test showModal', () => {
    const initialState = {}
    const store = mockStore(initialState)

    const component = <div>Test component</div>

    store.dispatch(modalActions.showModal(component))

    const actions = store.getActions()

    expect(actions).toEqual([{ type: SHOW_MODAL, payload: component }])

})

it('test hideModal', () => {
    const initialState = {}
    const store = mockStore(initialState)

    store.dispatch(modalActions.hideModal())

    const actions = store.getActions()

    expect(actions).toEqual([{ type: HIDE_MODAL }])

})

it('test hideModal', () => {
    const initialState = {}
    const store = mockStore(initialState)

    store.dispatch(modalActions.clearError())

    const actions = store.getActions()

    expect(actions).toEqual([{ type: CLEAR_ALL_ERROR }])

})