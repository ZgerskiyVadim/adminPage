import { combineReducers } from 'redux';
import groupsReducer from './groupsReducer';
import groupReducer from './groupReducer';
import usersReducer from './usersReducer';
import userReducer from './userReducer';
import createUserReducer from './createUserReducer';
import createGroupReducer from './createGroupReducer';
import authenticateReducer from './authenticateReducer';

const rootReducer = combineReducers({
    authenticateReducer,
    groupsReducer,
    groupReducer,
    usersReducer,
    userReducer,
    createUserReducer,
    createGroupReducer
});

export default rootReducer;
