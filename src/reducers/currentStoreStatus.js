export const initialState = '';

function createReducer(initialState, reducerMap) {
    return (state = initialState, action) => {
        const type = action.type;
        return type;
    };
}

export default createReducer(initialState);
