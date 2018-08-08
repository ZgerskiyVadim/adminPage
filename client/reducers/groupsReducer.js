import {
    GET_GROUPS_PENDING,
    GET_GROUPS_SUCCESS,
    UPDATE_GROUP_PENDING,
    UPDATE_GROUP_SUCCESS,
    REMOVE_GROUP_PENDING,
    REMOVE_GROUP_SUCCESS,
    GROUPS_FAIL,
} from '../actions';

const defaultProps = {
    isRemoved: false,
    isUpdated: false,
    loading: false,
    error: null
};

const initialState = {
    groups: [],
    ...defaultProps
};

export default function Groups(state = initialState, action) {
    switch (action.type) {
        case GET_GROUPS_PENDING:
            return {
                ...state,
                ...defaultProps,
                loading: true
            };

        case GET_GROUPS_SUCCESS:
            return {
                ...state,
                ...defaultProps,
                groups: [...action.payload],
            };

        case UPDATE_GROUP_PENDING:
            return {
                ...state,
                ...defaultProps,
                loading: true
            };

        case UPDATE_GROUP_SUCCESS:
            return {
                ...state,
                ...defaultProps,
                groups: state.groups.map(group => (group._id === action.payload._id) ? action.payload : group),
                isUpdated: true
            };

        case REMOVE_GROUP_PENDING:
            return {
                ...state,
                ...defaultProps,
                loading: true
            };

        case REMOVE_GROUP_SUCCESS:
            return {
                ...state,
                ...defaultProps,
                groups: state.groups.filter(group => group._id !== action.payload),
                isRemoved: true,
            };

        case GROUPS_FAIL:
            return {
                ...state,
                ...defaultProps,
                error: action.payload
            };

        default: return state;
    }
}
