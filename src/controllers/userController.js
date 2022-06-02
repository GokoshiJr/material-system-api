const User = require('../models/User');
const Role = require('../models/Role');
const jwt = require('jsonwebtoken');
const { secret } = require('../config');

// get user info
async function getMe(req, res) {
  try {
    // auth
    const token = req.get('x-access-token');
    if (!token) return res.status(403).json({ message: 'No token provided' });
    // get user id in jwt
    const { id } = jwt.verify(token, secret);
    // find user info
    const user = await User.findById(id, {password: 0});
    user.roles = await Role.find({ _id: user.roles}, {_id: 0});
    return res.status(200).json({ user });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
}

// return all users
async function index(req, res) {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
}

// return user by id
async function show(req, res) {
  try {
    const user = await User.findById(req.params.id);
    res.json(user);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
}

// create user
async function store(req, res) {
  try {

    const {
      username,
      email,
      password,
      roles,
      social_id,
      phone_number,
      direction
    } = req.body;

    const user = new User({
      username,
      email,
      password: await User.encryptPassword(password),
      social_id,
      phone_number,
      direction
    });

    if (roles) { // si envian un rol al crear un usuario, creamos la relacion
      const foundRoles = await Role.find({ name: {$in: roles} })
      user.roles = foundRoles.map(role => role._id);
    } else { // sino tendra el rol user por defecto
      const role = await Role.findOne({ name: "user" });
      user.roles = [role._id];
    }

    await user.save();
    res.status(200).json({ status:"User created" });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
}

// update user by id
async function update(req, res) {
  try {
    const {
      username,
      email,
      password,
      roles,
      social_id,
      phone_number,
      direction
    } = req.body;

    const user = {
      username,
      email,
      social_id,
      phone_number,
      direction
    };

    if (password) user.password = await User.encryptPassword(password)

    if (roles) { // si envian un rol al crear un usuario, creamos la relacion
      const foundRoles = await Role.find({ name: {$in: roles} })
      user.roles = foundRoles.map(role => role._id);
    } else { // sino tendra el rol user por defecto
      const role = await Role.findOne({ name: "user" });
      user.roles = [role._id];
    }

    await User.findByIdAndUpdate(req.params.id, user);
    res.status(200).json({ status:"User updated" });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
}

// delete product by id
async function destroy(req, res) {
  try {
    await User.findByIdAndRemove(req.params.id);
    res.status(200).json({ status:"User deleted" });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
}

module.exports = {
  getMe,
  index,
  show,
  store,
  update,
  destroy
}
