import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as postsActions from '../posts';
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
    DELETE_POST,
    DELETE_POST_SUCCESS,
    DELETE_POST_FAILURE,
    RATING_COUNT,
    RATING_COUNT_SUCCESS,
    RATING_COUNT_FAILURE,
    GET_RATING,
    GET_RATING_SUCCESS,
    GET_RATING_FAILURE,
} from '../../constants';

let testPostPayload;

// createPost action

it('test createPostFailure', () => {
    const mockStore = configureStore([thunk]);

    const store = mockStore({});

    return store.dispatch(postsActions.createPost())
        .then(() => {
            const actions = store.getActions();

            expect(actions[0].type).toEqual(CREATE_POST);
            expect(actions[1].type).toEqual(CREATE_POST_FAILURE);
        })

})

it('test createPostSaccess', () => {
    const mockStore = configureStore([thunk]);

    const store = mockStore({})

    return store.dispatch(postsActions.createPost('test', {"test1": "test_value_1"}))
        .then(() => {
            const actions = store.getActions();

            expect(actions[0].type).toEqual(CREATE_POST);
            expect(actions[1].type).toEqual(CREATE_POST_SUCCESS);
        })
})

// getPosts action

it('test getPostsFailure', () => {
    const mockStore = configureStore([thunk]);

    const store = mockStore({});

    return store.dispatch(postsActions.getPosts())
        .then(() => {
            const actions = store.getActions();

            expect(actions[0].type).toEqual(GET_POSTS);
            expect(actions[1].type).toEqual(GET_POSTS_FAILURE);
        })

})

it('test getPostsSaccess', () => {
    const mockStore = configureStore([thunk]);

    const store = mockStore({})

    return store.dispatch(postsActions.getPosts('test', {
        name: 'test1',
        symbol: '==',
        equal: 'test_value_1',
    }))
        .then(() => {
            const actions = store.getActions()

            testPostPayload = actions[1].payload;

            expect(actions[0].type).toEqual(GET_POSTS);
            expect(actions[1].type).toEqual(GET_POSTS_SUCCESS);
            expect(testPostPayload[0].test1).toEqual("test_value_1");
        })

})


// editPost action

it('test editPostFailure', () => {
    const mockStore = configureStore([thunk]);

    const store = mockStore({});

    return store.dispatch(postsActions.editPost())
        .then(() => {
            const actions = store.getActions();

            expect(actions[0].type).toEqual(EDIT_POST);
            expect(actions[1].type).toEqual(EDIT_POST_FAILURE);
        })

})

it('test editPostSaccess', () => {
    const mockStore = configureStore([thunk]);

    const store = mockStore({})

    return store.dispatch(postsActions.editPost('test', testPostPayload[0].id, {"test1": "test_value_1_edited"}))
        .then(() => {
            const actions = store.getActions();

            expect(actions[0].type).toEqual(EDIT_POST);
            expect(actions[1].type).toEqual(EDIT_POST_SUCCESS);
        })
})

// deletePost action

it('test deletePostFailure', () => {
    const mockStore = configureStore([thunk]);

    const store = mockStore({});

    return store.dispatch(postsActions.deletePost())
        .then(() => {
            const actions = store.getActions();

            expect(actions[0].type).toEqual(DELETE_POST);
            expect(actions[1].type).toEqual(DELETE_POST_FAILURE);
        })

})

it('test deletePostSaccess', () => {
    const mockStore = configureStore([thunk]);

    const store = mockStore({})

    return store.dispatch(postsActions.deletePost('test', testPostPayload[0].id))
        .then(() => {
            const actions = store.getActions();

            expect(actions[0].type).toEqual(DELETE_POST);
            expect(actions[1].type).toEqual(DELETE_POST_SUCCESS);
        })
})

// ratingCount action

it('test ratingCountFailure', () => {
    const mockStore = configureStore([thunk]);

    const store = mockStore({});

    return store.dispatch(postsActions.ratingCount())
        .then(() => {
            const actions = store.getActions();

            expect(actions[0].type).toEqual(RATING_COUNT);
            expect(actions[1].type).toEqual(RATING_COUNT_FAILURE);
        })

})

it('test ratingCountSaccess', () => {
    const mockStore = configureStore([thunk]);

    const store = mockStore({})

    return store.dispatch(postsActions.ratingCount("test_ratingCount_id", {test_rating_count: "test_rating_count_value"}))
        .then(() => {
            const actions = store.getActions();

            expect(actions[0].type).toEqual(RATING_COUNT);
            expect(actions[1].type).toEqual(RATING_COUNT_SUCCESS);
        })
})

// getRating action

it('test getRatingSaccess', () => {
    const mockStore = configureStore([thunk]);

    const store = mockStore({})

    return store.dispatch(postsActions.getRating())
        .then(() => {
            const actions = store.getActions();

            expect(actions[0].type).toEqual(GET_RATING);
            expect(actions[1].type).toEqual(GET_RATING_SUCCESS);
            expect(actions[1].payload).not.toBeNull();
        })
})

// delete useless property from rating collection

it('delete useless property from rating collection', () => {
    const mockStore = configureStore([thunk]);

    const store = mockStore({})

    return store.dispatch(postsActions.deletePost('rating', 'test_ratingCount_id'))
        .then(() => {
            const actions = store.getActions();

            expect(actions[0].type).toEqual(DELETE_POST);
            expect(actions[1].type).toEqual(DELETE_POST_SUCCESS);
        })
})
