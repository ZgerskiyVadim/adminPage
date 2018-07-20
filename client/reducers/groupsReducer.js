import * as types from '../actions';

export default function groupsReducer(state = [], action) {
    switch (action.type) {
        case types.GET_GROUPS:
            return [
                ...action.payload
            ];

        case types.UPDATE_GROUP:
            return state.map(group => (group._id === action.payload._id) ? action.payload : group);

        case types.REMOVE_GROUP:
            return state.filter(group => group._id !== action.payload);

        default: return state
    }
}