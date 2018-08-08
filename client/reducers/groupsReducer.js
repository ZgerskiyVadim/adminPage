import {
    GET_GROUPS_REQUEST,
    GET_GROUPS,
    UPDATE_GROUP_REQUEST,
    UPDATE_GROUP,
    REMOVE_GROUP_REQUEST,
    REMOVE_GROUP,
    GROUPS_REQUEST_FAILED,
} from '../actions';

const defaultProps = {
    isRemoved: false,
    isUpdated: false,
    isLoading: false,
    error: null
};

const initialState = {
    groups: [],
    ...defaultProps
};

export default function Groups(state = initialState, action) {
    switch (action.type) {
        case GET_GROUPS_REQUEST:
            return {
                ...state,
                ...defaultProps,
                isLoading: true
            };

        case GET_GROUPS:
            return {
                ...state,
                groups: [...action.payload],
                ...defaultProps
            };

        case UPDATE_GROUP_REQUEST:
            return {
                ...state,
                ...defaultProps,
                isLoading: true
            };

        case UPDATE_GROUP:
            return {
                ...state,
                groups: state.groups.map(group => (group._id === action.payload._id) ? action.payload : group),
                ...defaultProps,
                isUpdated: true
            };

        case REMOVE_GROUP_REQUEST:
            return {
                ...state,
                ...defaultProps,
                isLoading: true
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

        default: return state;
    }
}
