import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as usersActions from '../users';
import {
    GET_USERS,
    GET_USERS_SUCCESS,
    GET_USERS_FAILURE,
} from '../../constants';

it('test createUserSaccess', () => {
    const mockStore = configureStore([thunk]);

    const store = mockStore({})

    return store.dispatch(usersActions.getUsers())
        .then(() => {
            const actions = store.getActions()

            expect(actions[0].type).toEqual(GET_USERS);
            expect(actions[1].type).toEqual(GET_USERS_SUCCESS);
            expect(actions[1].payload).not.toBeNull();
        })

})