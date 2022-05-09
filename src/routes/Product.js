const { verifyToken, isAdmin, isModerator } = require('../middlewares/authJwt')
const upload = require('../libs/storage'); // multer permite recibir req desde form-data
const express = require('express');
const router = express.Router();
const { index, show, store, update, destroy } = require('../controllers/productController');

// return all products
router.get('/', index);

// return product by id
router.get('/:id', show);

// create product, upload.single('image') puede recibir una img llamada image
router.post('/', [verifyToken, isModerator, upload.single('image')], store);

// update product by id, upload.single('image') puede recibir una img llamada image
router.put('/:id', [verifyToken, isAdmin, upload.single('image')], update);

// delete product by id
router.delete('/:id', [verifyToken, isAdmin], destroy);

module.exports = router;
