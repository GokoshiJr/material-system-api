const upload = require('../libs/storage');
const express = require('express');
const router = express.Router();
const { index, show, store, update, destroy } = require('../controllers/ProductController');

// return all products
router.get('/', index);

// return product by id
router.get('/:id', show);

// create product, upload.single('image') puede recibir una img llamada image
router.post('/', upload.single('image'), store);

// update product by id
router.put('/:id', upload.single('image'), update);

// delete product by id
router.delete('/:id', destroy);

module.exports = router;
