import {
    GET_GROUPS,
    UPDATE_GROUP,
    REMOVE_GROUP,
    GROUPS_REQUEST_FAILED
} from '../actions';

const initialState = {
    groups: [],
    isRemoved: false,
    isUpdated: false,
    error: null
};

export default function groupsReducer(state = initialState, action) {
    switch (action.type) {
        case GET_GROUPS:
            return {
                ...state,
                groups: [...action.payload],
                isRemoved: false,
                isUpdated: false,
                error: null
            };

        case UPDATE_GROUP:
            return {
                ...state,
                groups: state.groups.map(group => (group._id === action.payload._id) ? action.payload : group),
                isRemoved: false,
                isUpdated: true,
                error: null
            };

        case REMOVE_GROUP:
            return {
                ...state,
                groups: state.groups.filter(group => group._id !== action.payload),
                isRemoved: true,
                isUpdated: false,
                error: null
            };

        case GROUPS_REQUEST_FAILED:
            return {
                ...state,
                isRemoved: false,
                isUpdated: false,
                error: action.payload
            };

        default: return state
    }
}