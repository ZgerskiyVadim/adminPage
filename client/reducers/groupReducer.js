import {
    GET_GROUP,
    GROUP_REQUEST_FAILED,
    UPDATE_GROUP
} from '../actions';

const defaultProps = {
    isUpdated: false,
    error: null
};

const initialState = {
    name: '',
    title: '',
    users: [],
    ...defaultProps
};

export default function groupReducer(state = initialState, action) {
    switch (action.type) {
        case GET_GROUP:
            return {
                ...state,
                ...action.payload,
                ...defaultProps
            };

        case UPDATE_GROUP:
            return {
                ...state,
                name: action.payload.name,
                title: action.payload.title,
                users: action.payload.users,
                ...defaultProps,
                isUpdated: true,
            };

        case GROUP_REQUEST_FAILED:
            return {
                ...state,
                ...defaultProps,
                error: action.payload
            };

        default: return state;
    }
}
