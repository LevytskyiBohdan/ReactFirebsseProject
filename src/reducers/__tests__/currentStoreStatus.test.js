
import reducer from '../currentStoreStatus';

const mockAction = {
    type: "SOME_ACTION>>>"
};

describe('post reducer', () => {
    it('should return the initial state', () => {
        expect(reducer(undefined, {})).toEqual(undefined);
    });

    it('should return the initial state', () => {
        expect(reducer({}, mockAction)).toEqual(mockAction.type);
    });
});