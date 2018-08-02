import {
    GET_USERS,
    UPDATE_USER,
    REMOVE_USER,
    USERS_REQUEST_FAILED
} from '../actions';

const defaultProps = {
    isRemoved: false,
    isUpdated: false,
    error: null
};

const initialState = {
    users: [],
    ...defaultProps
};

export default function usersReducer(state = initialState, action) {
    switch (action.type) {
        case GET_USERS:
            return {
                ...state,
                users: [...action.payload],
                ...defaultProps
            };

        case UPDATE_USER:
            return {
                ...state,
                users: state.users.map(user => (user._id === action.payload._id) ? action.payload : user),
                ...defaultProps,
                isUpdated: true
            };

        case REMOVE_USER:
            return {
                ...state,
                users: state.users.filter(user => user._id !== action.payload),
                ...defaultProps,
                isRemoved: true,
            };

        case USERS_REQUEST_FAILED:
            return {
                ...state,
                ...defaultProps,
                error: action.payload
            };

        default: return state;
    }
}
