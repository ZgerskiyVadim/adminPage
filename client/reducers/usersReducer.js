
export function usersReducer(state = [], action) {
    switch (action.type) {
        case 'GET_USERS':
            return [
                ...state,
                ...action.payload
            ];
        case 'GET_USERS_REQUEST':
            return [
                ...state
            ];
        default: return state
    }
}
