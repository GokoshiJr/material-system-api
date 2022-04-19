const Product = require('../models/Product');

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
  } catch (error) {
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
  } catch (error) {
    res.status(500).send({ message: err.message });
  }
}

// update product by id
async function update(req, res) {
  try {
    const { title, size, unitaryPrice, description, imgUrl } = req.body;
    const newProduct = { title, size, unitaryPrice, description, imgUrl };
    await Product.findByIdAndUpdate(req.params.id, newProduct);
    res.json({
      status:"Product updated"
    })
  } catch (error) {
    res.status(500).send({ message: err.message });
  }
}

// delete product by id
async function destroy(req, res) {
  try {
    await Product.findByIdAndRemove(req.params.id);
    res.json({
      status:"Product deleted"
    })
  } catch (error) {
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
