import Group from '../models/group';
import User from '../models/user';
import commonCrudOperations from '../services/commonCrudOperations';

const options = {
    Model: Group,
    searchFields: 'groups',
    ModelPopulate: User,
    pathPopulate: 'users',
};

const optionsRemove = {
    Model: Group,
    ModelUpdate: User,
    pathUpdate: 'groups'
};

export const getGroups = commonCrudOperations.getAll(options);

export const getGroupByID = commonCrudOperations.getByID({...options, searchFields: 'users'});

export const createGroup = commonCrudOperations.create(options.Group);

export const updateGroup = commonCrudOperations.update(options);

export const removeGroup = commonCrudOperations.remove(optionsRemove);

export const removeUserFromGroup = commonCrudOperations.removeUserFromGroup();
