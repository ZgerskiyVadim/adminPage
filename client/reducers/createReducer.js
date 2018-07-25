import {
    USER_CREATED,
    GROUP_CREATED,
    CREATE_REQUEST_FAILED
} from '../actions';

const initialState = {
    userCreated: false,
    groupCreated: false,
    error: null
};

export default function createReducer(state = initialState, action) {
    switch (action.type) {
        case USER_CREATED:
            return {
                ...state,
                userCreated: true,
                groupCreated: false,
                error: null
            };

        case GROUP_CREATED:
            return {
                ...state,
                userCreated: false,
                groupCreated: true,
                error: null
            };

        case CREATE_REQUEST_FAILED:
            return {
                ...state,
                userCreated: false,
                groupCreated: false,
                error: action.payload
            };
        default: return state
    }
}
