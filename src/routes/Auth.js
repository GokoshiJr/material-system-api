const express = require('express');
const router = express.Router();
const { signUp, signIn } = require('../controllers/authController');

// Register
router.post('/signup', signUp);

// Login
router.post('/signin', signIn);

module.exports = router;
