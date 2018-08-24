import * as userCtrl from "../controllers/user";
import router from "./user";
import {handleResponse} from "../services/handleResponse";
import config from "../../config";
import passport from "passport/lib/index";

router.post('/login', passport.authenticate('local'), handleResponse(userCtrl.login));

router.get('/logout', (req, res) => (
    userCtrl.logout((data) => {
        res
            .clearCookie(config.sessionName)
            .status(200)
            .json(data);
    })
));

export default router;