'use strict'

const mongoose = require('mongoose');
const Promise = require('bluebird');
const Schema = mongoose.Schema;

const schema = new Schema({
  email: { type: String, required: true },
  password: { type: String, required: false },
  admin: {type: Number, default: 0},
  token: { type: String, required: false },
  created_at: { type: Number, default: new Date().getTime() },
})

var User = mongoose.model('User', schema);

class Users {

  constructor(db) {
    this.db = db
  }

  findOne(data, callback) {

    // var user = new User(data)

    const task = Promise.coroutine(
      function* main() {
        if (!this.connected) {
          yield this.db.connect()
        }

        return new Promise((resolve, reject) => {
          User.findOne({email: data.email})
            .then(res => {
              resolve({ result: true, data: res })
            })
            .catch(err => {
            //   reject(new StandardError({ message: 'error creating user', code: 'error-db02' }))
            reject({message: 'error finding user', err});
            })
        })
      }.bind(this)

    )

    return Promise.resolve(task()).asCallback(callback)
  }

}

module.exports = Users;
