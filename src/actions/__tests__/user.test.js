import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as userActions from '../user';
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
} from '../../constants';

const testUser = {
    email: "testuser@gmail.com",
    password: "12345678",
    displayName: "TestUser",
    photoURL: "https://testIMG.com",
}

// createUserAction tests
it('test createUserFailure', () => {
    const mockStore = configureStore([thunk]);

    const store = mockStore({});

    return store.dispatch(userActions.createUser())
        .then(() => {
            const actions = store.getActions();

            expect(actions[0].type).toEqual(CREATE_USER);
            expect(actions[1].type).toEqual(CREATE_USER_FAILURE);
        })

})

it('test createUserSaccess', () => {
    const mockStore = configureStore([thunk]);

    const store = mockStore({})

    return store.dispatch(userActions.createUser(testUser.email, testUser.password))
        .then(() => {
            const actions = store.getActions()

            expect(actions[0].type).toEqual(CREATE_USER);
            expect(actions[1].type).toEqual(CREATE_USER_SUCCESS);
            expect(actions[1].payload.user.email).toEqual(testUser.email);
        })

})

// userLogoutAction tests
it('test userLogoutSaccess', () => {
    const mockStore = configureStore([thunk]);

    const store = mockStore({})

    return store.dispatch(userActions.userLogout(testUser.email, testUser.password))
        .then(() => {
            const actions = store.getActions()

            expect(actions[0].type).toEqual(USER_LOGOUT);
            expect(actions[1].type).toEqual(USER_LOGOUT_SUCCESS);
        })

})


// userLoginAction tests
it('test userLoginFailure', () => {
    const mockStore = configureStore([thunk]);

    const store = mockStore({});

    return store.dispatch(userActions.userLogin())
        .then(() => {
            const actions = store.getActions();

            expect(actions[0].type).toEqual(USER_LOGIN);
            expect(actions[1].type).toEqual(USER_LOGIN_FAILURE);
        })

})

it('test userLoginSaccess', () => {
    const mockStore = configureStore([thunk]);

    const store = mockStore({})

    return store.dispatch(userActions.userLogin(testUser.email, testUser.password))
        .then(() => {
            const actions = store.getActions()

            expect(actions[0].type).toEqual(USER_LOGIN);
            expect(actions[1].type).toEqual(USER_LOGIN_SUCCESS);
            expect(actions[1].payload.email).toEqual(testUser.email);
        })

})

// getCurrentUserAction tests

it('test getCurrentUserSaccess', () => {
    const mockStore = configureStore([thunk]);

    const store = mockStore({})

    return store.dispatch(userActions.getCurrentUser())
        .then(() => {
            const actions = store.getActions()

            Object.assign(testUser, { uid: actions[1].payload.uid })

            expect(actions[0].type).toEqual(GET_USER);
            expect(actions[1].type).toEqual(GET_USER_SUCCESS);
            expect(actions[1].payload.email).toEqual(testUser.email);

        })

})

// editUserAction tests
it('test editUserFailure', () => {
    const mockStore = configureStore([thunk]);

    const store = mockStore({});

    return store.dispatch(userActions.editUser())
        .then(() => {
            const actions = store.getActions();

            expect(actions[0].type).toEqual(EDIT_USER);
            expect(actions[1].type).toEqual(EDIT_USER_FAILURE);
        })

})

it('test editUserSaccess', () => {
    const mockStore = configureStore([thunk]);

    const store = mockStore({})

    return store.dispatch(userActions.editUser(null, {
        displayName: testUser.displayName,
        photoURL: testUser.photoURL
    }))
        .then(() => {
            const actions = store.getActions()

            expect(actions[0].type).toEqual(EDIT_USER);
            expect(actions[1].type).toEqual(EDIT_USER_SUCCESS);
            expect(actions[1].payload.email).toEqual(testUser.email);
            expect(actions[1].payload.displayName).toEqual(testUser.displayName);
            expect(actions[1].payload.photoURL).toEqual(testUser.photoURL);
        })

})

// getUserPostsAction tests
it('test getUserPostsFailure', () => {
    const mockStore = configureStore([thunk]);

    const store = mockStore({});

    return store.dispatch(userActions.getUserPosts())
        .then(() => {
            const actions = store.getActions();

            expect(actions[0].type).toEqual(GET_USER_POSTS);
            expect(actions[1].type).toEqual(GET_USER_POSTS_FAILURE);
        })

})

it('test getUserPostsSaccess', () => {
    const mockStore = configureStore([thunk]);

    const store = mockStore({})

    const query = {
        name: 'owner',
        symbol: '==',
        equal: testUser.uid,
    }

    return store.dispatch(userActions.getUserPosts('posts', query))
        .then(() => {
            const actions = store.getActions()

            expect(actions[0].type).toEqual(GET_USER_POSTS);
            expect(actions[1].type).toEqual(GET_USER_POSTS_SUCCESS);
            expect(actions[1].payload).toEqual([]);
        })

})

// clearUserError tests

it('test clearUserError', () => {
    const mockStore = configureStore([]);

    const initialState = {}
    const store = mockStore(initialState)

    store.dispatch(userActions.clearUserError())

    const actions = store.getActions()

    expect(actions).toEqual([{type: CREAR_USER_ERROR}])

})

// deleteUserAction tests
it('test deleteUserFailure', () => {
    const mockStore = configureStore([thunk]);

    const store = mockStore({});

    return store.dispatch(userActions.deleteUser())
        .then(() => {
            const actions = store.getActions();

            expect(actions[0].type).toEqual(DELETE_USER);
            expect(actions[1].type).toEqual(DELETE_USER_FAILURE);
        })

})

it('test deleteUserSaccess', () => {
    const mockStore = configureStore([thunk]);

    const store = mockStore({})

    return store.dispatch(userActions.deleteUser(testUser.email, testUser.password))
        .then(() => {
            const actions = store.getActions()

            expect(actions[0].type).toEqual(DELETE_USER);
            expect(actions[1].type).toEqual(DELETE_USER_SUCCESS);
        })

})