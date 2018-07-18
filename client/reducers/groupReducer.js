import * as actions from '../actions/constants';

const initialState = {
    name: '',
    title: '',
    users: [],
};

export default function groupReducer(state = initialState, action) {
    switch (action.type) {
        case actions.GET_GROUP:
            return action.payload;

        case actions.UPDATE_GROUP:
            return {
                ...state,
                name: action.payload.name,
                title: action.payload.title
            };

        case actions.GROUP_UPDATE_USERS:
            return {
                ...state,
                users: state.users.filter(user => user._id !== action.payload)
            };

        default: return state
    }
}
