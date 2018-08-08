import {
    GET_GROUP,
    GET_GROUP_REQUEST,
    GROUP_REQUEST_FAILED,
    UPDATE_GROUP,
    UPDATE_GROUP_REQUEST
} from '../actions';

const defaultProps = {
    isUpdated: false,
    loading: false,
    error: null
};

const initialState = {
    name: '',
    title: '',
    users: [],
    ...defaultProps
};

export default function Group(state = initialState, action) {
    switch (action.type) {
        case GET_GROUP_REQUEST:
            return {
                ...state,
                ...defaultProps,
                loading: true
            };

        case GET_GROUP:
            return {
                ...state,
                ...action.payload,
                ...defaultProps
            };

        case UPDATE_GROUP_REQUEST:
            return {
                ...state,
                ...defaultProps,
                loading: true
            };

        case UPDATE_GROUP:
            return {
                ...state,
                ...defaultProps,
                name: action.payload.name,
                title: action.payload.title,
                users: action.payload.users,
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
