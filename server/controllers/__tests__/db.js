import mongoose from "mongoose";
import async from "async";
import config from '../../../config';
import loadFixtures from '../../fixtures'
import Group from '../../models/group';
import User from '../../models/user';

export default function resetDB(done) {
    async.series(
        [next => mongoose.connect(config.dbForTestsName, {useMongoClient: true}, next),
            next => Group.remove({}, next),
            next => User.remove({}, next),
            next => loadFixtures(next)],
        done
    );
}