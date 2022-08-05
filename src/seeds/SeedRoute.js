const { verifyToken, isAdmin} = require('../middlewares/authJwt');
const express = require('express');
const router = express.Router();
const { seed } = require('./SeedController');

// get logged user
router.post('/', [verifyToken, isAdmin], seed);

module.exports = router
