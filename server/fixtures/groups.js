import ObjectId from 'mongoose';

let fakeGroups = [];

for (let i = 0; i < 5; i += 1) {
    const group = {
        _id: new ObjectId.Types.ObjectId(),
        name: `group-name-${i}`,
        title: `group-title-${i}`
    };

    fakeGroups = [...fakeGroups, group];
}

export default fakeGroups;