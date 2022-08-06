const mongoose = require('mongoose');
const { Schema } = mongoose;

/* Explicar donde dirigir a las personas (Destino) */
const Destination = new Schema({
  name: {
    type: String,
    required: true
  },
}, {
  timestamps: true,
  versionKey: false
});

module.exports = mongoose.model('destination', Destination);
