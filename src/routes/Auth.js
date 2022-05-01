const express = require('express');
const router = express.Router();
const { signUp, signIn } = require('../controllers/authController');

// Register
router.post('/singup', signUp);

// Login
router.post('/singin', signIn);

module.exports = router;
