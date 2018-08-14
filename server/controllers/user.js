import User from '../models/user';
import Group from '../models/group';
import commonCrudOperations from '../services/commonCrudOperations';

const options = {
    Model: User,
    searchFields: 'users',
    ModelPopulate: Group,
    pathPopulate: 'groups',
};

const optionsRemove = {
    Model: User,
    ModelUpdate: Group,
    pathUpdate: 'users'
};

export const getUsers = commonCrudOperations.getAll(options);

export const getUserByID = commonCrudOperations.getByID({...options, searchFields: 'groups'});

export const createUser = commonCrudOperations.create(options.Model);

export const updateUser = commonCrudOperations.update(options);

export const removeUser = commonCrudOperations.remove(optionsRemove);

export const removeUserFromGroup = commonCrudOperations.removeUserFromGroup();

export const addUserInGroup = commonCrudOperations.addUserInGroup();

export const login = (req, done) => {
    done(null, {message: 'User logged-in'})
};

export const logout = (done) => {
    done({message: 'User is logout'});
};