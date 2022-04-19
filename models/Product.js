const { appConfig } = require('../config');
const mongoose = require('mongoose');
const { Schema } = mongoose;

const ProductSchema = new Schema({
  title: {type: String, required: true},
  size: {type: Number, required: true},
  unitaryPrice: {type: Number, required: true},
  imgUrl: {type: String},
  description: {type: String, required: true}
}, {
  timestamps: true
});

// metodo para setear la url de la imagen guardada en el servidor
ProductSchema.methods.setImgUrl = function setImgUrl(filename) {
  const { host, port } = appConfig;
  this.imgUrl = `${host}:${port}/public/${filename}`
}

module.exports = mongoose.model('Product', ProductSchema);
