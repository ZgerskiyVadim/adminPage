
export function groupsReducer(state = [], action) {
    switch (action.type) {
        case 'GET_GROUPS':
            return [
                ...action.payload
            ];
        case 'GET_GROUPS_REQUEST':
            return [
                ...state
            ];

        default: return state
    }
}