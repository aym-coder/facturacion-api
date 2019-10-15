'use strict'

const mongoose = require('mongoose');
const Promise = require('bluebird');
const config = require('../env/qa');

const Users = require('./models/user')
const Collections = require('./models/collection')

const dbConfig = config.db;

class DB {
    constructor() {
        // Models
        this.users = new Users(this);
        this.collections = new Collections(this);
    }

    connect(callback) {
        const stringConnection = `mongodb+srv://${dbConfig.user}:${dbConfig.password}@${dbConfig.host}/${dbConfig.db}?retryWrites=true`;

        this.connection = mongoose.connect(stringConnection, { useNewUrlParser: true });
        this.connected = true;
        const connection = this.connection;

        return Promise.resolve(connection).asCallback(callback);
    }

    disconnect(callback) {
        return new Promise((resolve, reject) => {
        if (!this.connected) {
            reject(`No active DB connection was found`);
        }

        // this.connection.disconnect()
        mongoose.disconnect()
        this.connected = false
        resolve(this.connection)

    }).asCallback(callback)

    }

}

module.exports = DB;