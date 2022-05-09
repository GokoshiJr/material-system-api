const User = require('../models/User');
const Role = require('../models/Role');

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

    await user.save();

    res.status(200).json({ status:"User created" });
  } catch (err) {
    console.log('aqui');
    res.status(500).send({ message: err.message });
  }
}

// update user by id
async function update(req, res) {
  try {
    const { username, email, password, roles } = req.body;
    const user = {
      username,
      email
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
  index,
  show,
  store,
  update,
  destroy
}
