import express from 'express';
const router = express.Router();
import * as groupCtrl from '../controllers/group';
import {handleResponse} from '../services/handleResponse';

router.get('/groups/', handleResponse(groupCtrl.getGroups));

router.get('/groups/:id', handleResponse(groupCtrl.getGroupByID));

router.post('/groups/', handleResponse(groupCtrl.createGroup));

router.patch('/groups/remove-user/:id', handleResponse(groupCtrl.removeUserFromGroup));

router.patch('/groups/:id', handleResponse(groupCtrl.updateGroup));

router.delete('/groups/:id', handleResponse(groupCtrl.removeGroup));

export default router;
