const express = require('express');
const router = express.Router();
const { signUp, signIn, isLogged } = require('../controllers/AuthController');

// Register
router.post('/signup', signUp);

// Login
router.post('/signin', signIn);

// verifyToken
router.post('/isLogged', isLogged)

module.exports = router;
