import express from 'express';
const router = express.Router();
import UserCtrl from '../controllers/user';

router.get('/users/', UserCtrl.getUsers);

router.get('/users/:id', UserCtrl.getUserByID);

router.get('/users/search/', UserCtrl.searchUser);

router.post('/users/', UserCtrl.createUser);

router.put('/users/:id', UserCtrl.updateUser);

router.put('/users/:userID/group/:groupID', UserCtrl.addUserInGroup);

router.delete('/users/:id', UserCtrl.removeUser);

export default router;