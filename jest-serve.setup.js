import request from 'supertest';
import app from './server/app';
import loadFixtures from "./server/fixtures";
import User from "./server/models/user";
import async from "async";
import mongoose from "mongoose";
import config from "./config";
import Group from "./server/models/group";


global.json = function(verb, url, cookie) {
    return cookie ?
        request(app)
            [verb](url)
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json')
            .set('cookie', cookie) :
        request(app)
            [verb](url)
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json');
};

global.connectDB = function(done) {
    mongoose.connect(config.dbForTestsName, {useMongoClient: true});
    done()
};

global.resetDB = function(done) {
    async.series(
        [
            next => Group.remove({}, next),
            next => User.remove({}, next),
            next => loadFixtures(next)
        ],
        done
    );
};

global.dropDB = function (done) {
    mongoose.disconnect();
    done()
};