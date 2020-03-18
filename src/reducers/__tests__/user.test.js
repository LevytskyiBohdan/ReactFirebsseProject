
import reducer, { initialState } from '../user';
import {
    USER_LOGIN,
    USER_LOGIN_SUCCESS,
    USER_LOGIN_FAILURE,
    USER_LOGOUT,
    USER_LOGOUT_SUCCESS,
    USER_LOGOUT_FAILURE,
    GET_USER,
    GET_USER_SUCCESS,
    GET_USER_FAILURE,
    CREATE_USER,
    CREATE_USER_SUCCESS,
    CREATE_USER_FAILURE,
    EDIT_USER,
    EDIT_USER_SUCCESS,
    EDIT_USER_FAILURE,
    DELETE_USER,
    DELETE_USER_SUCCESS,
    DELETE_USER_FAILURE,
    GET_USER_POSTS,
    GET_USER_POSTS_SUCCESS,
    GET_USER_POSTS_FAILURE,
    CREAR_USER_ERROR,
    CLEAR_ALL_ERROR,
} from '../../constants';
import expect from 'expect';

describe('post reducer', () => {
    it('should return the initial state', () => {
        expect(reducer(undefined, {})).toEqual(initialState);
    });

    it('should handle USER_LOGIN', () => {
        const startAction = {
            type: USER_LOGIN,
        };

        expect(reducer({}, startAction)).toEqual({
            isLoading: true,
            isLoaded: false,
            error: null,
        })
    });

    it('should handle USER_LOGIN_SUCCESS', () => {
        const startAction = {
            type: USER_LOGIN_SUCCESS,
            payload: ['Some payload>>>']
        };

        expect(reducer({}, startAction)).toEqual({
            currentUser: { ...startAction.payload },
            isLoading: false,
            isLoaded: true,
        })
    });

    it('should handle USER_LOGIN_FAILURE', () => {
        const startAction = {
            type: USER_LOGIN_FAILURE,
            payload: 'Some error>>>'
        };

        expect(reducer({}, startAction)).toEqual({
            isLoading: false,
            error: startAction.payload,
        })
    });

    it('should handle USER_LOGOUT', () => {
        const startAction = {
            type: USER_LOGOUT,
        };

        expect(reducer({}, startAction)).toEqual({
            isLoading: true,
            isLoaded: false,
            error: null,
        })
    });

    it('should handle USER_LOGOUT_SUCCESS', () => {
        const startAction = {
            type: USER_LOGOUT_SUCCESS,
            payload: ['Some payload>>>']
        };

        expect(reducer({}, startAction)).toEqual({
            currentUser: null,
            isLoading: false,
            isLoaded: true,
        })
    });

    it('should handle USER_LOGOUT_FAILURE', () => {
        const startAction = {
            type: USER_LOGOUT_FAILURE,
            payload: 'Some error>>>'
        };

        expect(reducer({}, startAction)).toEqual({
            isLoading: false,
            error: startAction.payload,
        })
    });

    it('should handle GET_USER', () => {
        const startAction = {
            type: GET_USER,
        };

        expect(reducer({}, startAction)).toEqual({
            isLoading: true,
            isLoaded: false,
            error: null,
        })
    });

    it('should handle GET_USER_SUCCESS', () => {
        const startAction = {
            type: GET_USER_SUCCESS,
            payload: ['Some payload>>>']
        };

        expect(reducer({}, startAction)).toEqual({
            currentUser: {...startAction.payload},
            isLoading: false,
            isLoaded: true,
        })
    });

    it('should handle GET_USER_FAILURE', () => {
        const startAction = {
            type: GET_USER_FAILURE,
            payload: 'Some error>>>'
        };

        expect(reducer({}, startAction)).toEqual({
            isLoading: false,
            error: startAction.payload,
        })
    });

    it('should handle CREATE_USER', () => {
        const startAction = {
            type: CREATE_USER,
        };

        expect(reducer({}, startAction)).toEqual({
            isLoading: true,
            isLoaded: false,
            error: null,
        })
    });

    it('should handle CREATE_USER_SUCCESS', () => {
        const startAction = {
            type: CREATE_USER_SUCCESS,
            payload: { 
                user: ['Some payload>>>']
            },
        };

        expect(reducer({}, startAction)).toEqual({
            currentUser: {...startAction.payload.user},
            isLoading: false,
            isLoaded: true,
        })
    });

    it('should handle CREATE_USER_FAILURE', () => {
        const startAction = {
            type: CREATE_USER_FAILURE,
            payload: 'Some error>>>'
        };

        expect(reducer({}, startAction)).toEqual({
            isLoading: false,
            error: startAction.payload,
        })
    });

    it('should handle EDIT_USER', () => {
        const startAction = {
            type: EDIT_USER,
        };

        expect(reducer({}, startAction)).toEqual({
            isLoading: true,
            isLoaded: false,
            error: null,
        })
    });

    it('should handle EDIT_USER_SUCCESS', () => {
        const startAction = {
            type: EDIT_USER_SUCCESS,
            payload: ['Some payload>>>'],
        };

        expect(reducer({}, startAction)).toEqual({
            currentUser: {...startAction.payload},
            isLoading: false,
            isLoaded: true,
        })
    });

    it('should handle EDIT_USER_FAILURE', () => {
        const startAction = {
            type: EDIT_USER_FAILURE,
            payload: 'Some error>>>'
        };

        expect(reducer({}, startAction)).toEqual({
            isLoading: false,
            error: startAction.payload,
        })
    });

    it('should handle DELETE_USER', () => {
        const startAction = {
            type: DELETE_USER,
        };

        expect(reducer({}, startAction)).toEqual({
            isLoading: true,
            isLoaded: false,
            error: null,
        })
    });

    it('should handle DELETE_USER_SUCCESS', () => {
        const startAction = {
            type: DELETE_USER_SUCCESS,
        };

        expect(reducer({}, startAction)).toEqual({
            isLoading: false,
            isLoaded: true,
        })
    });

    it('should handle DELETE_USER_FAILURE', () => {
        const startAction = {
            type: DELETE_USER_FAILURE,
            payload: 'Some error>>>'
        };

        expect(reducer({}, startAction)).toEqual({
            isLoading: false,
            error: startAction.payload,
        })
    });

    it('should handle GET_USER_POSTS', () => {
        const startAction = {
            type: GET_USER_POSTS,
        };

        expect(reducer({}, startAction)).toEqual({
            isLoading: true,
            isLoaded: false,
            error: null,
        })
    });

    it('should handle GET_USER_POSTS_SUCCESS', () => {
        const startAction = {
            type: GET_USER_POSTS_SUCCESS,
            payload: ['Some payload>>>'],
        };

        expect(reducer({}, startAction)).toEqual({
            isLoading: false,
            isLoaded: true,
            userPosts: startAction.payload,
        })
    });

    it('should handle GET_USER_POSTS_FAILURE', () => {
        const startAction = {
            type: GET_USER_POSTS_FAILURE,
            payload: 'Some error>>>'
        };

        expect(reducer({}, startAction)).toEqual({
            isLoading: false,
            error: startAction.payload,
        })
    });

    it('should handle CREAR_USER_ERROR', () => {
        const startAction = {
            type: CREAR_USER_ERROR,
        };

        expect(reducer({}, startAction)).toEqual({
            error: null,
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