
import reducer, { initialState } from '../posts';
import {
    GET_POSTS,
    GET_POSTS_SUCCESS,
    GET_POSTS_FAILURE,
    CREATE_POST,
    CREATE_POST_SUCCESS,
    CREATE_POST_FAILURE,
    EDIT_POST,
    EDIT_POST_SUCCESS,
    EDIT_POST_FAILURE,
    RATING_COUNT,
    RATING_COUNT_SUCCESS,
    RATING_COUNT_FAILURE,
    GET_RATING,
    GET_RATING_SUCCESS,
    GET_RATING_FAILURE,
    DELETE_POST,
    DELETE_POST_SUCCESS,
    DELETE_POST_FAILURE,
    CLEAR_ALL_ERROR,
} from '../../constants';
import expect from 'expect';

describe('post reducer', () => {
    it('should return the initial state', () => {
        expect(reducer(undefined, {})).toEqual(initialState);
    });

    it('should handle GET_POSTS', () => {
        const startAction = {
            type: GET_POSTS,
        };

        expect(reducer({}, startAction)).toEqual({
            isLoading: true,
            isLoaded: false,
            error: null,
        })
    });

    it('should handle GET_POSTS_SUCCESS', () => {
        const startAction = {
            type: GET_POSTS_SUCCESS,
            payload: ["Some posts>>>"]
        };

        expect(reducer({}, startAction)).toEqual({
            isLoading: false,
            collection: [ ...startAction.payload ],
            isLoaded: true,
        })
    });

    it('should handle GET_POSTS_FAILURE', () => {
        const startAction = {
            type: GET_POSTS_FAILURE,
            payload: "Some error>>>"
        };

        expect(reducer({}, startAction)).toEqual({
            isLoading: false,
            error: startAction.payload,
        })
    });

    it('should handle CREATE_POST', () => {
        const startAction = {
            type: CREATE_POST,
        };

        expect(reducer({}, startAction)).toEqual({
            isLoading: true,
            isLoaded: false,
            error: null,
        })
    });

    it('should handle CREATE_POST_SUCCESS', () => {
        const startAction = {
            type: CREATE_POST_SUCCESS,
        };

        expect(reducer({}, startAction)).toEqual({
            collection: [],
            isLoading: false,
            isLoaded: true,
        })
    });

    it('should handle CREATE_POST_FAILURE', () => {
        const startAction = {
            type: CREATE_POST_FAILURE,
            payload: "Some error>>>"
        };

        expect(reducer({}, startAction)).toEqual({
            isLoading: false,
            error: startAction.payload,
        })
    });

    it('should handle EDIT_POST', () => {
        const startAction = {
            type: EDIT_POST,
        };

        expect(reducer({}, startAction)).toEqual({
            isLoading: true,
            isLoaded: false,
            error: null,
        })
    });

    it('should handle EDIT_POST_SUCCESS', () => {
        const startAction = {
            type: EDIT_POST_SUCCESS,
        };

        expect(reducer({}, startAction)).toEqual({
            isLoading: false,
            isLoaded: true,
        })
    });

    it('should handle EDIT_POST_FAILURE', () => {
        const startAction = {
            type: EDIT_POST_FAILURE,
            payload: "Some error>>>"
        };

        expect(reducer({}, startAction)).toEqual({
            isLoading: false,
            error: startAction.payload,
        })
    });

    it('should handle RATING_COUNT', () => {
        const startAction = {
            type: RATING_COUNT,
        };

        expect(reducer({}, startAction)).toEqual({
            isLoading: true,
            isLoaded: false,
            error: null,
        })
    });

    it('should handle RATING_COUNT_SUCCESS', () => {
        const startAction = {
            type: RATING_COUNT_SUCCESS,
        };

        expect(reducer({}, startAction)).toEqual({
            isLoading: false,
            isLoaded: true,
        })
    });

    it('should handle RATING_COUNT_FAILURE', () => {
        const startAction = {
            type: RATING_COUNT_FAILURE,
            payload: "Some error>>>"
        };

        expect(reducer({}, startAction)).toEqual({
            isLoading: false,
            error: startAction.payload,
        })
    });

    it('should handle GET_RATING', () => {
        const startAction = {
            type: GET_RATING,
        };

        expect(reducer({}, startAction)).toEqual({
            isLoading: true,
            isLoaded: false,
            error: null,
        })
    });

    it('should handle GET_RATING_SUCCESS', () => {
        const startAction = {
            type: GET_RATING_SUCCESS,
            payload: "Some rating>>>"
        };

        expect(reducer({}, startAction)).toEqual({
            rating: startAction.payload,
            isLoading: false,
            isLoaded: true,
        })
    });

    it('should handle GET_RATING_FAILURE', () => {
        const startAction = {
            type: GET_RATING_FAILURE,
            payload: "Some error>>>"
        };

        expect(reducer({}, startAction)).toEqual({
            isLoading: false,
            error: startAction.payload,
        })
    });

    it('should handle DELETE_POST', () => {
        const startAction = {
            type: DELETE_POST,
        };

        expect(reducer({}, startAction)).toEqual({
            isLoading: true,
            isLoaded: false,
            error: null, 
        })
    });

    it('should handle DELETE_POST_SUCCESS', () => {
        const startAction = {
            type: DELETE_POST_SUCCESS,
        };

        expect(reducer({}, startAction)).toEqual({
            isLoading: false,
            isLoaded: true,
        })
    });

    it('should handle DELETE_POST_FAILURE', () => {
        const startAction = {
            type: DELETE_POST_FAILURE,
            payload: "Some error>>>"
        };

        expect(reducer({}, startAction)).toEqual({
            isLoading: false,
            error: startAction.payload,
        })
    });

    it('should handle CLEAR_ALL_ERROR', () => {
        const startAction = {
            type: CLEAR_ALL_ERROR,
        };

        expect(reducer({}, startAction)).toEqual({
            error: null,
        })
    });

});