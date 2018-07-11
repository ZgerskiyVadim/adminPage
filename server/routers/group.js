import express from 'express';
const router = express.Router();
import * as groupCtrl from '../controllers/group';

router.get('/groups/', groupCtrl.getGroups);

router.get('/groups/:id', groupCtrl.getGroupByID);

router.post('/groups/', groupCtrl.createGroup);

router.put('/groups/remove-user/:id', groupCtrl.removeUser);

router.patch('/groups/:id', groupCtrl.updateGroup);

router.delete('/groups/:id', groupCtrl.removeGroup);

export default router;