import Group from '../models/group';
import User from '../models/user';
import {CommonCrudOperations} from './commonCrudOperations';

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

export default new GroupController();
