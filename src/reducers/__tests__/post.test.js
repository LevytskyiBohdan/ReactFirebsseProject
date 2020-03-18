
import reducer, { initialState } from '../post';
import {
    GET_POST,
    GET_POST_SUCCESS,
    GET_POST_FAILURE,
    CLEAR_ALL_ERROR,
} from '../../constants';
import expect from 'expect';

describe('post reducer', () => {
    it('should return the initial state', () => {
        expect(reducer(undefined, {})).toEqual(initialState);
    });

    it('should handle GET_POST', () => {
        const startAction = {
            type: GET_POST,
        };

        expect(reducer({}, startAction)).toEqual({
            isLoading: true,
            isLoaded: false,
            error: null,
        })
    });

    it('should handle GET_POST_SUCCESS', () => {
        const startAction = {
            type: GET_POST_SUCCESS,
            payload: "Some post >>>"
        };

        expect(reducer({}, startAction)).toEqual(
            {
                postById: startAction.payload,
                isLoading: false,
                isLoaded: true,
                error: null,
            });
    });

    it('should handle GET_POST_FAILURE', () => {
        const startAction = {
            type: GET_POST_FAILURE,
            payload: "Some err >>>"
        };

        expect(reducer({}, startAction)).toEqual(
            {
                isLoading: false,
                error: startAction.payload,
            });
    });

    it('should handle CLEAR_ALL_ERROR', () => {
        const startAction = {
            type: CLEAR_ALL_ERROR,
        };

        expect(reducer({}, startAction)).toEqual(
            {
                error: null,
            });
    });
});