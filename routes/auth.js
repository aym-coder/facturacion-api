const express = require('express');
const controller = require('../controllers/auth');
const router = express.Router();

const asyncMiddleware = fn => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch((err) => {
        next(err)
    })
}

router.post('/login', asyncMiddleware(controller.login));

module.exports = router;