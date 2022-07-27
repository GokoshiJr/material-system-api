const { verifyToken } = require('../middlewares/authJwt')
const express = require('express');
const router = express.Router();
const { index, show, store, update, destroy } = require('../controllers/ProjectionController');

// return all projections
router.get('/', verifyToken, index);

// return projection by id
router.get('/:id', verifyToken, show);

// create projection
router.post('/', verifyToken, store);

// update projection by id
router.put('/:id', verifyToken, update);

// delete projection by id
router.delete('/:id', verifyToken, destroy);

module.exports = router;
