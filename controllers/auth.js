'use strict'

const tokenService = require('../services/token');
const utils = require('../lib/utils');
const DB = require('../services/db');

var login = async (req, res) => {
  const db = new DB();
  const data = await req.body;

  const query = await db.users.findOne(data);

  if (!query.result || !query.data) {
    await db.disconnect();
    return res.send({ result: false, message: 'Los datos que has ingresado para iniciar sesión no son válidos.' });
  }

  const user = query.data;
  const checkedPassword = await utils.checkPassword(user.password, Buffer.from(data.password, 'base64').toString());

  if (!checkedPassword) {
    await db.disconnect();
    return res.send({ result: false, message: 'Los datos que has ingresado para iniciar sesión no son válidos.' });
  }

  const token = await tokenService.signToken({ userId: user._id });

  await db.disconnect();
  return res.send({ result: true, data: {user: user._id, token} });

}

module.exports = {
  login
};