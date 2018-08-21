import express from 'express';
const router = express.Router();
import userCtrl from '../controllers/user';
import {handleResponse} from '../services/handleResponse';

router.get('/users/', handleResponse(userCtrl.getAll()));

router.get('/users/:id', handleResponse(userCtrl.getByID()));

router.post('/users/', handleResponse(userCtrl.create()));

router.patch('/users/:id', handleResponse(userCtrl.update()));

router.patch('/users/follow/group', handleResponse(userCtrl.addUserInGroup()));

router.patch('/users/leave-group/:id', handleResponse(userCtrl.removeUserFromGroup()));

router.delete('/users/:id', handleResponse(userCtrl.remove()));

export default router;
