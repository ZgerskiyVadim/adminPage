import {
    GET_GROUPS,
    UPDATE_GROUP,
    REMOVE_GROUP,
    GROUPS_REQUEST_FAILED,
    GET_GROUPS_REQUEST
} from '../actions';

const defaultProps = {
    isLoading: false,
    isRemoved: false,
    isUpdated: false,
    error: null
};

const initialState = {
    groups: [],
    ...defaultProps
};

export default function groupsReducer(state = initialState, action) {
    switch (action.type) {
        case GET_GROUPS:
            return {
                ...state,
                groups: [...action.payload],
                ...defaultProps
            };

        case UPDATE_GROUP:
            return {
                ...state,
                groups: state.groups.map(group => (group._id === action.payload._id) ? action.payload : group),
                ...defaultProps,
                isUpdated: true
            };

        case REMOVE_GROUP:
            return {
                ...state,
                groups: state.groups.filter(group => group._id !== action.payload),
                ...defaultProps,
                isRemoved: true,
            };

        case GROUPS_REQUEST_FAILED:
            return {
                ...state,
                ...defaultProps,
                error: action.payload
            };

        case GET_GROUPS_REQUEST:
            return {
                ...state,
                ...defaultProps,
                isLoading: true
            };

        default: return state;
    }
}
