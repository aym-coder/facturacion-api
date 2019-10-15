'use strict'

const mongoose = require('mongoose');
const Promise = require('bluebird');
const Schema = mongoose.Schema;

const schema = new Schema({
  name: { type: String, required: true },
  type: {type: Number, default: 1, required: true },
  user: { type: String, required: true },
  mainCollection: { type: String, default: '', required: false },
  objects: { type: Array, default: [], required: false },
  created_at: { type: Number, default: new Date().getTime(), required: false },
})

var Collection = mongoose.model('Collection', schema);

class Collections {

  constructor(db) {
    this.db = db
  }

  findAll(data, callback) {

    const task = Promise.coroutine(
      function* main() {
        if (!this.connected) {
          yield this.db.connect();
        }

        return new Promise((resolve, reject) => {
          Collection.find({user: data})
            .then(res => {
              resolve({ result: true, data: res })
            })
            .catch(err => {
              reject({message: 'error finding collections', err});
            })
        })
      }.bind(this)

    )

    return Promise.resolve(task()).asCallback(callback);
  }

  findOne(data, callback) {

    const task = Promise.coroutine(
      function* main() {
        if (!this.connected) {
          yield this.db.connect();
        }

        return new Promise((resolve, reject) => {
          Collection.findOne({_id: data.id, user: data.user})
            .then(res => {
              resolve({ result: true, data: res })
            })
            .catch(err => {
              reject({message: 'error finding the collection', err});
            })
        })
      }.bind(this)

    )

    return Promise.resolve(task()).asCallback(callback);
  }

  create(data, callback) {

    var collection = new Collection(data)

    const task = Promise.coroutine(
      function* main() {
        if (!this.connected) {
          yield this.db.connect()
        }

        return new Promise((resolve, reject) => {
          Collection.create(collection)
            .then(res => {
              resolve({ result: true, data: res })
            })
            .catch(err => {
              reject({message: 'error creating collection', err});
            })
        })
      }.bind(this)

    )

    return Promise.resolve(task()).asCallback(callback);
  }

  // create(data, callback) {

  //   var collection = new Collection(data)

  //   const task = Promise.coroutine(
  //     function* main() {
  //       if (!this.connected) {
  //         yield this.db.connect()
  //       }

  //       return new Promise((resolve, reject) => {
  //         Collection.update(
  //           {_id: data.id},
  //           {objects: data.objects}
  //         ).then(res => {
  //             resolve({ result: true, data: res })
  //           })
  //           .catch(err => {
  //             reject({message: 'error creating collection', err});
  //           })
  //       })
  //     }.bind(this)

  //   )

  //   return Promise.resolve(task()).asCallback(callback);
  // }

}

module.exports = Collections;
