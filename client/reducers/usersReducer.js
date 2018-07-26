import {
    GET_USERS,
    UPDATE_USER,
    REMOVE_USER,
    USERS_REQUEST_FAILED
} from '../actions';

const initialState = {
    users: [],
    isRemoved: false,
    isUpdated: false,
    error: null
};

export default function usersReducer(state = initialState, action) {
    switch (action.type) {
        case GET_USERS:
            return {
                ...state,
                users: [...action.payload],
                isRemoved: false,
                isUpdated: false,
                error: null
            };

        case UPDATE_USER:
            return {
                ...state,
                users: state.users.map(user => (user._id === action.payload._id) ? action.payload : user),
                isRemoved: false,
                isUpdated: true,
                error: null
            };

        case REMOVE_USER:
            return {
                ...state,
                users: state.users.filter(user => user._id !== action.payload),
                isRemoved: true,
                isUpdated: false,
                error: null
            };

        case USERS_REQUEST_FAILED:
            return {
                ...state,
                isRemoved: false,
                isUpdated: false,
                error: action.payload
            };

        default: return state;
    }
}
