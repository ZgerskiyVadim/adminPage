import {
    GET_GROUPS,
    UPDATE_GROUP,
    REMOVE_GROUP
} from '../actions';

export default function groupsReducer(state = [], action) {
    switch (action.type) {
        case GET_GROUPS:
            return [
                ...action.payload
            ];

        case UPDATE_GROUP:
            return state.map(group => (group._id === action.payload._id) ? action.payload : group);

        case REMOVE_GROUP:
            return state.filter(group => group._id !== action.payload);

        default: return state
    }
}