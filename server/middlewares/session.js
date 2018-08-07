import session from "express-session";
import config from '../../config';

export default session({
    name: config.sessionName,
    secret: config.sessionSecret,
    resave: false,
    saveUninitialized: false,
    cookie: {maxAge: 1000 * 60 * 15}
})