
export function usersReducer(state = [], action) {
    switch (action.type) {
        case 'GET_USERS':
            return [
                ...action.payload
            ];
        case 'REMOVE_USER':
            return state.filter(user => user._id !== action.payload);

        default: return state
    }
}
