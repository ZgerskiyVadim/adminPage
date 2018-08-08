import session from "express-session";
import connectMongo from 'connect-mongo';
import mongoose from 'mongoose';
import config from '../../config';
const MongoStore = connectMongo(session);

export default session({
    name: config.sessionName,
    secret: config.sessionSecret,
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: false,
        maxAge: 1000 * 60 * 15
    },
    maxAge: 1000 * 60 * 15,
    store: new MongoStore({
        mongooseConnection:mongoose.connection
    })
})