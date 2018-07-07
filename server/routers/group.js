import express from 'express';
const router = express.Router();
import GroupCtrl from '../controllers/group';

router.get('/groups/', GroupCtrl.getGroups);

router.get('/groups/:name', GroupCtrl.getGroupByName);

router.post('/groups/', GroupCtrl.createGroup);

router.put('/groups/:name', GroupCtrl.updateGroup);

router.delete('/groups/:name', GroupCtrl.removeGroup);

export default router;