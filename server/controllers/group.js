import Group from '../models/group';
import User from '../models/user';
import commonCrudOperations from '../services/commonCrudOperations';

const options = {
    Model: Group,
    pathPopulate: 'users',
    searchFields: 'groups'
};

const optionsRemove = {
    Model: Group,
    ModelUpdate: User,
    pathUpdate: 'groups'
};

export const getGroups = commonCrudOperations.getAll(options);

export const getGroupByID = commonCrudOperations.getByID({...options, searchFields: 'users'});

export const createGroup = commonCrudOperations.create(options.Model);

export const updateGroup = commonCrudOperations.update(options);

export const removeGroup = commonCrudOperations.remove(optionsRemove);

export const removeUserFromGroup = commonCrudOperations.removeUserFromGroup();
