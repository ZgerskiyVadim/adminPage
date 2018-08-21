import Group from '../models/group';
import User from '../models/user';
import {CommonCrudOperations} from '../services/commonCrudOperations';

class GroupController extends CommonCrudOperations{
    constructor() {
        super();
        this.options = {
            Model: Group,
            pathPopulate: 'users',
            searchFields: 'groups'
        };

        this.optionsRemove = {
            Model: Group,
            ModelUpdate: User,
            pathUpdate: 'groups'
        };
    }
}

const groupController =  new GroupController();

export const getGroups = groupController.getAll();

export const getGroupByID = groupController.getByID();

export const createGroup = groupController.create();

export const updateGroup = groupController.update();

export const removeGroup = groupController.remove();

export const removeUserFromGroup = groupController.removeUserFromGroup();
