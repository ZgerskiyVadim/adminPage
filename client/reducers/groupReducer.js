import * as types from '../actions';

const initialState = {
    name: '',
    title: '',
    users: [],
};

export default function groupReducer(state = initialState, action) {
    switch (action.type) {
        case types.GET_GROUP:
            return action.payload;

        case types.UPDATE_GROUP:
            return {
                ...state,
                name: action.payload.name,
                title: action.payload.title
            };

        case types.GROUP_UPDATE_USERS:
            return {
                ...state,
                users: state.users.filter(user => user._id !== action.payload)
            };

        default: return state
    }
}
