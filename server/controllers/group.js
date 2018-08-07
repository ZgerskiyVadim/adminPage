import Group from '../models/group';
import User from '../models/user';
import commonCrudOperations from '../services/commonCrudOperations';

const options = {
    Model: Group,
    searchFields: 'groups',
    ModelPopulateOrUpdate: User,
    pathPopulate: 'users',
};

export const getGroups = commonCrudOperations.getAll(options);

export const getGroupByID = commonCrudOperations.getByID(options);

export const createGroup = commonCrudOperations.create(Group);

export const updateGroup = commonCrudOperations.update(options);

export const removeGroup = commonCrudOperations.remove(options);

export const removeUserFromGroup = commonCrudOperations.removeUserFromGroup();
