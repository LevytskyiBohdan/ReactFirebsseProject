import { SHOW_MODAL, HIDE_MODAL, CLEAR_ALL_ERROR } from '../constants';

export const showModal = popap => {
    return {
        type: SHOW_MODAL,
        payload: popap,
    }
}

export const hideModal = () => {
    return {
        type: HIDE_MODAL,
    }
}

export const clearError = () => ({ type: CLEAR_ALL_ERROR });