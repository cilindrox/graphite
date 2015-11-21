'use strict';

require('babel-polyfill');

const Graffiti = require('@risingstack/graffiti-mongoose');
const graphql = require('graphql').graphql;
const User = require('./User');
const Mongoose = require('mongoose');

const options = {
    mutation: false // mutation fields can be disabled
};

const schema = Graffiti.getSchema([User], options);

Mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost/graphql');

Mongoose.connection.once('connected', (err) => {

    if (err) {
        throw err;
    }

    const query = `{
        users(age: 28) {
            name
            friends(first: 2) {
                edges {
                    cursor
                    node {
                        name
                        age
                    }
                }
                pageInfo {
                    startCursor
                    endCursor
                    hasPreviousPage
                    hasNextPage
                }
            }
        }
    }`;

    graphql(schema, query)
        .then((result) => {

            console.log(result);
        });
});
