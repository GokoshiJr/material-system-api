const User = require('../models/User');
const Role = require('../models/Role');
const Employee = require('../models/Employee');
const jwt = require('jsonwebtoken');
const { secret } = require('../config');

// Register
async function signUp(req, res) {
  try {
    const { email, password, roles } = req.body;
    const user = new User({
      email,
      password: await User.encryptPassword(password),
      lastConnection: Date.now()
    });
    if (roles) { // si envian un rol al crear un usuario, creamos la relacion
      const foundRoles = await Role.find({ name: {$in: roles} })
      user.roles = foundRoles.map(role => role._id);
    } else { // sino tendra el rol user por defecto
      const role = await Role.findOne({ name: "user" });
      user.roles = [role._id];
    }
    await user.save();
    res.status(200).json({ message: "User created successfull" });
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
    if (!userFound) return res.status(400).json({ status: "Usuario no encontrado", type: "email" });
    // validacion de la password
    const matchPassword = await User.comparePassword(password, userFound.password);
    if (!matchPassword) return res.status(401).json({ status: "Clave invalida", type: "password" });
    // validacion de usuario baneado
    if (!userFound.accessState) return res.status(401).json({ status: 'Usuario baneado' });
    // log exitoso retornamos el token jwt
    const token = jwt.sign({ id: userFound._id }, secret, {
      expiresIn: 86400 // 24 hours
    });
    res.status(200).json({ token })
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
}

// isLogged
async function isLogged(req, res) {
  try {
    const token = req.get('x-access-token');
    if (!token) return res.status(403).json({ messagge: 'No token provided' });
    const decoded = jwt.verify(token, secret);
    res.status(200).json({ status: "Ok" })
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
}

module.exports = {
  signUp,
  signIn,
  isLogged
}
