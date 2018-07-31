import { combineReducers } from 'redux';
import groupsReducer from './groupsReducer';
import groupReducer from './groupReducer';
import usersReducer from './usersReducer';
import userReducer from './userReducer';
import createUserReducer from './createUserReducer';
import createGroupReducer from './createGroupReducer';

const rootReducer = combineReducers({
    groupsReducer,
    groupReducer,
    usersReducer,
    userReducer,
    createUserReducer,
    createGroupReducer
});

export default rootReducer;
