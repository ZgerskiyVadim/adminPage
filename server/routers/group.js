import express from 'express';
const router = express.Router();
import groupCtrl from '../controllers/group';
import {handleResponse} from '../services/handleResponse';

router.get('/groups/', handleResponse(groupCtrl.getAll()));

router.get('/groups/:id', handleResponse(groupCtrl.getByID()));

router.post('/groups/', handleResponse(groupCtrl.create()));

router.patch('/groups/:id', handleResponse(groupCtrl.update()));

router.patch('/groups/remove-user/:id', handleResponse(groupCtrl.removeUserFromGroup()));

router.delete('/groups/:id', handleResponse(groupCtrl.remove()));

export default router;
