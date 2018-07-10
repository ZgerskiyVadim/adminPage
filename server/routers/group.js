import express from 'express';
const router = express.Router();
import * as groupCtrl from '../controllers/group';

router.get('/api/groups/', groupCtrl.getGroups);

router.get('/api/groups/:id', groupCtrl.getGroupByID);

router.get('/api/groups/search/', groupCtrl.searchGroup);

router.post('/api/groups/', groupCtrl.createGroup);

router.put('/api/groups/remove-user/:id', groupCtrl.removeUser);

router.patch('/api/groups/:id', groupCtrl.updateGroup);

router.delete('/api/groups/:id', groupCtrl.removeGroup);

export default router;