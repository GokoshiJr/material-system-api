const mongoose = require('mongoose');
const { Schema } = mongoose;

/* Explicación de las plataformas en que quiere publicar */
const Platform = new Schema({
  name: {
    type: String,
    required: true
  },
}, {
  timestamps: true,
  versionKey: false
});

module.exports = mongoose.model('platform', Platform);
