
import reducer, { initialState } from '../users';
import {
    GET_USERS,
    GET_USERS_SUCCESS,
    GET_USERS_FAILURE,
} from '../../constants';

describe('post reducer', () => {
    it('should return the initial state', () => {
        expect(reducer(undefined, {})).toEqual(initialState);
    });

    it('should handle GET_USERS', () => {
        const startAction = {
            type: GET_USERS,
        };

        expect(reducer({}, startAction)).toEqual({
            isLoading: true,
            isLoaded: false,
            error: null,
        })
    });

    it('should handle GET_USERS_SUCCESS', () => {
        const startAction = {
            type: GET_USERS_SUCCESS,
            payload: ['Some payload>>>']
        };

        expect(reducer({}, startAction)).toEqual({
            users: startAction.payload,
            isLoading: false,
            isLoaded: true,
        })
    });

    it('should handle GET_USERS_FAILURE', () => {
        const startAction = {
            type: GET_USERS_FAILURE,
            payload: ['Some payload>>>']
        };

        expect(reducer({}, startAction)).toEqual({
            isLoading: false,
            error: startAction.payload,
        })
    });

});