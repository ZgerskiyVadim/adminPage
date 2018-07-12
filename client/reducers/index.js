import { combineReducers } from 'redux';
import { groupsReducer } from './groupsReducer';
import { usersReducer } from './usersReducer';

const rootReducer = combineReducers({
    groupsReducer,
    usersReducer
});

export default rootReducer;
