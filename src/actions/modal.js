import { SHOW_MODAL, HIDE_MODAL } from '../constants';

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