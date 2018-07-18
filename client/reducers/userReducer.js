import * as actions from '../actions/constants';

const initialState = {
    user: {
        username: '',
        firstName: '',
        lastName: '',
        email: ''
    },
    groups: [],
};

export default function userReducer(state = initialState, action) {
    switch (action.type) {
        case actions.GET_USER:
            return action.payload;
        case actions.USER_UPDATE_GROUPS:
            return {
                ...state,
                groups: state.groups.filter(group => group._id !== action.payload)
            };
        case actions.UPDATE_USER:
            return {
                ...state,
                user: action.payload
            };

        default: return state
    }
}
