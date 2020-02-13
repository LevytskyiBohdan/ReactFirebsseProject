import { SHOW_MODAL, HIDE_MODAL } from '../constants';

import createReducer from '../utils/createReducer';

export const initialState = [];

export default createReducer(initialState, {
    [SHOW_MODAL]: (state, payload) => {
        return [...state, payload];
    },
    [HIDE_MODAL]: state => {
        return state.slice(0, -1);
    }
})