import { combineReducers } from 'redux';
import groupsReducer from './groupsReducer';
import groupReducer from './groupReducer';
import usersReducer from './usersReducer';
import userReducer from './userReducer';

const rootReducer = combineReducers({
    groupsReducer,
    groupReducer,
    usersReducer,
    userReducer
});

export default rootReducer;
