const User = require('../models/User');
const Role = require('../models/Role');
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
    });

    if (roles) { // si envian un rol al crear un usuario, creamos la relacion
      const foundRoles = await Role.find({ name: {$in: roles} })
      user.roles = foundRoles.map(role => role._id);
    } else { // sino tendra el rol user por defecto
      const role = await Role.findOne({ name: "user" });
      user.roles = [role._id];
    }

    const savedUser = await user.save();
    const token = jwt.sign({id: savedUser._id}, secret, {
      expiresIn: 86400 // 24 hours
    });
    res.status(200).json({ token });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
}

// Login
async function signIn(req, res) {
  try {
    const { email, password } = req.body;

    // puebla el feat roles mostrando el objeto entero
    const userFound = await User.findOne({ email }).populate("roles");
    if (!userFound) return res.status(400).json({status: "User not found"});

    const matchPassword = await User.comparePassword(password, userFound.password);
    if (!matchPassword) return res.status(401).json({token: null, status: "Invalid Password"});

    const token = jwt.sign({id: userFound._id}, secret, {
      expiresIn: 86400 // 24 hours
    });
    res.status(200).json({ token })
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
}

module.exports = {
  signUp,
  signIn
}
