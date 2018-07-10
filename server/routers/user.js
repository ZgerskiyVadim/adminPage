import express from 'express';
const router = express.Router();
import * as userCtrl from '../controllers/user';

router.get('/api/users/', userCtrl.getUsers);

router.get('/api/users/:id', userCtrl.getUserByID);

router.post('/api/users/', userCtrl.createUser);

router.patch('/api/users/:id', userCtrl.updateUser);

router.put('/api/users/:userID/group/:groupID', userCtrl.addUserInGroup);

router.put('/api/users/leave-group/:id', userCtrl.removeFromGroup);

router.delete('/api/users/:id', userCtrl.removeUser);

export default router;