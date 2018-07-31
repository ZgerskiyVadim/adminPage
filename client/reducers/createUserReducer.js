import {
    USER_CREATED,
    CREATE_USER_REQUEST_FAILED
} from '../actions';

const initialState = {
    userCreated: false,
    error: null
};

export default function createUserReducer(state = initialState, action) {
    switch (action.type) {
        case USER_CREATED:
            return {
                ...state,
                userCreated: true,
                error: null
            };

        case CREATE_USER_REQUEST_FAILED:
            return {
                ...state,
                userCreated: false,
                error: action.payload
            };
        default: return state;
    }
}
