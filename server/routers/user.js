import express from 'express';
const router = express.Router();
import UserCtrl from '../controllers/user';

router.get('/users/', UserCtrl.getUsers);

router.get('/users/:username', UserCtrl.getUserByUsername);

router.get('/users/search/:search', UserCtrl.searchUser);

router.post('/users/', UserCtrl.createUser);

router.put('/users/:username', UserCtrl.updateUser);

router.put('/users/:username/group/:name', UserCtrl.addUserInGroup);

router.delete('/users/:username', UserCtrl.removeUser);

export default router;