'use strict';

const User = require('./lib/models/User');
const Mongoose = require('mongoose');

Mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost/graphql');

// Generate sample data

User.remove().then(() => {

    const users = [];
    for (let i = 0; i < 100; ++i) {
        users.push(new User({
            name: `User${i}`,
            age: i,
            createdAt: new Date() + i * 100,
            friends: users.map((u) => u._id),
            nums: [0, i],
            bools: [true, false],
            strings: ['foo', 'bar'],
            removed: false,
            body: {
                eye: 'blue',
                hair: 'yellow'
            }
        }));
    }

    User.create(users);
});
