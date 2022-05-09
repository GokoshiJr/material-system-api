// verifica si el usuario ya existe, o si ya tiene un rol, validator
const Role = require('../models/Role');

async function checkRolesExisted(req, res, next) {
  try {
    let roleDontExist = [];
    let dontExistFlag = false;

    if (req.body.roles) {
      const roles = await Role.find({}, {"name": 1, "_id": 0});
      let rolesName = roles.map((rol) => rol.name);
      req.body.roles.forEach(rol => {
        if (!rolesName.includes(rol)) {
          roleDontExist.push(rol);
          dontExistFlag = true;
        }
      });
    }

    if (dontExistFlag) {
      return res.status(400).json({
        message: `Role(s) ${roleDontExist} does not exists`
      })
    } else {
      next()
    }

  } catch (err) {
    console.log('object');
    return res.status(500).json({ message: err.message })
  }
}


async function verifyEmail(req, res, next) {
  try {

  } catch (err) {
    return res.status(403).json({ message: 'This email already exists' })
  }
}

module.exports = {
  verifyEmail,
  checkRolesExisted
}
