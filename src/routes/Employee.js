const { verifyToken, isAdmin } = require('../middlewares/authJwt')
const upload = require('../libs/storage'); // multer permite recibir req desde form-data
const express = require('express');
const router = express.Router();
const { index, show, store, update, destroy } = require('../controllers/EmployeeController');

// return all employees
router.get('/', index);

// return employee by id
router.get('/:id', show);

// create employee, upload.single('image') puede recibir una img llamada image
router.post('/', [verifyToken, isAdmin, upload.single('image')], store);

// update employee by id, upload.single('image') puede recibir una img llamada image
router.put('/:id', [verifyToken, isAdmin, upload.single('image')], update);

// delete employee by id
router.delete('/:id', [verifyToken, isAdmin], destroy);

module.exports = router;
