import { combineReducers } from 'redux';
import {Groups} from './groupsReducer';
import {Users} from './usersReducer';

const rootReducer = combineReducers({
    Groups,
    Users
});

export default rootReducer;
