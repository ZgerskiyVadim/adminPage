import {
    GET_GROUP,
    GROUP_REQUEST_FAILED,
    UPDATE_GROUP
} from '../actions';

const initialState = {
    name: '',
    title: '',
    users: [],
    isUpdated: false,
    error: null
};

export default function groupReducer(state = initialState, action) {
    switch (action.type) {
        case GET_GROUP:
            return {
                ...state,
                ...action.payload,
                isUpdated: false,
                error: null
            };

        case UPDATE_GROUP:
            return {
                ...state,
                name: action.payload.name,
                title: action.payload.title,
                users: action.payload.users,
                isUpdated: true,
                error: null
            };

        case GROUP_REQUEST_FAILED:
            return {
                ...state,
                isUpdated: false,
                error: action.payload
            };

        default: return state;
    }
}
