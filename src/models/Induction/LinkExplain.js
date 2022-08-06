const mongoose = require('mongoose');
const { Schema } = mongoose;

/* Explicar los diferentes enlaces que se pueden colocar */
const LinkExplain = new Schema({
  name: {
    type: String,
    required: true
  },
}, {
  timestamps: true,
  versionKey: false
});

module.exports = mongoose.model('link_explain', LinkExplain);
