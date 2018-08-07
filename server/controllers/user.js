import User from '../models/user';
import Group from '../models/group';
import commonCrudOperations from '../services/commonCrudOperations';

const options = {
    Model: User,
    searchFields: 'users',
    ModelPopulateOrUpdate: Group,
    pathPopulate: 'groups',
};

export const getUsers = commonCrudOperations.getAll(options);

export const getUserByID = commonCrudOperations.getByID({...options, searchFields: 'groups'});

export const createUser = commonCrudOperations.create(User);

export const updateUser = commonCrudOperations.update(options);

export const removeUser = commonCrudOperations.remove(options);

export const removeUserFromGroup = commonCrudOperations.removeUserFromGroup();

export const addUserInGroup = commonCrudOperations.addUserInGroup();

export const login = (req, done) => {
    done(null, {
        message: 'User loggedIN'
    })
};

export const logout = (done) => {
    done({message: 'User is logout'});
};