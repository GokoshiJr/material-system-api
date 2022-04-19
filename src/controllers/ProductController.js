const fs = require('fs').promises;
const Product = require('../models/Product');
const path = require('path');

// return all products
async function index(req, res) {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
}

// return product by id
async function show(req, res) {
  try {
    const product = await Product.findById(req.params.id);
    res.json(product);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
}

// create product
async function store(req, res) {
  try {
    const { title, size, unitaryPrice, description, imgUrl } = req.body;

    const product = new Product({title, size, unitaryPrice, imgUrl, description});

    if (req.file) {
      const { filename } = req.file;
      product.setImgUrl(filename)
    }

    await product.save();
    res.json({
      status:"Product created"
    })
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
}

// update product by id
async function update(req, res) {
  try {
    const { title, size, unitaryPrice, description } = req.body;
    const updateProduct = { title, size, unitaryPrice, description };
    const product = await Product.findByIdAndUpdate(req.params.id, updateProduct);

    if (req.file) {

      const image = product.imgUrl.split('/');
      await fs.unlink(path.join(__dirname + `/../storage/img/${image[image.length-1]}`))

      const { filename } = req.file;
      product.setImgUrl(filename);

      await Product.findByIdAndUpdate(req.params.id, product);
    }

    res.json({ status:"Product updated" });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
}

// delete product by id
async function destroy(req, res) {
  try {
    const product = await Product.findByIdAndRemove(req.params.id);
    const image = product.imgUrl.split('/');
    await fs.unlink(path.join(__dirname + `/../storage/img/${image[image.length-1]}`))
    res.json({
      status:"Product deleted"
    })

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
