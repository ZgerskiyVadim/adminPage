import {
    GET_USERS,
    UPDATE_USER,
    REMOVE_USER
} from '../actions';

export default function usersReducer(state = [], action) {
    switch (action.type) {
        case GET_USERS:
            return [
                ...action.payload
            ];

        case UPDATE_USER:
            return state.map(user => (user._id === action.payload._id) ? action.payload : user);

        case REMOVE_USER:
            return state.filter(user => user._id !== action.payload);

        default: return state
    }
}
