import ObjectId from 'mongoose';

let fakeUsers = [];

for (let i = 0; i < 7; i += 1) {

    const user = {
        _id: new ObjectId.Types.ObjectId(),
        username: `user-username-${i}`,
        firstName: `user-firstName`,
        lastName: `userlastName`,
        email: `user-email-${i}@user.com`,
        password: `user-password-${i}`
    };

    fakeUsers = [...fakeUsers, user];
}

export default fakeUsers;