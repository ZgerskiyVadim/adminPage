import {
    GET_GROUP,
    UPDATE_GROUP,
    GROUP_UPDATE_USERS
} from '../actions';

const initialState = {
    name: '',
    title: '',
    users: [],
};

export default function groupReducer(state = initialState, action) {
    switch (action.type) {
        case GET_GROUP:
            return action.payload;

        case UPDATE_GROUP:
            return {
                ...state,
                name: action.payload.name,
                title: action.payload.title
            };

        case GROUP_UPDATE_USERS:
            return {
                ...state,
                users: state.users.filter(user => user._id !== action.payload)
            };

        default: return state
    }
}
