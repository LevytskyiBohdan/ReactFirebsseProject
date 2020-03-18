import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as postActions from '../post';
import {GET_POST, GET_POST_SUCCESS, GET_POST_FAILURE} from '../../constants';

it('test getPostFailure', () => {
    const mockStore = configureStore([thunk]);

    const store = mockStore({});

    return store.dispatch(postActions.getPost())
        .then(() => {
            const actions = store.getActions();
            
            expect(actions[0].type).toEqual(GET_POST);
            expect(actions[1].type).toEqual(GET_POST_FAILURE);
        })

})

it('test getPostSaccess', () => {
    const mockStore = configureStore([thunk]);

    const store = mockStore({})

    return store.dispatch(postActions.getPost('test', 'pwfIS3aF4oWIlDE8sNFp'))
        .then(() => {
            const actions = store.getActions()

            expect(actions[0].type).toEqual(GET_POST);
            expect(actions[1].type).toEqual(GET_POST_SUCCESS);
            expect(actions[1].payload).toEqual({});
        })

})
