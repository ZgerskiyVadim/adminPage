import express from 'express';
const router = express.Router();
import * as groupCtrl from '../controllers/group';

router.get('/groups/', groupCtrl.getGroups);

router.get('/groups/:id', groupCtrl.getGroupByID);

router.post('/groups/', groupCtrl.createGroup);

router.patch('/groups/remove-user/:id', groupCtrl.removeUserFromGroup);

router.patch('/groups/:id', groupCtrl.updateGroup);

router.delete('/groups/:id', groupCtrl.removeGroup);

export default router;
