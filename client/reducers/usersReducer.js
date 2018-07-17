import * as actions from '../actions/constants';

export default function usersReducer(state = [], action) {
    switch (action.type) {
        case actions.GET_USERS:
            return [
                ...action.payload
            ];
        case actions.REMOVE_USER:
            return state.filter(user => user._id !== action.payload);

        default: return state
    }
}
