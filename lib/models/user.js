'use strict';

const Mongoose = require('mongoose');


const UserSchema = new Mongoose.Schema({
    name: {
        type: String,
        // field description
        description: 'the full name of the user'
    },
    hiddenField: {
        type: Date,
        default: Date.now,
        // the field is hidden, not available in GraphQL
        hidden: true
    },
    age: {
        type: Number,
        indexed: true
    },
    friends: [{
        type: Mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }]
});


module.exports = Mongoose.model('User', UserSchema);
