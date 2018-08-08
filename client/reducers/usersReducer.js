import {
    GET_USERS_PENDING,
    GET_USERS_SUCCESS,
    UPDATE_USER_PENDING,
    UPDATE_USER_SUCCESS,
    REMOVE_USER_PENDING,
    REMOVE_USER_SUCCESS,
    USERS_FAIL
} from '../actions';

const defaultProps = {
    isRemoved: false,
    isUpdated: false,
    loading: false,
    error: null
};

const initialState = {
    users: [],
    ...defaultProps
};

export default function Users(state = initialState, action) {
    switch (action.type) {
        case GET_USERS_PENDING:
            return {
                ...state,
                ...defaultProps,
                loading: true
            };

        case GET_USERS_SUCCESS:
            return {
                ...state,
                users: [...action.payload],
                ...defaultProps
            };

        case UPDATE_USER_PENDING:
            return {
                ...state,
                ...defaultProps,
                loading: true
            };

        case UPDATE_USER_SUCCESS:
            return {
                ...state,
                users: state.users.map(user => (user._id === action.payload._id) ? action.payload : user),
                ...defaultProps,
                isUpdated: true
            };

        case REMOVE_USER_PENDING:
            return {
                ...state,
                ...defaultProps,
                loading: true
            };

        case REMOVE_USER_SUCCESS:
            return {
                ...state,
                users: state.users.filter(user => user._id !== action.payload),
                ...defaultProps,
                isRemoved: true,
            };

        case USERS_FAIL:
            return {
                ...state,
                ...defaultProps,
                error: action.payload
            };

        default: return state;
    }
}
