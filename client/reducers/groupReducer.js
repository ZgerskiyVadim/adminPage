import {
    GET_GROUP,
    UPDATE_GROUP
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
                title: action.payload.title,
                users: action.payload.users
            };

        default: return state
    }
}
