import async from 'async';
import Group from '../models/group';
import User from '../models/user';
import fakeGroups from './groups';
import fakeUsers from './users';

export default function loadFixtures(done) {
    async.series([next => Group.create(fakeGroups, next), next => User.create(fakeUsers, next)], err => done(err))
};
