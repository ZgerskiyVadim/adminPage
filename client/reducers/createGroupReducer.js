import {
    GROUP_CREATED,
    GROUP_CREATE_REQUEST,
    CREATE_GROUP_REQUEST_FAILED
} from '../actions';

const defaultProps = {
    isLoading: false,
    error: null
};

const initialState = {
    isGroupCreated: false,
    ...defaultProps
};

export default function CreateGroup(state = initialState, action) {
    switch (action.type) {
        case GROUP_CREATE_REQUEST:
            return {
                ...state,
                ...defaultProps,
                isLoading: true
            };

        case GROUP_CREATED:
            return {
                ...state,
                ...defaultProps,
                isGroupCreated: true,
            };

        case CREATE_GROUP_REQUEST_FAILED:
            return {
                ...state,
                ...defaultProps,
                isGroupCreated: false,
                error: action.payload
            };
        default: return state;
    }
}
