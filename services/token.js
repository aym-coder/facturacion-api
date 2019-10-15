'use strict'

const bearer = require('token-extractor')
const jwt = require('jsonwebtoken')
// const StandardError = require('standard-error')
const config = require('../env/qa')

module.exports.signToken = async function signToken(
    payload,
    options,
    secret = config.secret
) {
    return new Promise((resolve, reject) => {
        jwt.sign(payload, secret, options, (err, token) => {
            if (err) return reject(`err`, err)
 
            return resolve(token)
        })
    })
}

module.exports.verifyToken = async function verifyToken(
    token,
    options,
    secret = config.secret
) {
    return new Promise((resolve, reject) => {
        jwt.verify(token, secret, options, (err, decoded) => {
            if (err) return reject(`Invalid Token`, err)

            return resolve(decoded)
        })
    })
}

module.exports.extractToken = async function extractToken(req) {
    return new Promise((resolve, reject) => {
        bearer(req, (err, token) => {
            if (err) return reject('authorization required');
            // return reject(new StandardError({ code: 'AUTHORIZATION_REQUIRED' }))

            return resolve(token)
        })
    })
}
