import express from 'express';
const router = express.Router();
import * as userCtrl from '../controllers/user';
import {handleResponse} from '../services/handleResponse';

router.get('/users/', handleResponse(userCtrl.getUsers));

router.get('/users/:id', handleResponse(userCtrl.getUserByID));

router.post('/users/', handleResponse(userCtrl.createUser));

router.patch('/users/:id', handleResponse(userCtrl.updateUser));

router.patch('/users/follow/group', handleResponse(userCtrl.addUserInGroup));

router.patch('/users/leave-group/:id', handleResponse(userCtrl.removeUserFromGroup));

router.delete('/users/:id', handleResponse(userCtrl.removeUser));

export default router;
