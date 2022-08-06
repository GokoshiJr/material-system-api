const mongoose = require('mongoose');
const { Schema } = mongoose;

/* Modalidad de pago */
const PaymentMethod = new Schema({
  name: {
    type: String,
    required: true
  },
}, {
  timestamps: true,
  versionKey: false
});

module.exports = mongoose.model('payment_method', PaymentMethod);
