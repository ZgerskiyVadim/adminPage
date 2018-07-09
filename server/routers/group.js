import express from 'express';
const router = express.Router();
import GroupCtrl from '../controllers/group';

router.get('/groups/', GroupCtrl.getGroups);

router.get('/groups/:id', GroupCtrl.getGroupByID);

router.get('/groups/search/', GroupCtrl.searchGroup);

router.post('/groups/', GroupCtrl.createGroup);

router.put('/groups/:id', GroupCtrl.updateGroup);

router.delete('/groups/:id', GroupCtrl.removeGroup);

export default router;