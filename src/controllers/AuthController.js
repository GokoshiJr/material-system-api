const User = require('../models/User');
const jwt = require('jsonwebtoken');
const { secret } = require('../config');

// Register
async function signUp(req, res) {
  try {
    const { username, email, password, roles } = req.body;
    const user = new User({
      username,
      email,
      password: await User.encryptPassword(password),
      roles
    });
    const savedUser = await user.save();
    console.log(secret);
    const token = jwt.sign({id: savedUser._id}, secret, {
      expiresIn: 86400 // 24 hours
    })
    res.json({ token });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
}

// Login
async function signIn(req, res) {
  try {
    res.json("SignIn");
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
}

module.exports = {
  signUp,
  signIn
}
