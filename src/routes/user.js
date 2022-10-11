const { verifyToken, isAdmin} = require('../middlewares/authJwt')
const { checkRolesExisted } = require('../middlewares/verifySignup')
const express = require('express');
const router = express.Router();
const {
  createUserEmployee,
  getMe,
  index,
  show,
  store,
  update,
  destroy
} = require('../controllers/userController');

// create user and employee
router.post('/createUserEmployee', [verifyToken, isAdmin], createUserEmployee);

// get logged user
router.post('/getMe', verifyToken, getMe);

// return all users
router.get('/', verifyToken, index);

// return user by id
router.get('/:id', [verifyToken, isAdmin], show);

// create user
router.post('/', [verifyToken, isAdmin, checkRolesExisted], store);

// update user by id
router.put('/:id', [verifyToken, isAdmin, checkRolesExisted], update);

// delete user by id
router.delete('/:id', [verifyToken, isAdmin], destroy);

module.exports = router;
