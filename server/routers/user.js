import express from 'express';
const router = express.Router();
import config from "../../config";
import passport from 'passport';
import * as userCtrl from '../controllers/user';
import {handleResponse} from '../services/handleResponse';


router.get('/users/', handleResponse(userCtrl.getUsers));

router.get('/users/:id', handleResponse(userCtrl.getUserByID));

router.get('/logout', (req, res) => (
    userCtrl.logout((data) => {
        res.clearCookie(config.sessionName)
            .status(200)
            .json(data);
    })
));

router.post('/login', passport.authenticate('local'), handleResponse(userCtrl.login));

router.post('/users/', handleResponse(userCtrl.createUser));

router.patch('/users/:id', handleResponse(userCtrl.updateUser));

router.patch('/users/follow/group', handleResponse(userCtrl.addUserInGroup));

router.patch('/users/leave-group/:id', handleResponse(userCtrl.removeUserFromGroup));

router.delete('/users/:id', handleResponse(userCtrl.removeUser));

export default router;
