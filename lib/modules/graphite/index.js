'use strict';

// HACK(gfestari): see this https://github.com/RisingStack/graffiti/issues/13#issuecomment-158659293
require('babel-polyfill');

const Graffiti = require('@risingstack/graffiti');
const getSchema = require('@risingstack/graffiti-mongoose').getSchema;

const User = require('../../models/user');
const Mongoose = require('mongoose');


exports.register = (server, options, next) => {

    const schema = getSchema([User], options);

    Mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost/graphql');

    Mongoose.connection.once('connected', (err) => {

        return server.register({
            register: Graffiti.hapi,
            options: {
                schema: schema
            }
        }, next);
    });
};


exports.register.attributes = {
    name: 'graphite'
};
