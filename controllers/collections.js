'use strict'

const tokenService = require('../services/token');
const utils = require('../lib/utils');
const DB = require('../services/db');

var getCollections = async (req, res) => {

  if (!req.headers.authorization || !req.query.user) {
    return res.status(403).json({ error: 'No credentials sent!' });
  }

  const user = req.query.user;
  const token = await tokenService.extractToken(req);
  const veryfiedToken = await tokenService.verifyToken(token);

  if (veryfiedToken.userId !== user) {
    return res.status(403).json({ error: 'Invalid credentials sent!' });
  }

  const db = new DB();

  const query = await db.collections.findAll(user);

  await db.disconnect();
  return res.send(query);
}

var getCollection = async (req, res) => {

  if (!req.headers.authorization || !req.query.user) {
    return res.status(403).json({ error: 'No credentials sent!' });
  }

  const user = req.query.user;
  const id = req.params.id;
  const token = await tokenService.extractToken(req);
  const veryfiedToken = await tokenService.verifyToken(token);

  if (veryfiedToken.userId !== user) {
    return res.status(403).json({ error: 'Invalid credentials sent!' });
  }

  const db = new DB();

  const query = await db.collections.findOne({id, user});

  await db.disconnect();
  return res.send(query);
}

var createCollections = async (req, res) => {
  
  if (!req.headers.authorization) {
    return res.status(403).json({ error: 'No credentials sent!' });
  }
  
  const data = req.body;
  const token = await tokenService.extractToken(req);
  const veryfiedToken = await tokenService.verifyToken(token);
  
  if (veryfiedToken.userId !== data.user) {
    return res.status(403).json({ error: 'Invalid credentials sent!' });
  }

  const db = new DB();
  const query = await db.collections.create(data);

  await db.disconnect();
  return res.send(query);

}

// var updateCollection = async (req, res) => {
  
//   if (!req.headers.authorization) {
//     return res.status(403).json({ error: 'No credentials sent!' });
//   }
  
//   const data = req.body;
//   const id = req.params.id;
//   console.log(data);
//   const token = await tokenService.extractToken(req);
//   const veryfiedToken = await tokenService.verifyToken(token);
  
//   if (veryfiedToken.userId !== data.user) {
//     return res.status(403).json({ error: 'Invalid credentials sent!' });
//   }

//   // const db = new DB();
//   // const query = await db.collections.update({collection: id, data.data});

//   // await db.disconnect();
//   return res.send({result:true});

// }

module.exports = {
    getCollections,
    createCollections,
    getCollection
    // updateCollection
};