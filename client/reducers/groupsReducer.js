
export function groupsReducer(state = [], action) {
    switch (action.type) {
        case 'GET_GROUPS':
            return [
                ...action.payload
            ];
        case 'REMOVE_GROUP':
            return state.filter(group => group._id !== action.payload);

        default: return state
    }
}