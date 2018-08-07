import express from 'express';
const router = express.Router();
import * as userCtrl from '../controllers/user';
import passport from 'passport';

router.get('/users/', userCtrl.getUsers);

router.get('/users/:id', userCtrl.getUserByID);

router.get('/logout', userCtrl.logout);

router.post('/login', passport.authenticate('local'), userCtrl.login);

router.post('/users/', userCtrl.createUser);

router.patch('/users/:id', userCtrl.updateUser);

router.patch('/users/follow/group', userCtrl.addUserInGroup);

router.patch('/users/leave-group/:id', userCtrl.removeUserFromGroup);

router.delete('/users/:id', userCtrl.removeUser);

export default router;
