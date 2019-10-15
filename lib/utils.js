const bcrypt = require('bcrypt')
const utf8 = require('utf8');

const saltRounds = 10;

module.exports.encryptPassword = async function encrypt(password) {
    return new Promise((resolve, reject) => {
        bcrypt.genSalt(saltRounds, (err, salt) => {
            bcrypt.hash(utf8.encode(password), salt, (err, hash) => {
                if (err) return reject('error during encryption', err)

                return resolve(hash)
            })
        })
    })
}

module.exports.checkPassword = async function check(hash, password) {
    return new Promise((resolve, reject) => {
        bcrypt.compare(password, hash, function(err, res) {
            if (err) return reject('error during check', err)
            return resolve(res);
        });
    })
}