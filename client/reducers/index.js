import { combineReducers } from 'redux';
import groupsReducer from './groupsReducer';
import usersReducer from './usersReducer';
import userReducer from './userReducer';

const rootReducer = combineReducers({
    groupsReducer,
    usersReducer,
    userReducer
});

export default rootReducer;
