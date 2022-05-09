const jwt = require('jsonwebtoken');
const { secret } = require('../config');
const Role = require('../models/Role');
const User = require('../models/User');

// autorizacion, verifica si el usuario nos esta enviando su token
async function verifyToken(req, res, next) {
  try {
    const token = req.get('x-access-token');
    if (!token) return res.status(403).json({ messagge: 'No token provided' });
    const decoded = jwt.verify(token, secret);
    const user = await User.findById(decoded.id, { password: 0 });
    if (!user) return res.status(404).json({ message: 'No user found' });
    next();
  } catch (err) {
    res.status(401).json({ message: 'Unauthorized' });
  }
}

// moderator middleware
async function isModerator(req, res, next) {
  try {
    const token = req.get('x-access-token');
    const decoded = jwt.verify(token, secret);
    const user = await User.findById(decoded.id);
    const roles = await Role.find({_id: {$in: user.roles}});

    let foundRole = roles.find((rol) => {
      if (rol.name === 'moderator') return true;
    });

    if (foundRole) {
      next();
    } else {
      return res.status(403).send({ message: 'Require moderator role' });
    }
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
}

// admin middleware
async function isAdmin(req, res, next) {
  try {
    const token = req.get('x-access-token');
    const decoded = jwt.verify(token, secret);
    const user = await User.findById(decoded.id);
    const roles = await Role.find({_id: {$in: user.roles}});

    let foundRole = roles.find((rol) => {
      if (rol.name === 'admin') return true;
    });

    if (foundRole) {
      next();
    } else {
      return res.status(403).send({ message: 'Require admin role' });
    }
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
}

module.exports = {
  verifyToken,
  isModerator,
  isAdmin
}
