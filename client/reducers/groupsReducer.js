
export function groupsReducer(state = [1, 2], action) {
    switch (action.type) {
        case 'GET_GROUPS':
            return [
                ...state,
                action.payload
            ];
        default: return state
    }
}
