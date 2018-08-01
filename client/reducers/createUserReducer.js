import {
    USER_CREATED,
    CREATE_USER_REQUEST_FAILED
} from '../actions';

const initialState = {
    isUserCreated: false,
    error: null
};

export default function createUserReducer(state = initialState, action) {
    switch (action.type) {
        case USER_CREATED:
            return {
                ...state,
                isUserCreated: true,
                error: null
            };

        case CREATE_USER_REQUEST_FAILED:
            return {
                ...state,
                isUserCreated: false,
                error: action.payload
            };
        default: return state;
    }
}
