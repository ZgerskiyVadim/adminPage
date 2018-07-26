import express from 'express';
const router = express.Router();
import * as userCtrl from '../controllers/user';

router.get('/users/', userCtrl.getUsers);

router.get('/users/:id', userCtrl.getUserByID);

router.post('/users/', userCtrl.createUser);

router.patch('/users/:id', userCtrl.updateUser);

router.put('/users/add-user-in-group/', userCtrl.addUserInGroup);

router.put('/users/leave-group/:id', userCtrl.removeUserFromGroup);

router.delete('/users/:id', userCtrl.removeUser);

export default router;
