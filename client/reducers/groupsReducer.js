import * as actions from '../actions/constants';

export default function groupsReducer(state = [], action) {
    switch (action.type) {
        case actions.GET_GROUPS:
            return [
                ...action.payload
            ];

        case actions.UPDATE_GROUP:
            return state.map(group => (group._id === action.payload._id) ? action.payload : group);

        case actions.REMOVE_GROUP:
            return state.filter(group => group._id !== action.payload);

        default: return state
    }
}