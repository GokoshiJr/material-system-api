const mongoose = require('mongoose');
const { Schema } = mongoose;

/* Explicar como copiar el link del post a promocionar */
const LinkPost = new Schema({
  name: {
    type: String,
    required: true
  },
}, {
  timestamps: true,
  versionKey: false
});

module.exports = mongoose.model('link_post', LinkPost);
