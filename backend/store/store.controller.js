const express = require('express');
const router = express.Router();
const storeService = require('./store.service');
var jwt = require('jsonwebtoken');


router.get('/', getAll);
router.get('/:id', getById);
router.put('/:id', update);
router.post('/', addStore);
router.delete('/:id', _delete);

module.exports = router;

function addStore(req, res, next) {
    storeService.create(req.body)
        .then(() => res.json(req.body))
        .catch(err => next(err));
}

function getAll(req, res, next) {
    storeService.getAll()
        .then(users => res.json(users))
        .catch(err => next(err));
}


function getById(req, res, next) {
    storeService.getById(req.params.id)
        .then(user => user ? res.json(user) : res.sendStatus(404))
        .catch(err => next(err));
}

function update(req, res, next) {
    storeService.update(req.params.id, req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function _delete(req, res, next) {
    storeService.delete(req.params.id)
        .then(() => res.json({}))
        .catch(err => next(err));
}