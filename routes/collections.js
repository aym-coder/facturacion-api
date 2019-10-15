const express = require('express');
const controller = require('../controllers/collections');
const router = express.Router();

const asyncMiddleware = fn => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch((err) => {
        next(err)
    })
}

router.get('/', asyncMiddleware(controller.getCollections));
router.get('/:id', asyncMiddleware(controller.getCollection));
router.post('/', asyncMiddleware(controller.createCollections));
// router.post('/:id', asyncMiddleware(controller.updateCollection));

module.exports = router;