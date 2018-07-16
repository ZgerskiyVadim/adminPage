
export function groupsReducer(state = [], action) {
    switch (action.type) {
        case 'GET_GROUPS':
            return [
                ...state,
                ...action.payload
            ];
        case 'GET_GROUPS_REQUEST':
            return [
                ...state
            ];
        case 'CLEAR_STATE_GROUPS':
            return [];
        default: return state
    }
}