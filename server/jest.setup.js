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

global.resetDB = function(done) {
    async.series(
        [next => mongoose.connect(config.dbForTestsName, {useMongoClient: true}, next),
            next => Group.remove({}, next),
            next => User.remove({}, next),
            next => loadFixtures(next)],
        done
    );
};