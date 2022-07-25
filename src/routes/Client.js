const { verifyToken } = require('../middlewares/authJwt')
const express = require('express');
const router = express.Router();
const { index, show, store, update, destroy } = require('../controllers/ClientController');

// return all clients
router.get('/', verifyToken, index);

// return client by id
router.get('/:id',verifyToken, show);

// create client
router.post('/', verifyToken, store);

// update client by id
router.put('/:id', verifyToken, update);

// delete client by id
router.delete('/:id', verifyToken, destroy);

module.exports = router;
