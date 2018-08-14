import request from 'supertest';
import app from './app';
import loadFixtures from "./fixtures";
import User from "./models/user";
import async from "async";
import mongoose from "mongoose";
import config from "../config";
import Group from "./models/group";


global.json = function(verb, url, cookie) {
    if (cookie) {
        return request(app)
            [verb](url)
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json')
            .set('cookie', cookie);
    } else {
        return request(app)
            [verb](url)
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json');
    }

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