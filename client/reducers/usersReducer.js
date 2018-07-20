import * as types from '../actions';

export default function usersReducer(state = [], action) {
    switch (action.type) {
        case types.GET_USERS:
            return [
                ...action.payload
            ];

        case types.UPDATE_USER:
            return state.map(user => (user._id === action.payload._id) ? action.payload : user);

        case types.REMOVE_USER:
            return state.filter(user => user._id !== action.payload);

        default: return state
    }
}
